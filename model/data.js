import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const Data =  db.define('data', {
    fcm_secret:{
        type: DataTypes.STRING,
        allowNull: true,
    },user_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },data_id:{
        type: DataTypes.STRING,
        allowNull: true,
    }, latitude:{
        type: DataTypes.STRING,
        allowNull: true,
    },longitude:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true
    });
    // Users.hasMany(Data);
    export default Data; 