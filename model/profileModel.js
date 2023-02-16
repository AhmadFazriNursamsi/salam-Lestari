import Sequelize from "sequelize"
import db from "../config/database.js"
import Users from "./userModel.js"

const DataTypes = Sequelize

const Profile = db.define('profiles', {
    user_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favorite:{
        type: DataTypes.STRING,
        allowNull: true,
    },profile_pic:{
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
})

Users.hasMany(Profile, {foreignKey : 'user_id'})

export default Profile 