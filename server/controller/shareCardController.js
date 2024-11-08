import { Share_section } from "../models/Share_section.js";
import { Card } from "../models/Card.js"
import {User} from "../models/User.js"

// Get user's shared setcard
export const getShareCard = async (req, res) => {
    try {
        const userId = req.user.id;
        const share_card = await Share_section.findAll({
            where: {
                user_id: userId,
            }
        });

        const cards = share_card.map(card => ({
            id: card.id,
            set_cards_name: card.set_cards_name,
        }));

        res.json(cards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get friend's shared setcard
export const getFriendsShareSetCard = async (req, res) => {
    try {
        // Friend's ID 
        const { id } = req.params;
        const share_card = await Share_section.findAll({
            where: {
                user_id: id,
            }
        });

        const setcards = share_card.map(setcard => ({
            setcardId: setcard.setcardId,
            set_cards_name: setcard.set_cards_name,
        }));

        const user = await User.findOne({
            where: {
                id:id,
            }
        });

        const share = {
            setcards,
            friend_name:user.fullname,
        }

        res.json(share);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getFriendsShareCard = async (req, res) => {
    try {
        // group card id 
        const { id } = req.params;
        const share_card = await Card.findAll({
            where: {
                groupCardId: id,
            }
        });

        if (share_card.length === 0) {
            return res.json({ message: `No flashcards found for this group` });
        }

        const cards = share_card.map(card => ({
            id:card.id,
            word: card.word,
            definition: card.definition,
        }));

        res.json(cards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const addToShareSection = async (req, res) => {
    try {
        const sharebox = req.body;
        const userId = req.user.id;
        const addTo = await Share_section.create({
            set_cards_name: sharebox.name,
            user_id: userId,
            setcardId: sharebox.id,
        });

        res.json(addTo);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const removeFromShareSection = async (req, res) => {
    try {
        const id = req.params.cardId;
        await Share_section.destroy({
            where: {
                id: id,
            }
        });
        
        res.json("Deleted!");
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
