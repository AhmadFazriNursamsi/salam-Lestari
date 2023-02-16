import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const StoreCourier = db.define('store_couriers', {
    courier_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, store_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default StoreCourier;