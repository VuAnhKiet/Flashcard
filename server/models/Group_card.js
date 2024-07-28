import { Card } from "./Card.js";
import { sequelize as sq, DataTypes} from "../config/database.js";
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




