import ShippingAddress from "../model/shippingAddress.js"
import { v4 as uuidv4, } from 'uuid';
import { decodeToken } from '../helper/DecodeToken.js'

export const createShippingAddress = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid;
        const uid = uuidv4();
        console.log(decoded);

        const { address, postal_code, province, city, subdistrict, name, lat, long, default_location } = req.body;

        // const shippingAddress = await ShippingAddress.create({
        //     shipping_address_id: uid,
        //     user_id: userId,
        //     address: address,
        //     postal_code: postal_code,
        //     province: province,
        //     city: city,
        //     subdistrict: subdistrict,
        //     name: name,
        //     lat: lat,
        //     long: long,
        //     default_location: parseInt(default_location)
        // })

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: shippingAddress
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        })
    }
}

export const getAllShippingAddress = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid
        const shippingAddress = await ShippingAddress.findAll({
            where: {
                user_id: userId
            }
        })
        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: shippingAddress
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        })
    }
}

export const getShippingAddressInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const shippingAddress = await ShippingAddress.findOne({
            where: {
                shipping_address_id: id
            }
        });

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: shippingAddress
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        })
    }
}

export const updateShippingAddress = async (req, res) => {
    try {

        const { shipping_address_id, address, postal_code, province, city, subdistrict, name, lat, long, default_location } = req.body;

        const shippingAddress = await ShippingAddress.findOne({
            where: {
                shipping_address_id: shipping_address_id
            }
        })

        if (!shippingAddress) return res.status(400).json({
            message: "Invalid shipping_address_id",
            status: "Bad Request",
            code: 400
        })

        const data = await shippingAddress.update({
            address: address,
            postal_code: postal_code,
            province: province,
            city: city,
            subdistrict: subdistrict,
            name: name,
            lat: lat,
            long: long,
            default_location: parseInt(default_location)
        })

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: shippingAddress
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        })
    }
}

export const deleteShippingAddress = async (req, res) => {
    try {
        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.uid;

        const { shipping_address_id } = req.body;

        const shippingAddress = await ShippingAddress.findOne({
            where: {
                shipping_address_id: shipping_address_id,
                user_id: userId
            }
        });

        if (!shippingAddress) 
            return res.status(400).json({
                message: "Invalid shipping_address_id",
                status: "Bad Request",
                code: 400
            })

        await shippingAddress.destroy()

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: shippingAddress
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        })
    }
}