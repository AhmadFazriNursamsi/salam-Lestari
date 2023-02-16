import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const Events =  db.define('events', {
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    }, event_date:{
        type: DataTypes.STRING,
        allowNull: true,
    },location:{
        type: DataTypes.STRING,
        allowNull: true,
    },end:{
        type: DataTypes.STRING,
        allowNull: true,
    },start:{
        type: DataTypes.STRING,
        allowNull: true,
    },summary:{
        type: DataTypes.STRING,
        allowNull: true,
    },created_by:{
        type: DataTypes.STRING,
        allowNull: true,
    },picture:{
        type: DataTypes.STRING,
        allowNull: true,
    },status:{
        type: DataTypes.STRING,
        allowNull: true,
    },share_news:{
        type: DataTypes.STRING,
        allowNull: true,
    },user_id:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true
    });
    // Users.hasMany(Events);
    export default Events; 