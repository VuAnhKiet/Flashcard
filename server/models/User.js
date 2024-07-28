import { Group_card } from "./Group_card.js";
import { Friend } from "./Friend.js";
import { sequelize as sq, DataTypes} from "../config/database.js";
    export const User = sq.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false
        },

    })
    User.hasMany(Group_card,{
        foreignKey:"userId",
        sourceKey:"id"
    });
    Group_card.belongsTo(User,{
        foreignKey:"userId",
        targetId:"id"
    });
    User.belongsToMany(Friend, { through: 'Send_card' });
    Friend.belongsToMany(User, { through: 'Send_card' });
    
    
   



