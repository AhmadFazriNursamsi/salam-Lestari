import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const Scopes =  db.define('scopes', {
    parent:{
        type: DataTypes.STRING,
        allowNull: true,
    }, scope:{
        type: DataTypes.STRING,
        allowNull: true,
    },status:{
        type: DataTypes.STRING,
        allowNull: true,
    },description:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true
    });
    // Users.hasMany(Data);
    export default Scopes; 