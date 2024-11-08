import { Group_card } from "./Group_card.js";
import { Friend_request } from "./Friend_request.js";
import { Share_section } from "./Share_section.js";
import { Token } from "./Token.js";
import { sequelize as sq, DataTypes } from "../config/database.js";
export const User = sq.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

})
User.hasMany(Group_card, {
    foreignKey: "userId",
    sourceKey: "id"
});
Group_card.belongsTo(User, {
    foreignKey: "userId",
    targetId: "id"
});

User.hasMany(Friend_request, { foreignKey: 'senderId', as: 'sentRequests' });
User.hasMany(Friend_request, { foreignKey: 'receiverId', as: 'receivedRequests' });

Friend_request.belongsTo(User, {
    foreignKey: 'senderId',
    targetKey: 'id',
    as: 'sender'

});

Friend_request.belongsTo(User, {
    foreignKey: 'receiverId',
    targetKey: 'id',
    as: 'receiver',

});

User.hasMany(Share_section, { foreignKey: 'user_id' });
Share_section.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

User.hasOne(Token, { foreignKey: 'user_id' });
Token.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });







