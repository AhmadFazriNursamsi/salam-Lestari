import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const Articies =  db.define('articies', {
    content:{
        type: DataTypes.STRING,
        allowNull: true,
    }, highlight:{
        type: DataTypes.STRING,
        allowNull: true,
    },title:{
        type: DataTypes.STRING,
        allowNull: true,
    },type:{
        type: DataTypes.STRING,
        allowNull: true,
    },picture:{
        type: DataTypes.STRING,
        allowNull: true,
    },status:{
        type: DataTypes.STRING,
        allowNull: true,
    },created_by:{
        type: DataTypes.STRING,
        allowNull: true,
    },is_event:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true
    });
    // Users.hasMany(Articies);
    export default Articies; 