import { Card } from '../models/Card.js';
import { Op } from "sequelize";

export const getlistCard = async (req, res) => {
    try {
        const listOfCards = await Card.findAll();
        res.json(listOfCards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const createCard = async (req, res) => {
    try {
        const card = req.body;
        const newcard = await Card.create(card);
        res.json(newcard);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteCard = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        await Card.destroy({
            where: {
                id: cardId,
            }
        });
        res.json("Deleted!");
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateCard = async (req, res) => {
    try {
        const { word, definition, id } = req.body;
        const editcard = await Card.update({ 
            word: word, 
            definition: definition 
        }, { 
            where: { 
                id: id 
            } 
        });
        res.json(editcard);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const searchCard = async (req, res) => {
    const { s, groupCardId } = req.query;
    try {
        if (!s) {
            return res.status(400).json({ message: "Please fill in before searching" });
        }

        const result = await Card.findAll({
            where: {
                word: {
                    [Op.iLike]: `%${s}%`,
                },
                groupCardId: groupCardId,
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
