import { sequelize as sq, DataTypes } from "../config/database.js";
export const Card = sq.define("Card", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },

})

