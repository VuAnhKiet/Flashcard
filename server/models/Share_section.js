import { sequelize as sq, DataTypes } from "../config/database.js";
export const Share_section = sq.define("Share_section", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    set_cards_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})





