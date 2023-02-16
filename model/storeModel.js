import Sequelize from "sequelize";
import db from "../config/database.js";
import StoreCourier from "./storeCourierModel.js";

const DataTypes = Sequelize;

const Store = db.define('stores', {
    store_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, owner: {
        type: DataTypes.STRING,
        allowNull: true,
    }, name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, description: {
        type: DataTypes.STRING,
        allowNull: true,
    }, open: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, picture: {
        type: DataTypes.STRING,
        allowNull: true,
    }, province: {
        type: DataTypes.STRING,
        allowNull: true,
    }, city: {
        type: DataTypes.STRING,
        allowNull: true,
    }, subdistrict: {
        type: DataTypes.STRING,
        allowNull: true,
    }, village: {
        type: DataTypes.STRING,
        allowNull: true,
    }, postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    }, address: {
        type: DataTypes.STRING,
        allowNull: true,
    }, email: {
        type: DataTypes.STRING,
        allowNull: true,
    }, phone: {
        type: DataTypes.STRING,
        allowNull: true,
    }, lat: {
        type: DataTypes.STRING,
        allowNull: true,
    }, long: {
        type: DataTypes.STRING,
        allowNull: true,
    }, status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default Store; 