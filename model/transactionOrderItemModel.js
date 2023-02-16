import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const TransactionOrderItem = db.define('transaction_order_items', {
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default TransactionOrderItem;
