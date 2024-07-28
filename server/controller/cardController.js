import { Card } from '../models/Card.js';

export async function getlistCard(req, res) {
    try {
        const listOfCards = await Card.findAll();
        res.json(listOfCards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createCard(req, res) {
    try {
        const card = req.body;
        const newcard = await Card.create(card);
        res.json(newcard);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function deleteCard(req, res) {
    try {
        const cardId = req.params.cardId;
        await Card.destroy({
            where: {
                id: cardId,
            }
        });
        res.json("Deleted!")
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function updateCard(req, res) {
    try {
        const { word, defination, id } = req.body;
        const editcard = await Card.update({ word: word, defination: defination }, { where: { id: id } });
        res.json(editcard);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

