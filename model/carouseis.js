import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const Carousels =  db.define('carousels', {
    name:{
        type: DataTypes.STRING,
        allowNull: true,
    }, placement:{
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
    }
},{
    freezeTableName: true
    });
    // Users.hasMany(Data);
    export default Carousels; 