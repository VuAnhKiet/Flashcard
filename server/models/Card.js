import { DataTypes } from "sequelize";
import { sequelize as sq } from "../utils/db.js";
    export const Card = sq.define("Card", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        word: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        defination: {
            type: DataTypes.STRING,
            allowNull:false
        },
        
    })
    
