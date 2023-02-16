import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Invoice = db.define('invoices', {
    date_value: {
        type: DataTypes.STRING,
        allowNull: true,
    }, no: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, value: {
        type: DataTypes.STRING,
        allowNull: true,
    }, transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default Invoice;