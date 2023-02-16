import Profile from "../model/profileModel.js"
import db from "../config/database.js"
import { response } from "../helper/response.js"
import axios from 'axios';
import FormData from "form-data";
import fs from "fs";

export const getProfile = async(_, res)=>{
    try{
        const profiles = await Profile.findAll()
        response(res, 200, false, "", profiles)
    }   catch (e) {
        console.log(e.message) // in-development
        response(res, 400, true, "")
    }
}


export const UpdateProfile = async(req, res) => {

    // let userId = req.params.user_id

    try{

        const profile = await Profile.findOne({
            where:{
                user_id:req.params.id
            }
        });
        if(!profile) return response(res, 500, status = "bad request!");

        
        // var data = new FormData();

        // data.append('directory', 'fiona');
        // data.append('file', fs.createReadStream(`${req.file.profile_pic}`));



        // var data = JSON.stringify({
        //     "directory": "fiona",
        //     "file": req.body.profile_pic
        //     });

        //     var config = {
        //     method: 'post',
        //     url: 'https://api-media-general.inovasi78.com/media-service/v1/upload',
        //     headers: { 
        //         'Content-Type': 'application/json'
        //     },
        //     data : data
        //     };

        // var config = {
        // method: 'post',
        //     url: 'https://api-media-general.inovasi78.com/media-service/v1/upload',
        //     headers: { 
        //         'Authorization': 'Basic aW5vdmFzaTc4Omlub3Zhc2k3OCE=', 
        //         ...data.getHeaders()
        //     },
        //     data : data
        // };
        // console.log(data,config);

        // axios(config)
        // .then(function (response) {
        //     // console.log(JSON.stringify(response.data));
        // })
        // .catch(function (error) {
        //     //  console.log(error);
        // });

        await profile.update({
            name: req.body.name,
            gender: req.body.gender,
            favorite: req.body.favorite,
            profile_pic: 'https://feedapi.connexist.id/d/f/fiona/'+ req.body.profile_pic,
           
        });
        response(res, 200, false, "", profile)
    }   catch (e) {
        console.log(e.message) // in-development
        response(res, 400, true, "")
    }
}

export const getProfileById = async(req, res) => {
    let userId = req.params.user_id

    try{
        const [results, _] = await db.query(`SELECT p.user_id, p.name, u.email_address, 
        u.role,
        u.phone_number, p.gender, p.favorite 
        FROM profiles p 
        INNER JOIN users u ON p.user_id = u.user_id
        WHERE p.user_id = '${userId}'`);
        console.log(results, userId);

        response(res, 200, false, "", results[0])
    }   catch (e) {
        console.log(e.message) // in-development
        response(res, 400, true, "")
    }
}