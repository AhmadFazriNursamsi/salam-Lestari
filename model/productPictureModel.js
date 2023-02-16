import Sequelize from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const ProductPicture = db.define('product_pictures', {
    product_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, content_type: {
        type: DataTypes.STRING,
        allowNull: true,
    }, file_length: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, original_name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, path: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

export default ProductPicture;