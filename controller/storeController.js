import Store from "../model/storeModel.js"
import StoreCourier from "../model/storeCourierModel.js"
import Courier from "../model/courierModel.js"
import { v4 as uuidv4, } from 'uuid'
import { response } from "../helper/response.js"

export const createStore = async (req, res) => {
    try {
        const uid = uuidv4()
        const storeId = uid;

        const { 
            owner, name, 
            description, picture, 
            province, city, 
            subdistrict, village, 
            postal_code, address, email, phone, 
            lat, long, supported_courier 
        } = req.body

        const users = await Store.findOne({
            where: {
                owner: owner
            }
        })

        if (users) 
            throw new Error("User already opened store")

        const data = await Store.create({
            store_id: storeId,
            owner: owner,
            name: name,
            description: description,
            picture: picture,
            province: province,
            city: city,
            subdistrict: subdistrict,
            village: village,
            postal_code: postal_code,
            address: address,
            email: email,
            phone: phone,
            lat: lat,
            long: long,
            open: 1,
            status: 1
        })

        for (let i = 0; i < supported_courier.length; i++) {
            await StoreCourier.create({
                store_id: storeId,
                courier_id: supported_courier[i]
            })
        }

        data.dataValues.supported_courier = supported_courier;

        response(res, 200, false, "")
    } catch (e) {
        response(res, 400, true, e.message)
    }
}

export const getAllStore = async (req, res) => {
    try {
        const data = await Store.findAll();

        const result = [];

        for (let i = 0; i < data.length; i++) {
            const storeCourier = await StoreCourier.findAll({
                where: {
                    store_id: data[i].store_id
                }
            });
            
            const courier = [];

            for (let j = 0; j < storeCourier.length; j++) {

                const courierData = await Courier.findOne({
                    where: {
                        courier_id: storeCourier[j].courier_id
                    }
                });

                courier.push(courierData);
            }

            result.push({
                store_id: data[i].store_id,
                owner: data[i].owner,
                name: data[i].name,
                description: data[i].description,
                picture: data[i].picture,
                province: data[i].province,
                city: data[i].city,
                subdistrict: data[i].subdistrict,
                village: data[i].village,
                postal_code: data[i].postal_code,
                address: data[i].address,
                email: data[i].email,
                phone: data[i].phone,
                lat: data[i].lat,
                long: data[i].long,
                open: data[i].open,
                status: data[i].status,
                supported_courier: courier,
                cretedAt: data[i].createdAt,
                updatedAt: data[i].updatedAt
            });
        }

        response(res, 200, false, "")
    } catch (e) {
        console.log(e.message) // in-development
        response(res, 400, true, "Server error")
    }
};

export const getStoreInfo = async(req, res)=>{
    try{
        const data = await Store.findOne({
            where: {
                store_id: req.params.id
            }
        })

        const storeCourier = await StoreCourier.findAll({
            where: {
                store_id: data.store_id
            }
        })
        
        const courier = [];

        for (let j = 0; j < storeCourier.length; j++) {
            const courierData = await Courier.findOne({
                where: {
                    courier_id: storeCourier[j].courier_id
                }
            })
            courier.push(courierData)
        }

        data.dataValues.supported_courier = courier

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        })

    }   catch (e) {
        console.log(e.message) // in-development
        response(res, 400, true, "Server error")
    }
}

export const updateStore = async (req, res) => {
    try {
        const { store_id, name, description, 
            picture, province, city, subdistrict, 
            village, postal_code, address, email, phone, 
            lat, long, supported_courier 
        } = req.body

        const store = await Store.findOne({
            where: {
                store_id: store_id
            }
        })

        if (!store) 
            throw new Error("Invalid store_id")

        const data = await store.update({
            name: name,
            description: description,
            picture: picture,
            province: province,
            city: city,
            subdistrict: subdistrict,
            village: village,
            postal_code: postal_code,
            address: address,
            email: email,
            phone: phone,
            lat: lat,
            long: long
        })

        await StoreCourier.destroy({
            where: {
                store_id: store_id
            }
        })

        for (let i = 0; i < supported_courier.length; i++) {
            await StoreCourier.create({
                store_id: store_id,
                courier_id: supported_courier[i]
            })
        }

        data.dataValues.supported_courier = supported_courier

        response(res, 200, false, "")
    } catch (e) {
        response(res, 400, true, e.message)
    }
}