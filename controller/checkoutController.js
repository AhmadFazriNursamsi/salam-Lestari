import dotenv from "dotenv";
import qs from "qs";
import axios from "axios";
import { decodeToken } from '../helper/DecodeToken.js';
import { getSubdistrictId, getJNEDestination, getJNEbranch, getJNEorigin } from '../helper/RegionHelper.js';
import Store from "../model/storeModel.js";
import ShippingAddress from "../model/shippingAddress.js";
import Product from "../model/productModel.js";
import TransactionOrder from "../model/transactionOrderModel.js";
import TransactionOrderItem from "../model/transactionOrderItemModel.js";
import Users from "../model/userModel.js";
import Profile from "../model/profileModel.js";
import Invoice from "../model/invoiceModel.js";
import { Op } from "sequelize";
import { v4 as uuidv4, } from 'uuid';
import moment from "moment";
import Category from "../model/categoryModel.js";

dotenv.config();

export const courierCostList = async (req, res) => {

    const decoded = decodeToken(req.get("Authorization"));
    const userId = decoded.uid;
    console.log(userId);

    const { store_id, product, courier } = req.body;

    const store = await Store.findOne({
        where: {
            store_id: store_id
        }
    });

    if(!store) return res.status(400).json({
        message: "subdistrict_id from store not found",
        status: "Bad Request",
        code: 400
    });
    const originSubdistrictId = await getSubdistrictId(store.subdistrict);

    if (originSubdistrictId == 0) {
        return res.status(400).json({
            message: "subdistrict_id from store not found",
            status: "Bad Request",
            code: 400
        });
    }

    const shippingAddress = await ShippingAddress.findOne({
        where: {
            [Op.and]: [
                {
                    user_id: userId
                },
                {
                    default_location: 1
                }
            ],
        }
    });

    const destinationSubdistrictId = await getSubdistrictId(shippingAddress.subdistrict);

    if (destinationSubdistrictId == 0) {
        return res.status(400).json({
            message: "subdistrict_id from shipping address not found",
            status: "Bad Request",
            code: 400
        });
    }

    var weight = 0;

    for (let i = 0; i < product.length; i++) {
        const productList = await Product.findOne({
            where: {
                product_id: product[i].product_id
            }
        });
        const categoryFind = await Category.findOne({
            where: {
                category_id: productList.category_id,
                [Op.and]: [{
                    type: {
                        [Op.like]: '%' + 'hewan' + '%'
                    }
                }]
            }
        });

        // console.log(categoryFind);
        if(categoryFind != null){
            weight = productList.weight * product[i].quantity * 2;
            weight = weight *2
        }
        else{
            weight = productList.weight * product[i].quantity
        }
    }

    const url = process.env.API_RAJA_ONGKIR + '/api/cost';

    const data = qs.stringify({
        origin: originSubdistrictId,
        originType: "subdistrict",
        destination: destinationSubdistrictId,
        destinationType: "subdistrict",
        weight: weight,
        courier: courier,
    });

    try {
        var config = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'key': process.env.RAJA_ONGKIR_KEY,
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                res.status(200).json({
                    message: "Successfuly",
                    code: 0,
                    body: {
                        origin: response.data.rajaongkir.origin_details,
                        destination: response.data.rajaongkir.destination_details,
                        data: response.data.rajaongkir.results
                    }
                });
            })
            .catch(function (error) {
                res.status(500).json({
                    message: error,
                    status: "Internal Server Error",
                    code: 500
                });
            });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
}



export const tracking = async (req, res) => {

    // const decoded = decodeToken(req.get("Authorization"));
    // const userId = decoded.uid;
    // console.log(userId);

    // const { store_id, product, courier } = req.body;

    // const store = await Store.findOne({
    //     where: {
    //         store_id: store_id
    //     }
    // });

    // if(!store) return res.status(400).json({
    //     message: "subdistrict_id from store not found",
    //     status: "Bad Request",
    //     code: 400
    // });
    // const originSubdistrictId = await getSubdistrictId(store.subdistrict);

    // if (originSubdistrictId == 0) {
    //     return res.status(400).json({
    //         message: "subdistrict_id from store not found",
    //         status: "Bad Request",
    //         code: 400
    //     });
    // }

    // const shippingAddress = await ShippingAddress.findOne({
    //     where: {
    //         [Op.and]: [
    //             {
    //                 user_id: userId
    //             },
    //             {
    //                 default_location: 1
    //             }
    //         ],
    //     }
    // });

    // const destinationSubdistrictId = await getSubdistrictId(shippingAddress.subdistrict);

    // if (destinationSubdistrictId == 0) {
    //     return res.status(400).json({
    //         message: "subdistrict_id from shipping address not found",
    //         status: "Bad Request",
    //         code: 400
    //     });
    // }

    // var weight = 0;

    // for (let i = 0; i < product.length; i++) {
    //     const productList = await Product.findOne({
    //         where: {
    //             product_id: product[i].product_id
    //         }
    //     });
    //     const categoryFind = await Category.findOne({
    //         where: {
    //             category_id: productList.category_id,
    //             [Op.and]: [{
    //                 type: {
    //                     [Op.like]: '%' + 'hewan' + '%'
    //                 }
    //             }]
    //         }
    //     });

    //     // console.log(categoryFind);
    //     if(categoryFind != null){
    //         weight = productList.weight * product[i].quantity * 2;
    //         weight = weight *2
    //     }
    //     else{
    //         weight = productList.weight * product[i].quantity
    //     }
    // }

    // const url = process.env.API_RAJA_ONGKIR + '/api/waybill';

    const data = qs.stringify({
        waybill: req.body.airwaybill,
        courier: req.body.courier,
    });

    try {
        var config = {
            method: 'POST',
            url: 'https://pro.rajaongkir.com/api/waybill',
            headers: {
                'key': process.env.RAJA_ONGKIR_KEY,
                'content-type': 'application/x-www-form-urlencoded',
            },
            form: {waybill: req.body.airwaybill, courier: req.body.courier},
            data: data
        };

        // request(config, function (error, response, body) {
        //     if (error) {
        //         throw new Error(error);
        //         console.log(body.rajaongkir);
        //         res.status(500).json({
        //             message: body,
        //             status: "Internal Server Error",
        //             code: 500
        //         });   
        //     }
        //         else{
        //             res.status(500).json({
        //                 message: body,
        //                 status: "SUCCESSFULLY",
        //                 code: 500
        //             });   
        //         }         
        //     });
            
            // console.log(body);
            // res.status(200).json({
            //     message: "Successfuly",
            //     code: 0,
            //     body: {
            //         data: body
            //     }
            // });
          
          
        axios(config).then(function (response) {
                console.log(response.data.rajaongkir);
                res.status(200).json({
                    message: "Successfuly",
                    code: 0,
                    body: response.data.rajaongkir
                });
            })
            
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    message: error,
                    status: "Internal Server Error",
                    code: 500
                });
            });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
}

export const airpaypall = async (req, res) => {

    const decoded = decodeToken(req.get("Authorization"));
    const userId = decoded.uid;
    // console.log(userId);


    let date = new Date()
    let day = ("0" + date.getDate()).slice(-2)
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let currentDate = new Date(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds)

    var user = await Users.findOne({
        where: {
            user_id: userId
        }
    })
    var shipping = await ShippingAddress.findOne({
        where:
        {
            user_id:user.user_id
        }})
    const random =  Math.floor(Math.random() * 1000000000);

    const Transaction = await TransactionOrder.findOne({
        where: {
            transaction_id: req.body.transaction_id
        }
    }) ;

    if(!Transaction) return res.status(200).json({message: "ID Cannot be find ",code: 500,status: "ERROR!"});
    var Transaction_detail = await TransactionOrderItem.findOne({
        where: {
            transaction_id:Transaction.transaction_id
        }
    })
    
    
    // if(Transaction.order_status != "PACKING") return res.status(200).json({message: "Airwaybill already made ",code: 500,status: "ERROR!"});
    // if(Transaction.order_status != "WAITING_AIRWAYBILL") 
    const store = await Store.findOne({
        where: {
            store_id: Transaction.store_id
        }
    }) ;
    
    var product = await Product.findOne({
        where: {
            store_id: Transaction.store_id

        }
    })
    var countProduct = product.stock - Transaction_detail.quantity

    await product.update({
        stock: countProduct
    });

    const store_origin = await getJNEorigin(store.city);

    const user_origin = await getJNEDestination(shipping.subdistrict);

    const store_destination = await getJNEDestination(store.subdistrict);


    // console.log(user_origin[0].TARIFF_CODE);


    const url = 'https://apiv2.jne.co.id:10206/tracing/api/generatecnote';

    const data = qs.stringify({
        username: 'CONNEXIST',
        api_key: '830e83410da40f377131b5faaaffb267',
        OLSHOP_BRANCH: "CGK000",
        OLSHOP_CUST: "80580700",
        OLSHOP_ORDERID: random,
        OLSHOP_SHIPPER_NAME: store.store_id,
        OLSHOP_SHIPPER_ADDR1: store.address,
        OLSHOP_SHIPPER_ADDR2: store.village,
        OLSHOP_SHIPPER_ADDR3: store.subdistrict,
        OLSHOP_SHIPPER_CITY: store.city,
        OLSHOP_SHIPPER_REGION: store.province,
        OLSHOP_SHIPPER_ZIP: store_destination[0].ZIP_CODE,
        OLSHOP_SHIPPER_PHONE: store.phone,
        OLSHOP_RECEIVER_NAME: user.user_name,
        OLSHOP_RECEIVER_ADDR1: shipping.address,
        OLSHOP_RECEIVER_ADDR2: shipping.subdistrict,
        OLSHOP_RECEIVER_ADDR3: shipping.subdistrict,
        OLSHOP_RECEIVER_CITY: shipping.city,
        OLSHOP_RECEIVER_REGION: shipping.province,
        OLSHOP_RECEIVER_ZIP: user_origin[0].ZIP_CODE,
        OLSHOP_RECEIVER_PHONE: user.phone_number,
        OLSHOP_QTY: Transaction_detail.quantity,
        OLSHOP_WEIGHT: Transaction_detail.weight,
        OLSHOP_GOODSDESC: Transaction_detail.weight,
        OLSHOP_GOODSVALUE: Transaction.total_price,
        OLSHOP_GOODSTYPE: "1",
        OLSHOP_INST: product.condition,
        OLSHOP_INS_FLAG: "N",
        OLSHOP_ORIG: store_origin[0].origin_code,
        OLSHOP_DEST: user_origin[0].TARIFF_CODE,
        OLSHOP_SERVICE: Transaction.courier_service,
        OLSHOP_COD_FLAG: "N",
        OLSHOP_COD_AMOUNT: 0
    });

    try {
        var config = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            data: data
        };
        axios(config)
        .then(function (response) {
            
            if(Transaction.order_id == "" || Transaction.order_id == null){

                Transaction.update({
                    user_id:user.user_id,
                    order_status: "PACKING",
                    payment_status: "PAID",
                    packing_date: currentDate,
                    delivered_date: currentDate,
                    waybill: response.data.detail[0].cnote_no,
                    order_id:random
                })
                res.status(200).json({
                    message: "Successfuly",
                    code: 0,
                    body: response.data.detail[0]
                    
                });
            }

            else{
                res.status(200).json({
                    message: "RESI Already Exist!",
                    code: 0,
                    // data:data,
                    status: "Bad Request!"
                    
                });
            }
            
        // console.log(response.data.detail[0]);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    message: error,
                    status: "Internal Server Error",
                    code: 500
                });
            });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
}


export const paymentList = async (req, res) => {

    try {
        var config = {
            method: 'GET',
            url: process.env.API_PAYMENT_GATEWAY + "/payment_v2/pub/v1/payment/channels",
        };
        axios(config)
            .then(function (response) {

                const body = response.data.body;
                const data = [];

                for (let i = 0; i < body.length; i++) {
                    if (body[i].payment_method == "BANK_TRANSFER") {
                        data.push(body[i])
                    }
                }

                res.status(200).json({
                    message: "Successfuly",
                    code: 0,
                    body: data
                });
            })
            .catch(function (error) {
                res.status(500).json({
                    message: error,
                    status: "Internal Server Error",
                    code: 500
                });
            });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
}

export const paymentCheckout = async (req, res) => {

    const uid = uuidv4()
    const transactionId = uid

    const decoded = decodeToken(req.get("Authorization"))
    const userId = decoded.uid

    const { store_id, courier, courier_service, courier_price, payment_channel, payment_code, product } = req.body

    var weight = 0
    var price = 0
    var productItem = []

    for (let i = 0; i < product.length; i++) {
        const productList = await Product.findOne({
            where: {
                product_id: product[i].product_id
            }
        })

        var totalWeight = productList.weight * product[i].quantity
        var totalPrice = productList.price * product[i].quantity

        weight = weight + totalWeight
        price = price + totalPrice

        await TransactionOrderItem.create({
            product_id: product[i].product_id,
            quantity: product[i].quantity,
            weight:productList.weight,
            transaction_id: transactionId
        })

        productItem.push({
            price: totalPrice,
            quantity: product[i].quantity,
            product_id: product[i].product_id,
            product_code: product[i].product_id,
            product_name: productList.name
        });
    }

    const totalAmount = price + courier_price;

    // GENERATE NO INVOICE

    const invoiceDate = moment().format('YYYYMMDD');

    const invoiceData = await Invoice.findOne({
        where: {
            date_value: invoiceDate
        },
        order: [
            ['no', 'DESC'],
        ],
        limit: 1,
    });

    function pad(width, string, padding) {
        return (width <= string.length) ? string : pad(width, padding + string, padding)
    }

    var counterNumber = 1;

    if (invoiceData) {
        counterNumber = invoiceData.no + 1;
    }

    var invoiceValue = 'INV/' + invoiceDate + '/' + pad(10, counterNumber, '0');

    await Invoice.create({
        date_value: invoiceDate,
        no: counterNumber,
        value: invoiceValue,
        transaction_id: transactionId,
    });

    // CREATE TRANSACTION ORDER

    await TransactionOrder.create({
        transaction_id: transactionId,
        invoice_no: invoiceValue,
        store_id: store_id,
        courier_id: courier,
        user_id: userId,
        courier_service: courier_service,
        courier_price: courier_price,
        payment_channel: payment_channel,
        payment_code: payment_code,
        order_status: "WAITING_PAYMENT",
        total_price: totalAmount,
        payment_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        payment_status: "WAITING_PAYMENT"
    });

    // GET USER ID

    const user = await Users.findOne({
        where: {
            user_id: userId
        }
    });

    if (!user) return res.status(400).json({
        message: "Invalid user_id from users",
        status: "Bad Request",
        code: 400
    });
    
    const profile = await Profile.findOne({
        where: {
            user_id: userId
        }
    });
    
    if (!profile) return res.status(400).json({
        message: "Invalid user_id from profile",
        status: "Bad Request",
        code: 400
    });
    console.log(profile);

    // HIT PAYMENT GATEWAY

    const dateNow = moment().format('YYYYMMDD');

    var dd = dateNow + 2

    let date = new Date()
    let day = ("0" + date.getDate()).slice(-2)
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    let hours = date.getHours() + 2
    let minutes = date.getMinutes() 
    let seconds = date.getSeconds()
    let currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
    // console.log(currentDate, dd);
    const jsonBody = {
        channel: payment_code,
        total_amount: totalAmount,
        billing_id: transactionId,
        billing_uid: userId,
        billing_phone: user.phone_number,
        billing_email: user.email_address,
        billing_name: profile.name,
        billing_address: "",
        trx_id: transactionId,
        trx_date: dateNow,
        trx_desc: "Ecommerce Fiona",
        success_url: "",
        callback_url: process.env.CALLBACK_URL+"/" + transactionId,
        description: "Ecommerce Fiona",
        merchant: "fiona",
        remark: "Ecommerce Fiona",
        expired: dd,
        item: productItem
    }
 
    console.log(jsonBody);
    try {
        var config = {
            method: 'POST',
            url: process.env.API_PAYMENT_GATEWAY + '/payment_v2/api/v1/pay/direct',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(process.env.PG_APP_KEY + ':' + process.env.PG_APP_SECRET).toString('base64')
            },
            data: jsonBody
        };
        axios(config)
            .then(function (response) {

                TransactionOrder.update(
                    {
                        invoice_url: response.data.body.invoice_url,
                    },
                    {
                        where: { 
                            transaction_id: transactionId 
                        },
                    }
                    );

                res.status(200).json({
                    message: "Successfuly",
                    code: 0,
                    body: response.data.body
                });
            })
            .catch(function (error) {

                // DELETE AFTER FAIL

                TransactionOrderItem.destroy({
                    where: {
                        transaction_id: transactionId
                    }
                });

                TransactionOrder.destroy({
                    where: {
                        transaction_id: transactionId
                    }
                });

                Invoice.destroy({
                    where: {
                        transaction_id: transactionId
                    }
                });

                res.status(500).json({
                    message: error.response.data.message,
                    status: "Internal Server Error",
                    code: 500
                });
            });

    } catch (error) {

        // DELETE AFTER FAIL

        TransactionOrderItem.destroy({
            where: {
                transaction_id: transactionId
            }
        });

        TransactionOrder.destroy({
            where: {
                transaction_id: transactionId
            }
        });

        Invoice.destroy({
            where: {
                transaction_id: transactionId
            }
        });

        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
}
