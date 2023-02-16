import Courier from '../model/courierModel.js';
import { v4 as uuidv4, } from 'uuid';

export const createCourier = async (req, res) => {
    try {

        const { courier_id, name, picture, check_price, check_resi } = req.body;

        const data = await Courier.create({
            courier_id: courier_id,
            name: name,
            picture: picture,
            check_price: parseInt(check_price),
            check_resi: parseInt(check_resi)
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
}

export const getAllCourier = async (req, res) => {
    try {
        const data = await Courier.findAll();

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
}

export const getCourierInfo = async (req, res) => {
    try {
        const data = await Courier.findOne({
            where: {
                courier_id: req.params.id
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
}

export const updateCourier = async (req, res) => {
    try {
        const { courier_id, name, picture, check_price, check_resi } = req.body;

        const courier = await Courier.findOne({
            where: {
                courier_id: courier_id
            }
        });

        if (!courier) return res.status(400).json({
            message: "Invalid courier id",
            status: "Bad Request",
            code: 400
        });

        const data = await courier.update({
            name: name,
            picture: picture,
            check_price: parseInt(check_price),
            check_resi: parseInt(check_resi)
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
}