import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const SOS =  db.define('sos', {
    geo_position:{
        type: DataTypes.STRING,
        allowNull: true,
    }, address:{
        type: DataTypes.STRING,
        allowNull: true,
    },user_id:{
        type: DataTypes.STRING,
        allowNull: true,
        
    },sos_id:{
        type: DataTypes.STRING,
        allowNull: true,
        
    },sos_type:{
        type: DataTypes.STRING,
        allowNull: true,
    },message:{
        type: DataTypes.STRING,
        allowNull: true,
    },sender:{
        type: DataTypes.STRING,
        allowNull: true,
    },phone_number:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true
    });
    // Users.hasMany(SOS);
    export default SOS; 