import Sequelize from "sequelize";
import db from "../config/database.js";
import StoreCourier from "./storeCourierModel.js";

const DataTypes = Sequelize;

const Store_history = db.define('stores_history', {
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 
    
}, {
    freezeTableName: true
});

export default Store_history; 