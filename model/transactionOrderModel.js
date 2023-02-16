import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const TransactionOrder = db.define('transaction_orders', {
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, invoice_no: {
        type: DataTypes.STRING,
        allowNull: true,
    }, store_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, order_status: {
        type: DataTypes.STRING,
        allowNull: true,
    }, courier_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, courier_service: {
        type: DataTypes.STRING,
        allowNull: true,
    }, courier_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, total_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, payment_code: {
        type: DataTypes.STRING,
        allowNull: true,
    }, payment_channel: {
        type: DataTypes.STRING,
        allowNull: true,
    }, payment_status: {
        type: DataTypes.STRING,
        allowNull: true,
    }, payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, payment_paid_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, packing_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, delivered_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, waybill: {
        type: DataTypes.STRING,
        allowNull: true,
    }, finish_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }, invoice_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default TransactionOrder;