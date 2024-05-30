import { DataTypes } from "sequelize";
import { sequelize as sq } from "../utils/db.js";
import { Card } from "./Card.js";
export const Group_card = sq.define("Group_card", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

})
Group_card.hasMany(Card, {
    foreignKey: "groupCardId",
    sourceKey: "id"
});
Card.belongsTo(Group_card, {
    foreignKey: "groupCardId",
    targetId: "id"
});




