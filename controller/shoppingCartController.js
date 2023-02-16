import ShoppingCart from '../model/shoppingCartModel.js'
import Product from '../model/productModel.js'
import Store from '../model/storeModel.js'
import { v4 as uuidv4, } from 'uuid'
import { decodeToken } from '../helper/DecodeToken.js'
import ProductPicture from '../model/productPictureModel.js'

export const createCart = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid
        const uid = uuidv4()

        const { product_id, quantity, note } = req.body

        const cart = await ShoppingCart.findOne({
            where: {
                product_id: product_id,
                user_id: userId
            }
        })

        if (cart) {
            await cart.update({
                quantity: quantity + cart.quantity,
            })

            res.status(200).json({
                message: "Successfuly",
                code: 0,
                body: cart
            })

        } else {
            const data = await ShoppingCart.create({
                cart_id: uid,
                user_id: userId,
                product_id: product_id,
                quantity: quantity,
                note: note
            })

            res.status(200).json({
                message: "Successfuly",
                code: 0,
                body: data
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "Internal Server Error",
            code: 400
        })
    }
}

export const getCartInfo = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid

        const cart = await ShoppingCart.findAll({
            where: {
                user_id: userId
            }
        })

        const resData = {
            user_id: userId,
            total_item: 0,
            total_price: 0,
        }

        var totalItem = 0
        var totalPrice = 0
        var stores = []

        for (let i = 0; i < cart.length; i++) {

            totalItem = totalItem + 1

            const product = await Product.findOne({
                where: {
                    product_id: cart[i].product_id
                }
            });

            const productPictures = await ProductPicture.findOne({
                where: {
                    product_id: cart[i].product_id
                }
            })

            const store = await Store.findOne({
                where: {
                    store_id: product.store_id
                }
            })

            stores.push({
                store_info: store,
                items: {
                    cart_id: cart[i].cart_id,
                    product_id: product.product_id,
                    product: {
                        "name": product.name,
                        "picture": productPictures,
                        "category_id": product.category_id,
                        "price": product.price,
                        "admin_charge": product.admin_charge,
                        "store_id": product.store_id,
                        "weight": product.weight,
                        "description": product.description,
                        "stock": product.stock,
                        "condition": product.condition,
                        "min_order": product.min_order,
                        "status": product.status,
                    },
                    store_id: product.store_id,
                    quantity: cart[i].quantity,
                    note: cart[i].note,
                    price: product.price
                }
            });

            totalPrice += cart[i].quantity * product.price
        }

        var storeNew = []

        for (let i = 0; i < stores.length; i++) {
            var store = stores[i].store_info
            var item = []

            for (let j = 0; j < stores.length; j++) {
                if (stores[j].store_info.store_id == store.store_id) {
                    item.push(stores[j].items)
                }
            }

            storeNew.push({
                store_info: store,
                items: item
            });
        }

        const uniqueIds = []

        const unique = storeNew.filter(element => {
            const isDuplicate = uniqueIds.includes(element.store_info.store_id)
            if (!isDuplicate) {
                uniqueIds.push(element.store_info.store_id)
                return true
            }
            return false
        })

        resData.total_item = totalItem
        resData.total_price = totalPrice
        resData.stores = unique

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: resData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "Internal Server Error",
            code: 400
        })
    }
}

export const updateQuantityCart = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid

        const { cart_id, quantity } = req.body

        const cart = await ShoppingCart.findOne({
            where: {
                cart_id: cart_id,
                user_id: userId
            }
        })

        if (!cart) return res.status(400).json({
            message: "Invalid cart id",
            status: "Bad Request",
            code: 400
        })

        await cart.update({
            quantity: quantity,
        })

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: cart
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "Internal Server Error",
            code: 400
        })
    }
}

export const updateNoteCart = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid

        const { cart_id, note } = req.body

        const cart = await ShoppingCart.findOne({
            where: {
                cart_id: cart_id,
                user_id: userId
            }
        })

        if (!cart) return res.status(400).json({
            message: "Invalid cart id",
            status: "Bad Request",
            code: 400
        })

        await cart.update({
            note: note,
        })

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: cart
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "Internal Server Error",
            code: 400
        })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid

        const { cart_id } = req.body

        const cart = await ShoppingCart.findOne({
            where: {
                cart_id: cart_id,
                user_id: userId
            }
        })

        if (!cart) return res.status(400).json({
            message: "Invalid cart id",
            status: "Bad Request",
            code: 400
        })

        await cart.destroy()

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: cart
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "Internal Server Error",
            code: 400
        })
    }
}