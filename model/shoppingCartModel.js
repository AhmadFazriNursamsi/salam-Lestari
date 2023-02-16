import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const ShoppingCart = db.define('shopping_carts', {
    cart_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, product_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, note: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default ShoppingCart;