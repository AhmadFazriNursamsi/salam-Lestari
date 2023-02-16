import Sequelize from "sequelize";
import db from "../config/database.js";
import ProductPicture from "./productPictureModel.js";
import Category from "./categoryModel.js";
import Store from "./storeModel.js";

const DataTypes = Sequelize;

const Product = db.define('products', {
    product_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, category_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, admin_charge: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, store_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }, weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, description: {
        type: DataTypes.STRING,
        allowNull: true,
    }, stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, condition: {
        type: DataTypes.STRING,
        allowNull: true,
    }, min_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

Product.hasMany(Store, {
    foreignKey: 'store_id',
    sourceKey: 'store_id',
    as: 'store'
});

Store.belongsTo(Product, {
    foreignKey: 'store_id',
    targetKey: 'store_id'
});


Product.hasMany(ProductPicture, {
    foreignKey: 'product_id',
    sourceKey: 'product_id',
    as: 'pictures'
});

ProductPicture.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'product_id'
});

Product.hasMany(Category, {
    foreignKey: 'category_id',
    sourceKey: 'category_id',
    as: 'category'
});

Category.belongsTo(Product, {
    foreignKey: 'category_id',
    targetKey: 'category_id'
});

export default Product; 