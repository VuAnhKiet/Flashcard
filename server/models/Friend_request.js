import { sequelize as sq, DataTypes } from "../config/database.js";
import { User } from "./User.js";
export const Friend_request = sq.define("Friend_request", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'declined'),
        defaultValue: 'pending',
    },
})

