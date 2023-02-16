import { where } from "sequelize";
import Inbox from "../model/inboxModel.js";
import axios from "axios";
import Users from "../model/userModel.js";
import Data from "../model/data.js"

export const getInbox = async(req, res)=>{
    try{
        const inbox = await Inbox.findAll({
        });
        res.status(200).json(inbox);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getInboxById = async(req, res)=>{
    try{
        const inbox = await Inbox.findOne({
            where: {
                id: req.params.id}
        });
        res.status(200).json(inbox);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const createInbox = async(req, res)=>{
    try{
        const { subject,body,type,field1,field2,field3,field4,field5,field6,field7,read} = req.body ;

        const user = await Users.findOne({
            where: {
                user_id:req.body.recepientId
            }
        });

        const datas = await Data.findOne({
            where :{
                user_id: user.user_id
            }
        }) ;
        // console.log(datas);

            var data = JSON.stringify({
            "destination": datas.fcm_secret,
            "subject": "Test",
            "content": "hello",
            "data": {
                "type": "broadcast"
            },
            "priority": "high",
            "source": "fspmi"
            });

            var config = {
            method: 'post',
            url: 'https://smsapi.connexist.com:8443/notification-service/notification/v1/fcm',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });       
            const inboxs = await Inbox.findOne({where: {
                sender_id: datas.user_id
            }}) ;
            console.log(inboxs);
            
            
        const inboxx = await inboxs.update({subject:subject,
            body:body,
            type:type,
            field1:field1,
            field2:field2,
            field3:field3,
            field4:field4,
            field5:field5,
            field6:field6,
            field7:field7,
            read:read,}) ;
        // console.log(inboxx);

        // const inbox = await inboxx.update({
        //     subject:subject,
        //     body:body,
        //     type:type,
        //     field1:field1,
        //     field2:field2,
        //     field3:field3,
        //     field4:field4,
        //     field5:field5,
        //     field6:field6,
        //     field7:field7,
        //     read:read,
        // });
            
        res.status(200).json(inboxx);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const updateInbox = async(req, res)=>{

    try{
        const { subject,body,type,field1,field2,field3,field4,field5,field6,field7,read} = req.body ;
        
        const inbox = await Inbox.update({
            subject:subject,
            body:body,
            type:type,
            field1:field1,
            field2:field2,
            field3:field3,
            field4:field4,
            field5:field5,
            field6:field6,
            field7:field7,
            read:read,
        }, {where: {
            id: req.params.id
        }
        });
        res.status(200).json({subject,body,type,field1,field2,field3,field4,field5,field6,field7,read});
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};
export const deleteInbox = async(req, res)=>{
    const inbox = await Inbox.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!inbox) return res.status(404).json({message: "Data Tidak ditemukan!"});
   try{
        await Inbox.destroy({
            where: {
                id: inbox.id
            }

        });
        res.status(200).json({message: "Data Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }  
};