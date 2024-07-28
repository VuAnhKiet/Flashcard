import { Friend } from "./Friend.js";
import { Group_card } from "./Group_card.js";
import { sequelize as sq, DataTypes} from "../config/database.js";
                    //Still in progress
// export const Send_card = sq.define("Send_card", {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     friendId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Friend,
//             key: "id"
//         },
//     },
//     groupCardId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Group_card,
//             key: "id"
//         },
//     },

// });
Group_card.belongsToMany(Friend, { through: Send_card });
Friend.belongsToMany(Group_card, { through: Send_card });



