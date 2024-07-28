import { sequelize as sq, DataTypes} from "../config/database.js";
                //Still in progress
    export const Friend = sq.define("Friend", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        send_request: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        request: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        friend_list:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        
    })
    
