import Sequelize from "sequelize"
import db from "../config/database.js"
import Users from "./userModel.js"

const DataTypes = Sequelize

const ForgotPassword = db.define('forgot_password', {
    code:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    base_url:{
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
})

export default ForgotPassword 
