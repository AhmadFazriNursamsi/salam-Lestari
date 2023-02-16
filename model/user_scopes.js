import Sequelize from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const DataTypes = Sequelize;

const User_scopes =  db.define('user_scopes', {
    scope:{
        type: DataTypes.STRING,
        allowNull: true,
    },status:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true
    });
    Users.hasMany(User_scopes);
    export default User_scopes; 