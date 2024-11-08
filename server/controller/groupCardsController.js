import { Card } from '../models/Card.js';
import { Group_card } from '../models/Group_card.js';
import { Op } from "sequelize";

export const getGroupCard = async (req, res) => {
    try {
        const userId = req.user.id;
        const listOfSetCards = await Group_card.findAll({ where: { userId: userId } });
        res.json(listOfSetCards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getCardByID = async (req, res) => {
    try {
        const id = req.params.id;
        const setcards = await Card.findAll({
            where: {
                groupCardId: id
            }
        });
        res.json(setcards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const createGroupCard = async (req, res) => {
    try {
        const set_card = req.body;
        const userId = req.user.id;
        set_card.userId = userId;
        const setcard = await Group_card.create(set_card);
        res.json(setcard);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteGroupCard = async (req, res) => {
    try {
        const setcardId = req.params.setcardId;
        await Group_card.destroy({
            where: {
                id: setcardId,
            }
        });
        res.json("Deleted!");
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateGroupCard = async (req, res) => {
    try {
        const { name, id } = req.body;
        const editsetcard = await Group_card.update({
            name: name
        }, {
            where: {
                id: id
            }
        });
        res.json(name);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const searchGroupCard = async (req, res) => {
    const { s } = req.query;

    try {
        const userId = req.user.id;
        if (!s) {
            return res.status(400).json({ message: "Please fill in before searching" });
        }

        const result = await Group_card.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${s}%`,
                },
                userId: userId,
            },
        });

        if (result.length === 0) {
            return res.status(404).json({ message: "No items found matching your search criteria." });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
