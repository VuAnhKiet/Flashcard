import { Card } from '../models/Card.js';
import { Group_card } from '../models/Group_card.js';

export async function getGroupCard(req, res) {
    try {
        const userId = req.user.id;
        const listOfSetCards = await Group_card.findAll({ where: { userId: userId } });
        res.json(listOfSetCards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function getCardByID(req, res) {
    try {
        const id = req.params.id;
        const setcards = await Card.findAll({ where: { groupCardId: id } });
        res.json(setcards);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createGroupCard(req, res) {
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
}

export async function deleteGroupCard(req, res) {
    try {
        const setcardId = req.params.setcardId;
        await Group_card.destroy({
            where: {
                id: setcardId,
            }
        })
        res.json("Deleted!")
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function updateGroupCard(req, res) {
    try {
        const { name, id } = req.body;
        const editsetcard = await Group_card.update({ name: name }, { where: { id: id } });
        res.json(editsetcard);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

