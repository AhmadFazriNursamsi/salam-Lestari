import Data from "../model/data.js";
import Users from "../model/userModel.js";
import Sos from "../model/sos.js";
import Inbox from "../model/inboxModel.js";
import axios from "axios";
import { v4 as uuidv4, } from 'uuid';
import jwtDecode from "jwt-decode";
import qs from "qs";
import db from "../config/database.js"
import fs from "fs"
import FormData from 'form-data' // npm install --save form-data
import { fileURLToPath } from "url";


export const getData = async(req, res)=>{
    try{
        const data = await Data.findAll({
        });
        res.status(200).json(data);
    }catch (error){
        res.status(500).json({message: error.message});
    }  
};
export const getDataById = async(req, res)=>{
    try{
        const data = await Data.findOne({
            where: {
                id: req.params.id}
        });
        res.status(200).json(data);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const createData = async(req, res)=>{
    try{
        const { fcm_secret,latitude,longitude,} = req.body ;
        const uidd = uuidv4() ;

        const decoded = jwtDecode(req.get("Authorization"));
        const userId = decoded.uid;

        // const token = req.cookies.refreshToken;
        // const token_decode =jwtDecode(token) ;
     
        const body = await Data.create({
            fcm_secret:fcm_secret,
            latitude:latitude,
            data_id: uidd,
            user_id: userId,
            longitude:longitude,
            
        });
        res.status(200).json({ body ,message: "Successfully!", status: "Success!",});
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

export const createSos = async(req, res)=>{

    try{
        const uid = uuidv4() ;
        const { address,sosType,geo_position,Message,sender,phone_number} = req.body ;

        const scopes = await Sos.create({
            address:address,
            sos_type:sosType,
            geo_position:geo_position,
            message:Message,
            user_id: req.body.userId,
            sender:sender,
            sos_id:uid,
            phone_number:phone_number,
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};

export const getcount = async(req, res)=>{
    try{
        const access = req.cookies.refreshToken;
        const ss = jwtDecode(access);
        console.log(ss.uid);
    const cc =  await db.query(`SELECT COUNT(*) as count FROM inboxes LEFT JOIN profile ON inboxes.recepient_id  = profile.user_id WHERE  inboxes.read = "false" AND inboxes.recepient_id = '${ss.uid}'`)
        res.status(200).json({body:cc[0], message: "Successfully!", status: "Successfully!", code: 0});
    }catch (error){
        res.status(500).json({message: error.message});
    }
}
export const getInbox = async(req, res)=>{
    try{
        if(req.query.type == 3 ){
           const cc =  await db.query(`SELECT * FROM inboxes  WHERE type = "default" || type  ="disbursement"
           `)
           res.status(200).json({body: cc[0], message: "Successfully!", code: 0, status: "Successfully!", code: 0});
        }
        else if (req.query.type == 2){
            const cc =  await db.query(`SELECT * FROM inboxes  WHERE type = "sos"`)
           res.status(200).json({body: cc[0], message: "Successfully!", code: 0, status: "Successfully!", code: 0});
        }
        else if(req.query.type == 1){
            const cc =  await db.query(`SELECT * FROM inboxes  WHERE type = "purchase" || type  ="order" || type  ="payment"
            `)
           res.status(200).json({body: cc[0], message: "Successfully!", code: 0, status: "Successfully!", code: 0});
        }
        else{
            res.status(200).json({body: "", message: "Bad Request!", status: "Bad Request!"});
        }

    }catch (error){
        res.status(500).json({message: error.message});
    }
}

export const updateinbox = async(req, res)=>{
    try{
        console.log("sdadsa");
        if(req.body.read == true){
            const datas = await Inbox.update({
                read: "true"},{
                    where: {
                        inbox_id: req.params.inbox_id
                    }
                }
                ) ;
                const data = await Inbox.findOne({
                    where:{
                        inbox_id: req.params.inbox_id
                    }
                }) ;

                // console.log(data);
                res.status(200).json({body: data, message: "Successfully!", code: 0, status: "Successfully!", code: 0});
            }
            

    }catch (error){
        res.status(500).json({message: error.message});
    }
}
export const getNearme = async(req, res)=>{
    try{
        console.log("sdsd");
        console.log(req.query.lat);
        console.log(req.query.lng);
        console.log(req.query.limit);
        console.log(req.query.offset);

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        let datehere = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        
        const access = req.cookies.refreshToken;
        const ss = jwtDecode(access);

        console.log(ss.uid);
        const resData = await db.query( `SELECT *,profile.nama,profile.profile_pic, ST_Distance( point (${req.query.lat}, ${req.query.lng}), point(latitude, longitude)) * 111195 as distance, 
        TIMESTAMPDIFF(day, data.updatedAt, '${datehere}') as lastseen_day, 
        TIMESTAMPDIFF(hour, data.updatedAt, '${datehere}') as lastseen_hour, 
        TIMESTAMPDIFF(minute, data.updatedAt, '${datehere}') as lastseen_minute 
        FROM data LEFT JOIN users ON data.user_id = users.user_id
        LEFT JOIN profile ON data.user_id = profile.user_id 
        WHERE data.user_id != '${ss.uid}' 
        HAVING distance < 5000.0000000000000 
        ORDER BY distance ASC LIMIT ${req.query.limit}`);
        
        // console.log("data");
        // const data = await Data.findOne({
        //     where: {
        //         id: req.params.id}
        // });
        res.status(200).json(resData[0]);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
}


export const createInbox = async(req, res)=>{
    try{
        const { subject,body,type,field1,field2,field3,field4,field5,field6,field7,read} = req.body ;
        const datas = await Data.findOne({
            where :{
                user_id: req.body.recepientId
            }
        });

        if(!datas) return res.status(400).json({message : "ID Cannot Be Find!", status: "Bad Request!", code: 400})
            
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
        const uid =  uuidv4();

        const inboxx = await Inbox.create({
            inbox_id: uid,
            subject:subject,
            body:body,
            type:type,
            field1:field1,
            field2:field2,
            field3:field3,
            field4:field4,
            recepient_id: req.body.recepientId,
            sender_id:req.body.senderId,
            field5:req.body.field5,
            field6:req.body.field6,
            field7:req.body.field7,
            read:"false",
            }) ;
       
            
        res.status(200).json(inboxx);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const updateData = async(req, res)=>{
    try{
        // const { fcm_secret,latitude,longitude,} = req.body ;

        // const data = await Users.findOne({
        //     where: {
        //         user_id: req.params.user_id
        //     }
        // });
        // const datta = await Data.findOne({where: {
        //     userId: data.id
        // }}) ;
        
        // const dattta = await datta.update({
        //     fcm_secret:fcm_secret,
        //     latitude:latitude,
        //     longitude:longitude,
            
        // }, {
        //     where: {
        //         userId: data.id
        //     }
        // });
        // res.status(200).json(dattta);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const media = async(req, res)=>{
    try {
            const { folder } = req.body 
            if(typeof folder == "undefined") {
              throw new Error("folder is required")
            }
            if(req.files != null) {
              await fs.promises.mkdir(`${process.cwd()}/public/${folder}`, { recursive: true })
              let file = req.files.file
              let mimeType = file.mimetype
              let name = file.name.trim().split('.')[0]
              let ext = file.name.trim().split('.').pop()
              let datetime = Date.now()
              let size = file.size
              let filename = `${name}_${datetime}.${ext}`
              file.mv(`${process.cwd()}/public/${folder}/${filename.replace(/\s/g, '')}`)
              
              res.status(200).json({status: 200, error: false, message: "Ok", data:{
                "path" : `${process.env.BASE_URL_PROD}/${folder}/${filename.replace(/\s/g, '')}`,
                "name" : name,
                "size" : size,
                "originalMimeType" : mimeType
            }})
            } else {
              throw new Error("media is required")
            }
          
      
      
    // const { folder } = req.body 
    // // console.log(req.files, req.body.folder);
    //     if(typeof folder == "undefined") {
    //       throw new Error("folder is required")
    //     }
    //     console.log(req.files.media);
    //     // if(req.files != null) {
    //       await fs.promises.mkdir(`${process.cwd()}/public/${folder}`, { recursive: true })
    //       let file = req.files.media.name
    //       let mimeType = req.files.media.mimetype
    //       let name = req.files.media.name.trim().split('.')[0]
    //       let ext = req.files.media.name.trim().split('.').pop()
    //       let datetime = Date.now()
    //       //   let size = filesize(req.files.media.size)
    //       let filename = `${name}_${datetime}.${ext}`
          
          
            // file.mv(`${process.cwd()}/public/${folder}/${filename.replace(/\s/g, '')}`)
            //   "path": `${process.env.BASE_URL_PROD}/${folder}/${filename.replace(/\s/g, '')}`,
            // console.log(req.files.file);
        //   var data = new FormData();
        //     data.append('directory', req.body.folder);
        //     data.append('file', (req.files.file));
        //     const data = qs.stringify({
        //             directory: req.body.folder,
        //             file: req.files.file,
        //         });
        //     console.log(data);

        //     var config = {
        //     method: 'post',
        //     url: 'https://api-media-general.inovasi78.com/media-service/v1/upload',
        //     headers: { 
        //         'Authorization': 'Basic aW5vdmFzaTc4Omlub3Zhc2k3OCE=', 
        //     },
        //     data : data
        //     };

        //     axios(config)
        //     .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //     console.log(error);
        // });
        // res.status(400).json("bad");
        // res.status(200).json({
        //     "name": name,
        //     "size": req.files.media.size,
        //     "mimetype": mimeType
        // const data = qs.stringify({
        //     directory: req.body.folder,
        //     file: req.files,
        // });
    
    //     var config = {
    //         method: 'post',
    //         url: 'https://api-media-general.inovasi78.com/media-service/v1/upload',
    //         headers: { 
    //             'Authorization': 'Basic aW5vdmFzaTc4Omlub3Zhc2k3OCE=', 
    //           },
    //         data : data
    //       };
    //       console.log(config);
          
    //       axios(config)
    //       .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //     //   })
    //     } else {
    //       throw new Error("media is required")
    //     }
    // console.log(req.files);

            // var newFile = fs.createReadStream(media.path);

            
            // personally I'd function out the inner body here and just call 
            // to the function and pass in the newFile
            // newFile.on('end', function() {
            // console.log("asdasdas");
            // var axios = require('axios');
            // var FormData = require('form-data');
            // var fs = require('fs');
            // const readableStream = fs.createReadStream('file', file);
            // // console.log(readableStream);
            // readableStream.on('error', function (error) {
            //     console.log(`error: ${error.message}`);
            // })
        
            // readableStream.on('data', (chunk) => {
            //     console.log(chunk);
            // })
        
            // const filee = await file
            // console.log(file);
            // console.log(req.files.media);
            // // res.status(400).json("bad");

            // var data = new FormData();
            // data.append('directory', 'fiona');
            // data.append('file', fs.createReadFile(req.files.file.name));
            // // const data = qs.stringify({
            // //     folder: req.body.folder,
            // //     file: req.files.file.name,
            // // });

            // var config = {
            // method: 'post',
            // url: 'https://api-media-general.inovasi78.com/media-service/v1/upload',
            // headers: { 
            //     'Authorization': 'Basic aW5vdmFzaTc4Omlub3Zhc2k3OCE=', 
            // },
            // data : data
            // };

            // axios(config)
            // .then(function (response) {
            // res.status(400).json(response.data);
            // console.log(JSON.stringify(response.data));
            // })
            // .catch(function (error) {
            // console.log(error);
            // });

        //         const form_data = new FormData();
        //         form_data.append("file", "fazri.ext");
        //         console.log(form_data)
        // const request_config = {
        //     method: "post",
        //     url: 'https://api-koperasi-yamaha.inovatif78.com/api/v1/media',
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     data: form_data
        // };
        // console.log(request_config, form_data)
        // return axios(request_config);
        // );

      } catch(e) {
        console.log(e.message) // in-development
        res.status(400).json({message: e.message});
      }
  
};
export const deleteData = async(req, res)=>{
    const data = await Data.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!data) return res.status(404).json({message: "Data Tidak ditemukan!"});
   try{
        await Data.destroy({
            where: {
                id: data.id
            }

        });
        res.status(200).json({message: "Data Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    } 
};