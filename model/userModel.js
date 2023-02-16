import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize

const Users =  db.define('users', {
    status:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    email_address:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: false
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [6, 100]
        }
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_type:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    },
    user_id:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    email_activated:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_activated:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    otp:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date_activated:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    otp_expired:{
        type: DataTypes.STRING,
        expires:'2m',
        index:true,
        allowNull: true,
    },
    payment_activated:{
        type: DataTypes.STRING,
        allowNull: true,
    },   
},{
    freezeTableName: true
})

export default Users