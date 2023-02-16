import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const ShippingAddress = db.define('shipping_address', {
    shipping_address_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, address: {
        type: DataTypes.STRING,
        allowNull: true,
    }, postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    }, province: {
        type: DataTypes.STRING,
        allowNull: true,
    }, city: {
        type: DataTypes.STRING,
        allowNull: true,
    }, province: {
        type: DataTypes.STRING,
        allowNull: true,
    }, subdistrict: {
        type: DataTypes.STRING,
        allowNull: true,
    }, name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, lat: {
        type: DataTypes.STRING,
        allowNull: true,
    }, long: {
        type: DataTypes.STRING,
        allowNull: true,
    }, default_location: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default ShippingAddress;