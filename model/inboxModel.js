import { Sequelize } from "sequelize";

import db from "../config/database.js";
// import Users from "./userModel.js";

// const { DataTypes } = Sequelize;
const DataTypes = Sequelize;


const Inbox =  db.define('inboxes', {
    inbox_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },recepient_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    sender_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },subject:{
        type: DataTypes.STRING,
        allowNull: true,
    }, body:{
        type: DataTypes.STRING,
        allowNull: true,
    }, type:{
        type: DataTypes.STRING,
        allowNull: true,
    },field1:{
        type: DataTypes.STRING,
        allowNull: true,
    },field2:{
        type: DataTypes.STRING,
        allowNull: true,
    },field3:{
        type: DataTypes.STRING,
        allowNull: true,
    },field4:{
        type: DataTypes.STRING,
        allowNull: true,
    },field5:{
        type: DataTypes.STRING,
        allowNull: true,
    },field6:{
        type: DataTypes.STRING,
        allowNull: true,
    },field7:{
        type: DataTypes.STRING,
        allowNull: true,
    },read:{
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    freezeTableName: true
    });

    // Users.hasMany(Inbox);
    // Inbox.belongsTo(Users, {foreignKey: 'id'})
    // (async()=>{
    //     await Inbox.sync();
    // })();

    export default Inbox; 