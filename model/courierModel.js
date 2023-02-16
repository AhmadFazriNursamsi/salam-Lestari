import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Courier = db.define('couriers', {
    courier_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, picture: {
        type: DataTypes.STRING,
        allowNull: true,
    }, check_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, check_resi: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default Courier;