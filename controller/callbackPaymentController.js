import TransactionOrder from "../model/transactionOrderModel.js";
import { v4 as uuidv4, } from 'uuid';
import moment from "moment";
import Store_history from "../model/store_history .js";
import Store from "../model/storeModel.js";
import TransactionOrderItem from "../model/transactionOrderItemModel.js";
import Product from "../model/productModel.js";
export const callbackPayment = async (req, res) => {
    try {

        const trxId = req.params.transaction_id;
        
        var data = await TransactionOrder.findOne(
            {
                where: { 
                    transaction_id: trxId
                },
            }
        );
         
        if(data.order_status == "WAITING_PAYMENT"){

            var transaksi = await TransactionOrder.update(
                {
                order_status: "WAITING_AIRWAYBILL",
                payment_status: "PAID",
                payment_paid_date: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                where: { 
                    transaction_id: trxId 
                },
            }
            );
        }
        if(data.order_status != "WAITING_PAYMENT") return res.status(200).json({message: "Bad Request",code: 500,status: "ERROR!"});
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

export const updateSaldo = async (req, res) => {
    try {

    const trxId = req.query.ref_id;

    var trx = await TransactionOrder.findOne({
        where: {
            transaction_id: trxId
        }
    })
    if(trx.order_status != "PACKING") return res.status(200).json({message: "BAD REQUEST!", code: 500, status: "ERROR!" });

    if(trx.order_status == "PACKING"){

      var transaksi = await TransactionOrder.update(
            {
                order_status: "SUCCESS",
                payment_status: "PAID",
                finish_date: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                where: { 
                    transaction_id: trxId 
                },
            }
        );
        
        if(!trx) return res.status(200).json({message: "ID Cannot Be Find ",code: 500,status: "ERROR!"});

        if(trx.dataValues.waybill == null) return res.status(200).json({message: "Bad Request",code: 500,status: "ERROR!"});
            const uid = uuidv4();
            const transactionId = uid;
            var trxi = await TransactionOrderItem.findOne({
                where: {
                    transaction_id: trxId
                }
            })
            var productamount = await Product.findOne({
                where:{
                    product_id : trxi.product_id
                }
            });
            
            var jumlah = productamount.price * trxi.quantity
            var storeAmoun = await Store.findOne({
                where:{
                    store_id: trx.store_id
                } 
            });
            var ammount = storeAmoun.amount + jumlah;

            if(storeAmoun){
                await storeAmoun.update({
                    amount: ammount
                })
                var store_history = await Store_history.findOne({
                    where: {
                        transaction_id: trxId
                    }
                });

                if(store_history){
                    await store_history.update({
                        deskripsi: 'SUCCESS',
                        amount: jumlah
                    })
                }
                else{
                    await Store_history.create({
                        transaction_id: trxId,
                        deskripsi: 'SUCCESS',
                        amount: jumlah
                    })
                }
                
            }
        }
        
        res.status(200).json({message: "Successfully!!", code: 0, body: storeAmoun });
         
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};
