import { DataTypes } from "sequelize";
import { sequelize as sq } from "../utils/db.js";

    export const Friend = sq.define("Friend", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_receive: {
            type: DataTypes.CHAR,
            allowNull:false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        
    })
    
