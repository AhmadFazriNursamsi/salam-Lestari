import Product from "../model/productModel.js";
import ProductPicture from "../model/productPictureModel.js";
import Category from "../model/categoryModel.js";
import Store from "../model/storeModel.js";
import { v4 as uuidv4, } from 'uuid';
import Users from "../model/userModel.js";
import { Op } from "sequelize";
export const createProduct = async (req, res) => {
    try {
        const uid = uuidv4();

        const { name, category_id, price, admin_charge, store_id, weight, description, stock, condition, min_order, pitures } = req.body;

        const productId = uid;

        const data = await Product.create({
            product_id: productId,
            name: name,
            category_id: category_id,
            price: price,
            admin_charge: admin_charge,
            store_id: store_id,
            weight: weight,
            description: description,
            stock: stock,
            condition: condition,
            min_order: min_order,
            status: 1
        });

        for (let i = 0; i < pitures.length; i++) {
            const productPictures = await ProductPicture.create({
                product_id: productId,
                content_type: pitures[i].content_type,
                file_length: pitures[i].file_length,
                original_name: pitures[i].original_name,
                path: pitures[i].path
            });
        }

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};

export const getAllProduct = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.size) || 10;
        const search = req.query.productName || "";
        const sort = req.query.sort || "desc";
        const offset = limit * page;
        const storeId = req.query.storeId || "";
        const categoryId = req.query.categoryId || "";

        const totalSize = await Product.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    },
                    store_id: {
                        [Op.like]: '%' + storeId + '%'
                    },
                    category_id: {
                        [Op.like]: '%' + categoryId + '%'
                    }
                }]
            }
        });

        const totalPage = Math.ceil(totalSize / limit);

        const data = await Product.findAll(
            {
                include: [
                    {
                        model: Store,
                        as: 'store',
                        attributes: ['owner', 'name', 'picture', 'description', 'open', 'province', 'city', 'subdistrict', 'village', 'postal_code', 'address', 'email', 'phone', 'lat', 'long']
                    },
                    {
                        model: ProductPicture,
                        as: 'pictures',
                        attributes: ['content_type', 'file_length', 'original_name', 'path']
                    },
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name', 'picture', 'type'],
                    }
                ],
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + search + '%'
                        },
                        store_id: {
                            [Op.like]: '%' + storeId + '%'
                        },
                        category_id: {
                            [Op.like]: '%' + categoryId + '%'
                        }
                    }]
                },
                limit: limit,
                offset: offset,
                order: [
                    ['createdAt', '' + sort + ''],
                ],
            }
        );

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: {
                totalSize: totalSize,
                totalPage: totalPage,
                page: page,
                size: limit,
                data: data
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};


export const getProductdelete = async (req, res) => {
    try {
    //    const user = await Users.findOne({
    //         where:{
    //             user_id:req.params.id
    //         }
    //     });
        const store = await Product.findOne({
            where: {
                product_id:req.params.id
            }
        })
        if(!store) return res.status(200).json({
            message: "Id Cannot Be Find ",
            code: 500,
            status: "Bad request!"
        });

         await store.destroy({});

        // const data = await Product.findAll({
        //     include: [
        //         {
        //             model: Store,
        //             as: 'store',
        //             attributes: ['owner', 'name', 'picture', 'description', 'open', 'province', 'city', 'subdistrict', 'village', 'postal_code', 'address', 'email', 'phone', 'lat', 'long']
        //         },
        //         {
        //             model: ProductPicture,
        //             as: 'pictures',
        //             attributes: ['content_type', 'file_length', 'original_name', 'path']
        //         },
        //         {
        //             model: Category,
        //             as: 'category',
        //             attributes: ['name', 'picture'],
        //         }
        //     ],
        //     where: {
        //         store_id: store.store_id
        //     }
        // });
        // console.log(data);

        res.status(200).json({
            message: "Successfuly Delete!",
            code: 0,
            body: store
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};

export const getProductInfoStore = async (req, res) => {
    try {
       const user = await Users.findOne({
            where:{
                user_id:req.params.id
            }
        });
        const store = await Store.findOne({
            where: {
                owner:user.user_id
            }
        })
        if(!store) return res.status(200).json({
            message: "Id Cannot Be Find ",
            code: 500,
            status: "Bad request!"
        });

        const data = await Product.findAll({
            include: [
                {
                    model: Store,
                    as: 'store',
                    attributes: ['owner', 'name', 'picture', 'description', 'open', 'province', 'city', 'subdistrict', 'village', 'postal_code', 'address', 'email', 'phone', 'lat', 'long']
                },
                {
                    model: ProductPicture,
                    as: 'pictures',
                    attributes: ['content_type', 'file_length', 'original_name', 'path']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'picture'],
                }
            ],
            where: {
                store_id: store.store_id
            }
        });
        // console.log(data);

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};


export const getProductInfo = async (req, res) => {
    try {
        const data = await Product.findOne({
            include: [
                {
                    model: Store,
                    as: 'store',
                    attributes: ['owner', 'name', 'picture', 'description', 'open', 'province', 'city', 'subdistrict', 'village', 'postal_code', 'address', 'email', 'phone', 'lat', 'long']
                },
                {
                    model: ProductPicture,
                    as: 'pictures',
                    attributes: ['content_type', 'file_length', 'original_name', 'path']
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'picture', 'type'],
                }
            ],
            where: {
                product_id: req.params.id
            }
        });

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { product_id, name, category_id, price, admin_charge, weight, description, stock, condition, min_order, pitures } = req.body;

        const product = await Product.findOne({
            where: {
                product_id: product_id
            }
        });

        if (!product) return res.status(400).json({
            message: "Invalid product id",
            status: "Bad Request",
            code: 400
        });

        const data = await product.update({
            name: name,
            category_id: category_id,
            price: price,
            admin_charge: admin_charge,
            weight: weight,
            description: description,
            stock: stock,
            condition: condition,
            min_order: min_order,
        });

        await ProductPicture.destroy({
            where: {
                product_id: product_id
            }
        });

        for (let i = 0; i < pitures.length; i++) {

            const productPictures = await ProductPicture.create({
                product_id: product_id,
                content_type: pitures[i].content_type,
                file_length: pitures[i].file_length,
                original_name: pitures[i].original_name,
                path: pitures[i].path
            });
        }

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: req.body
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};
