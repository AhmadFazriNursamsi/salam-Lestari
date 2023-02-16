import Sequelize from "sequelize";
import db from "../config/database.js";
import StoreCourier from "./storeCourierModel.js";

const DataTypes = Sequelize;

const Store_saldo = db.define('stores_wallet', {
    store_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    saldo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
    
}, {
    freezeTableName: true
});

export default Store_saldo; 