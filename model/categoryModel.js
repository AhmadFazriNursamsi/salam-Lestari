import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Category = db.define('categories', {
    category_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, picture: {
        type: DataTypes.STRING,
        allowNull: true,
    }, status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },type: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default Category;