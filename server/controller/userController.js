import { User } from '../models/User.js';
import { Friend_request } from '../models/Friend_request.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { serverMail } from '../utils/mailer.js';
import randomStrings from 'randomstring';
import { Op } from "sequelize";
import { Token } from '../models/Token.js';
export const getUser = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const { fullname, password, email } = req.body;

        // Check if either fullname or email already exists
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { fullname: fullname },
                    { email: email }
                ]
            }
        });

        // If a user is found with either the same fullname or email
        if (user) {
            if (user.fullname === fullname) {
                return res.json({ error: "Please try another username!" });
            }
            if (user.email === email) {
                return res.json({ error: "This email is already registered!" });
            }
        } else {
            // If no user is found, hash the password and create the new user
            const hash = await bcrypt.hash(password, 10);
            await User.create({
                fullname: fullname,
                password: hash,
                email: email,
            });

            res.json("Create success!");
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { fullname, password } = req.body;

        const user = await User.findOne({ where: { fullname: fullname } });

        if (!user) {
            return res.json({ error: "User Doesn't Exist" });
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.json({ error: "Wrong Username And Password Combination" });
            } else {
                const accessToken = jsonwebtoken.sign({ fullname: user.fullname, id: user.id },
                    process.env.JWT_SECRET
                );
                res.json(accessToken);
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const sendMail = async (req, res) => {
    const { email } = req.body;
    

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json('User not found');
    }

    await Token.destroy({
        where: {
            user_id: user.id,
            expiresAt: {
                [Op.lt]: new Date() // Finds tokens where expiresAt is less than now
            }
        }
    });

    const token = randomStrings.generate(32);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await Token.create({
        user_id: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000) 
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: ${resetLink}`,
    };

    try {
        await serverMail.sendMail(mailOptions);
        res.status(200).send('Reset link sent to your email.');
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const tokenEntry = await Token.findOne({ where: { token } });
    
    if (!tokenEntry) {
        return res.status(400).send('Invalid token');
    }

    if (Date.now() > tokenEntry.expiresAt) {
        // If the token is expired, delete it
        await Token.destroy({ where: { token } });
        return res.status(400).send('Token has expired. Please request a new password reset link.');
    }

    const user = await User.findByPk(tokenEntry.user_id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await Token.destroy({ where: { token } });

    res.status(200).send('Password has been reset successfully.');
};

export const getFriend = async (req, res) => {
    const userId = req.user.id;
    try {
        const friends_list = await Friend_request.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, status: 'accepted' },
                    { receiverId: userId, status: 'accepted' }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'fullname'],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'fullname'],
                }
            ]
        });

        const friendList = friends_list.map(request => {
            return request.senderId === userId ? request.receiver : request.sender;
        });

        res.json(friendList);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const searchFriends = async (req, res) => {
    const { s } = req.query;
    const userId = req.user.id;

    try {
        if (!s) {
            return res.status(400).json({ message: "Please fill in before searching" });
        }

        const existingFriends = await Friend_request.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, status: 'accepted' },
                    { receiverId: userId, status: 'accepted' }
                ]
            },
        });

        const existingRequest = await Friend_request.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, status: 'pending' },
                    { receiverId: userId, status: 'pending' },
                ]
            },
        });

        const friend = existingFriends.map(friend => {
            return friend.receiverId === userId ? friend.senderId : friend.receiverId;
        });

        const requests = existingRequest.map(pending => {
            return pending.senderId === userId ? pending.receiverId : pending.senderId;
        });

        const result = await User.findAll({
            where: {
                fullname: {
                    [Op.like]: `%${s}%`,
                },
                id: {
                    [Op.ne]: userId,
                    [Op.notIn]: friend,
                },
            },
        });

        const friends = result.map(user => ({
            id: user.id,
            fullname: user.fullname,
        }));

        res.json({
            friends: friends,
            pendingFriends: requests,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const sendRequest = async (req, res) => {
    const { receiverId } = req.body;
    const userId = req.user.id;

    try {
        const friendRequest = await Friend_request.create({
            senderId: userId,
            receiverId: receiverId,
            status: 'pending',
        });

        res.json('Waiting for accepting request');
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPendingFriends = async (req, res) => {
    const userId = req.user.id;

    try {
        const pending_requests = await Friend_request.findAll({
            where: {
                receiverId: userId, status: 'pending'
            },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'fullname', 'email'],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'fullname', 'email'],
                }
            ]
        });

        const Pending_list = pending_requests.map(request => {
            return request.senderId === userId ? request.receiver : request.sender;
        });

        res.json(Pending_list);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const acceptFriends = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const request = await Friend_request.findOne({
            where: {
                senderId: id,
                receiverId: userId,
            }
        });

        if (!request) return res.status(404).json({ error: 'Request not found' });
        request.status = 'accepted';
        await request.save();

        const newFriend = await User.findOne({
            where: {
                id: request.senderId,
            }
        });

        res.json({ id: newFriend.id, fullname: newFriend.fullname });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const rejectFriends = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const request = await Friend_request.findOne({
            where: {
                senderId: id,
                receiverId: userId,
            }
        });

        if (!request) return res.status(404).json({ error: 'Request not found' });
        request.status = 'declined';

        await request.save();

        res.json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const Unfriend = async (req, res) => {
    const { id } = req.params; 
    const userId = req.user.id; 

    try {
        const friendship = await Friend_request.findOne({
            where: {
                [Op.or]: [
                    { senderId: userId, receiverId: id },
                    { senderId: id, receiverId: userId }
                ]
            }
        });

        if (!friendship) {
            return res.status(404).json({ error: 'Friendship not found' });
        }

        await friendship.destroy();

        res.json({ message: 'Unfriend successful' });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
