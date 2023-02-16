import Users from "../model/userModel.js"
import Profile from "../model/profileModel.js"

import argon2 from "argon2"
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"
import axios from "axios"
import crypto from "crypto"
import forgot_password from "../model/forgotPassword.js"

// import { logger } from "../helper/LoggerHelper.js" logger.info(JSON.stringify())

import { v4 as uuidv4, } from 'uuid'

import db from "../config/database.js"

import { response } from "../helper/response.js"
import { decodeToken } from "../helper/DecodeToken.js"
import  Store  from "../model/storeModel.js"

export const getUser = async(req, res)=>{
    try{
        const users = await Users.findAll({
        });
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async(req, res)=>{
    const user = await Users.findOne({
        where: {
            user_id:req.body.user_id
        }
    });
    if(!user) {
        return res.status(404).json({code : 400,message: "User Tidak Ditemukan!", "error" : "Bad Request",});
    
        }    const {status, email_address, password, confPassword,geo_position, phone_number, role, user_name, user_type,email_activated,phone_activated,otp,date_activated,otp_expired,payment_activated, address, fullname, gender, regional, statusprofile,no_member,short_bio,profile_pic,sos_type,message,sender, city_regional, device, menu,} = req.body;
    let hashpassword;

    if(password === "" || password === null){
        hashpassword = user.password
    }else{
        hashpassword = await argon2.hash(password);
        // const password = any;
    }if(password != confPassword) {
        return res.status(400).json({code : 400,message: "Pastikan Password Sama!", "error" : "Bad Request"})
    
    }try{
        await Users.update({
            status: status, 
            email: email_address, 
            password: hashpassword,
            confPassword: confPassword,
            phone_number: phone_number,
            role: role,
            user_name: user_name,
            user_type: user_type,
            // email_activated: 0,
            phone_activated: phone_activated,
            otp: otp,
            date_activated: date_activated,
            otp_expired: otp_expired,
            payment_activated: payment_activated
        }, {
            where: {
                id: user.id
            }
        });
        await Profile.update({
            address: req.body.address,
            fullname: req.body.fullname,
            gender: req.body.gender,
            regional: req.body.regional,
            status: req.body.statusprofile,
            no_member: no_member,
            short_bio: short_bio,
            profile_pic: profile_pic,
            city_regional: city_regional,
            userId: user.id,
        },{where :{
            userId: user.id
        }});
        
        await Daily.update({
            userId: user.id,
            device:device, 
            menu:menu
        },{where :{
            userId: user.id
        }});
        await SOS.update({
            userId: user.id,
            geo_position:geo_position,
            sos_type:sos_type,
            message:message,
            sender:sender,
            address: req.body.address_sos,
            phone_number:req.body.phone_number_sos,
        },{where :{
            userId: user.id
        }})
        res.status(0).json({code : 0,message: "User Berhasil Diupdate!"})
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
}
 export const deleteUser = async(req, res)=>{
    const user = await Users.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!user) {
        return res.status(404).json({code : 400,message: "User tidak ditemukan!"})
    }
   try{
        await Users.destroy({
            where: {
                id: user.id
            }

        });
        res.status(200).json({message: "User Berhasil Dihapus!", code: 0})
    }catch (error){
        res.status(400).json({message: error.message, code: 400})
    }
};

export const OtpUser = async(req, res) => {
    const { email_address, otp } = req.body 

    let date = new Date()
    let day = ("0" + date.getDate()).slice(-2)
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let currentDate = new Date(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds)

    try{
        const user = await Users.findOne({
            where: {
                email_address: email_address,
                otp: otp,
            }
        }) 

        let otpCreated = new Date(user.otp_expired)
        let currentDate = new Date(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds)
        let diff = new Date(currentDate.getTime() - otpCreated.getTime())

        if(!user) 
            throw new Error("E-mail or OTP is not valid")
            console.log(diff);
           
        if(diff.getMinutes() > 1) 
            throw new Error("OTP is expired")
            
        let payload = {
            "uid": user.uid,
            "authorized": true,
            "scope": [
                "user.view",
                "user.read",
                "user.create",
                "user.update",
                "user.delete",
                "media.view",
                "media.read",
                "media.create",
                "media.delete",
                "transaction.view",
                "transaction.read",
                "transaction.create",
                "transaction.update",
                "transaction.delete",
                "media.update",
                "user.list",
                "user.all",
                "media.list",
                "transaction.list",
                "sos.list",
                "sos.view",
                "sos.read",
                "sos.create",
                "sos.update",
                "sos.delete",
                "common.user",
                "data.list",
                "data.view",
                "data.read",
                "data.create",
                "data.delete",
                "data.update",
                "club.list",
                "club.view",
                "club.read",
                "club.update",
                "club.delete",
                "token.update",
                "post.list",
                "post.view",
                "post.create",
                "post.read",
                "post.update",
                "post.delete",
                "comment.list",
                "comment.view",
                "comment.create",
                "comment.read",
                "comment.update",
                "comment.delete",
                "club.create",
                "admin.user",
                "deposit.list",
                "deposit.view",
                "deposit.read",
                "deposit.create",
                "deposit.update",
                "deposit.delete",
                "category.view",
                "category.add",
                "wallet.create",
                "category.list",
                "category.create",
                "category.update",
                "product.list",
                "product.read",
                "product.create",
                "product.update",
                "product.delete",
                "product.view",
                "wallet.list",
                "wallet.view",
                "wallet.read"
            ],
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET)

        let date_activated = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

        user.update({
            email_activated : 1, 
            status : "enabled", 
            date_activated: date_activated
        }) 

        const profile = await Profile.findOne({where: {user_id : user.user_id}})

        const userId = user.user_id
        const user_name = user.user_name
        const userType = user.user_type
        const email_activated = user.email_activated
        const fullname = profile.name
        const phone_number = user.phone_number
        const phone_activated = user.phone_activated
        const role = user.role
        const status = user.status

        response(res, 200, false, "", {
            token: token,
            refreshToken: refreshToken,
            user: {
                email_address: email_address,
                email_activated: email_activated == "1" ? true : false,
                fullname: fullname,
                phone_number: phone_number,
                phone_activated: phone_activated == "1" ? true : false,
                role: role,
                status: status,
                user_id: userId,
                user_name: user_name,
                user_type: userType,
            }
        })
    }   catch (e) {
        response(res, 400, true, e.message)
    }
}
export const forgot = async(req, res)=>{
    try{
        const find_user = await Users.findOne({where: {email_address: req.body.email_address}}) ;


        if(!find_user)
    {
        return res.status(400).json({message: "Email tidak terdaftar!", code: 400, status: "bad request!" })

    }

    const code1 =  crypto.randomBytes(20).toString("hex");
    const code = "SALAM LESTARI" + code1;
    const forgot_pasword = await forgot_password.create({
        code: code,
        email:find_user.email_address,
        user_id:find_user.user_id,
        base_url:req.body.base_url
    }) ;
    // const uid =  uuidv4()

    // const token = jwt.sign(code, process.env.JWT_SECRET)


    await axios.post(process.env.NOTIFICATION_SERVICE, {
        destination: req.body.email_address,
        senderName: "Salam Lestari",
        subject: "Password Reset",
        content: `<div style="
                font-family: Helvetica, Arial, sans-serif;
                min-width: 1000px;
                overflow: auto;
                line-height: 2;
            ">
            <div style="
                margin:50px auto; 
                width:70%;
                padding: 20px 0;
            ">
            <div style="border-bottom:1px solid #eee;">
                <a href="#" style="
                    font-size:1.4em;
                    color: #00466a;
                    text-decoration:none;
                    font-weight:600
                ">Salam Lestari
                </a>
            </div>
            Thank you for choosing Salam Lestari. your current password is
            <a href="${req.body.base_url} "/chek/"${code}" style="
                background: #00466a;
                margin: 0 auto; 
                width: max-content; 
                padding: 0 10px; 
                color: #fff; 
                border-radius: 4px;
                ">${req.body.base_url}/chek/${code}
            </a>
            <hr style="
                border:none;
                border-top:1px solid #eee;" />
            </div>
        </div>`,
        "source": "salamlestari"   
    });
   
    res.status(400).json({message: "Successfully!", code: 0, status: "Successfully!", body: {forgot_pasword} }) 
    
    }catch(error){
        console.log(error);
        res.status(400).json({message: error, code: 400, status: "Successfully!"}) 
    }
}

export const Check = async(req, res)=>{
    try{

            const userrepas = await forgot_password.findOne({
                where:{
                    code: req.params.code
                    
                }
            });
            if(!userrepas) return res.status(400).json({message:"BAD REQUEST!", code: 400, status : "BAD REQUEST"})
            res.status(200).json({userrepas,message: "Successfully!",code : 0, status : "Successfully!"})
    
    
    }catch (error) {
        console.log(error)
        res.status(404).json({message:error})
    
    }
}

export const CheckChangePassword = async(req, res)=>{
    try{
            const userrepas = await forgot_password.findOne({
                where:{
                    code: req.body.code
                    
                }
            });
            if(!userrepas) return res.status(400).json({message:"CODE NOT VALID!", code: 400, status : "BAD REQUEST"});

            const users = await Users.findOne({
                where: {
                    user_id:userrepas.user_id 
                }
            });
            if(req.body.password != req.body.confirmPassword) return res.status(400).json({message:"PASTIKAN PASSWORD YANG ANDA MASUKAN SAMA!", code: 400, status : "BAD REQUEST"});

            const salt = await bycrpt.genSalt();
            const hashPassword = await bycrpt.hash(req.body.password, salt)

            await users.update({
                password: hashPassword
            })
            res.status(200).json({userrepas,message: "Successfully!",code : 0, status : "Successfully!"})
    
    
    }catch (error) {
        console.log(error)
        res.status(404).json({message:error})
    
    }
}


export const ForgotPassword = async(req, res)=>{
    try{
        const userrepas = await Users.findOne({
        where:{
            email_address: req.body.email_address
            
        }
    });
    
    if(!userrepas)
    {
        return res.status(400).json({message: "Email tidak terdaftar!", code: 400, status: "bad request!" })

    }

    const { email_address, password_new, confirmasi_password, password_old} = req.body
    if(password_new !== confirmasi_password) {return res.status(400).json({message: "Pastikan Password Yang Anda Masukan sama!", code: 400, status: "bad request!" })
}
    const salt = await bycrpt.genSalt();
    const hashPassword = await bycrpt.hash(password_new, salt)

            await userrepas.update({
                password: hashPassword,
            });
        res.status(200).json({message: "Password Berhasil Diupdate!",code : 0, status : "Successfully!"})
    }catch (error) {
        console.log(error)
        res.status(404).json({message:error})
    
    }
}

export const ResetPassword = async(req, res)=>{
    const { email_address } = req.body

    try {

        var randomstring = Math.random().toString(36).slice(-8)

        const salt = await bycrpt.genSalt(10)
        const passwordHash = await bycrpt.hash(randomstring, salt)
        
        const user = await Users.findOne({
            email_address: email_address
        })
        if(!user) {
            throw new Error("User not found")
        }

        user.update({
            "password": passwordHash
        })

        await axios.post(process.env.NOTIFICATION_SERVICE, {
            destination: email_address,
            senderName: "Salam Lestari",
            subject: "Password Reset",
            content: `<div style="
                    font-family: Helvetica, Arial, sans-serif;
                    min-width: 1000px;
                    overflow: auto;
                    line-height: 2;
                ">
                <div style="
                    margin:50px auto; 
                    width:70%;
                    padding: 20px 0;
                ">
                <div style="border-bottom:1px solid #eee;">
                    <a href="#" style="
                        font-size:1.4em;
                        color: #00466a;
                        text-decoration:none;
                        font-weight:600
                    ">Salam Lestari
                    </a>
                </div>
                Thank you for choosing Salam Lestari. your current password is
                <h2 style="
                    background: #00466a;
                    margin: 0 auto; 
                    width: max-content; 
                    padding: 0 10px; 
                    color: #fff; 
                    border-radius: 4px;
                    ">${randomstring}
                </h2>
                <hr style="
                    border:none;
                    border-top:1px solid #eee;" />
                </div>
            </div>`,
            "source": "salamlestari"   
        }) 

        response(res, 200, false, "")
    }  catch (e) {
        response(res, 400, true, e.message)
    }
}

export const ResetEmail = async(req, res)=>{
    try{
        const userrepas = await Users.findOne({
        where:{
            email_address: req.body.email_address
            
        }
    });

    const { email_addres_new } = req.body;
    
           if(!userrepas)
           {
            return res.status(400).json({message: "Email Tidak Terdaftar!", code : 400, status : "bad request!"});
           }
        await userrepas.update({
                email_address: email_addres_new,
            });
        res.status(200).json({message: "Email Berhasil Diupdate!",code : 0, status : "Successfully!"});

    }catch (error) {
        console.log(error);
        res.status(404).json({ "code": 400,
        "error": "Email already exists",
        "message": "Internal Server Error"});
    
    }
}
export const ResentOtpUser = async (req, res) => {
    const { email_address } = req.body

    // let date = new Date()
    
    
    try {
        
        let date = new Date()
        let day = ("0" + date.getDate()).slice(-2)
        let mili = date.getMilliseconds()
        let otp = Math.floor(100009 + Math.random() * 9000 + mili)
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()
        let hours = date.getHours()
        let minutes = date.getMinutes() + 2
        let seconds = date.getSeconds()

        let otpExpired = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

        const user = await Users.findOne({
            where: {
                email_address: email_address
            }
        })

        if(!user) {
            throw new Error("User not found")
        }

        let payload = {
            "uid": user.user_id,
            "authorized": true,
            "scope": [
                "user.view",
                "user.read",
                "user.create",
                "user.update",
                "user.delete",
                "media.view",
                "media.read",
                "media.create",
                "media.delete",
                "transaction.view",
                "transaction.read",
                "transaction.create",
                "transaction.update",
                "transaction.delete",
                "media.update",
                "user.list",
                "user.all",
                "media.list",
                "transaction.list",
                "sos.list",
                "sos.view",
                "sos.read",
                "sos.create",
                "sos.update",
                "sos.delete",
                "common.user",
                "data.list",
                "data.view",
                "data.read",
                "data.create",
                "data.delete",
                "data.update",
                "club.list",
                "club.view",
                "club.read",
                "club.update",
                "club.delete",
                "token.update",
                "post.list",
                "post.view",
                "post.create",
                "post.read",
                "post.update",
                "post.delete",
                "comment.list",
                "comment.view",
                "comment.create",
                "comment.read",
                "comment.update",
                "comment.delete",
                "club.create",
                "admin.user",
                "deposit.list",
                "deposit.view",
                "deposit.read",
                "deposit.create",
                "deposit.update",
                "deposit.delete",
                "category.view",
                "category.add",
                "wallet.create",
                "category.list",
                "category.create",
                "category.update",
                "product.list",
                "product.read",
                "product.create",
                "product.update",
                "product.delete",
                "product.view",
                "wallet.list",
                "wallet.view",
                "wallet.read"
            ],
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET)
        await axios.post(process.env.NOTIFICATION_SERVICE, {
            destination: email_address,
            senderName: "Salam Lestari",
            subject: "Verification OTP Code Salam Lestari",
            content: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto; width:70%; padding: 20px 0;">
                <div style="border-bottom:1px solid #eee">
                    <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Salam Lestari</a>
                </div>
                <p style="font-size:1.1em;">Hi,</p>
                <p>Thank you for choosing Salam Lestari. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes</p>
                <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">`+ otp +`</h2>
                <p style="font-size:0.9em;">Regards, <br/>Salam Lestari</p>
                <hr style="border:none;border-top:1px solid #eee" />
                </div>
            </div>`,
            "source": "salamlestari"   
        }) 

        user.update({
            otp: otp,
            otp_expired: otpExpired, 
        })

        const profile = await Profile.findOne({
            where: {
                user_id: user.user_id
            }
        }) 

        if(!profile) {
            throw new Error("Profile not found")
        }

        const uid = user.user_id
        const status = user.status
        const phone_number = user.phone_number
        const role = user.role
        const email_activated = user.email_activated
        const phone_activated = user.phone_activated
        const fullname = profile.name
        const user_name = user.user_name
        const user_type = user.user_type

        response(res, 200, false, "", {
            token: token,
            refreshToken: refreshToken,
            user: {
                email_address: email_address,
                email_activated: email_activated == "1" ? true : false,
                fullname: fullname,
                phone_number: phone_number,
                phone_activated: phone_activated == "1" ? true : false,
                role: role,
                status: status,
                user_id: uid,
                user_name: user_name,
                user_type: user_type,
            }
        })            
    }   catch (e) {
        response(res, 400, true, e.message)
    }
}

export const registerUser = async (req, res) => {
   
    const uid =  uuidv4()

    let date = new Date()
    let day = ("0" + date.getDate()).slice(-2)
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes() + 2
    let seconds = date.getSeconds()
    let otpExpired = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

    let otpCreateUser = Math.floor(100009 + Math.random() * 9000 + date.getMilliseconds())

    const { email_address, password, phone_number, name, gender, favorite, date_birth, user_name, role, profile_pic } = req.body 

    const salt = await bycrpt.genSalt(10)
    const passwordHash = await bycrpt.hash(password, salt)

    let payload = {
        "uid": uid,
        "authorized": true,
        "scope": [
            "user.view",
            "user.read",
            "user.create",
            "user.update",
            "user.delete",
            "media.view",
            "media.read",
            "media.create",
            "media.delete",
            "transaction.view",
            "transaction.read",
            "transaction.create",
            "transaction.update",
            "transaction.delete",
            "media.update",
            "user.list",
            "user.all",
            "media.list",
            "transaction.list",
            "sos.list",
            "sos.view",
            "sos.read",
            "sos.create",
            "sos.update",
            "sos.delete",
            "common.user",
            "data.list",
            "data.view",
            "data.read",
            "data.create",
            "data.delete",
            "data.update",
            "club.list",
            "club.view",
            "club.read",
            "club.update",
            "club.delete",
            "token.update",
            "post.list",
            "post.view",
            "post.create",
            "post.read",
            "post.update",
            "post.delete",
            "comment.list",
            "comment.view",
            "comment.create",
            "comment.read",
            "comment.update",
            "comment.delete",
            "club.create",
            "admin.user",
            "deposit.list",
            "deposit.view",
            "deposit.read",
            "deposit.create",
            "deposit.update",
            "deposit.delete",
            "category.view",
            "category.add",
            "wallet.create",
            "category.list",
            "category.create",
            "category.update",
            "product.list",
            "product.read",
            "product.create",
            "product.update",
            "product.delete",
            "product.view",
            "wallet.list",
            "wallet.view",
            "wallet.read"
        ],
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET)

    try {

        const [results, _] = await db.query(`SELECT email_address FROM users WHERE email_address = '${email_address}'`)

        if(results.length == 0) {
            await db.query(`INSERT INTO users (user_id, status, email_address, password, phone_number, role, user_name, user_type, email_activated, phone_activated, otp, otp_expired) 
                VALUES ('${uid}', 'disabled', '${email_address}', '${passwordHash}', '${phone_number}', 'user', '${user_name}', 'user', 0, 0, '${otpCreateUser}', '${otpExpired}')
            `)

            await db.query(`INSERT INTO profiles (user_id, name, gender, favorite, date_birth,profile_pic) 
                VALUES ('${uid}', '${name}', '${gender}', '${favorite}', '${date_birth}', '/fiona/${profile_pic}')`)

            await axios.post(process.env.NOTIFICATION_SERVICE, {
                destination: email_address,
                senderName: "Salam Lestari",
                subject: "Verification OTP Code Salam Lestari",
                content: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto; width:70%; padding: 20px 0;">
                    <div style="border-bottom:1px solid #eee">
                        <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Salam Lestari</a>
                    </div>
                    <p style="font-size:1.1em;">Hi,</p>
                    <p>Thank you for choosing Salam Lestari. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes</p>
                    <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">`+ otpCreateUser +`</h2>
                    <p style="font-size:0.9em;">Regards, <br/>Salam Lestari</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    </div>
                </div>`,
                "source": "fiona"   
            }) 
        } else {
            throw new Error("User already exists")
        }

        response(res, 200, false, "", { 
            token: token,
            refreshToken: refreshToken,
            user: {
                email_address: email_address,
                email_activated: false,
                fullname: name,
                phone_number: phone_number,
                phone_activated: false,
                role: role,
                status: "disabled",
                user_id: uid,
                user_name: user_name,
                user_type: "user",
            }
        })
    } catch (e){
        response(res, 400, true, e.message)
    }
}

export const LoginUser = async(req, res) => {
    const { username, password } = req.body

    try {

        const [results, _] = await db.query(`SELECT * FROM users WHERE phone_number = '${username}' OR email_address = '${username}'`)

        if(!results) 
            throw new Error("E-mail Address or Phone is not valid")

        let user = results[0]
      
        const profile = await Profile.findOne({
            where: {
                user_id: user.user_id
            }
        })

        if(!profile) {
            throw new Error("Profile not found")
        }

        let payload = {
            "uid": user.user_id,
            "authorized": true,
            "scope": [
                "user.view",
                "user.read",
                "user.create",
                "user.update",
                "user.delete",
                "media.view",
                "media.read",
                "media.create",
                "media.delete",
                "transaction.view",
                "transaction.read",
                "transaction.create",
                "transaction.update",
                "transaction.delete",
                "media.update",
                "user.list",
                "user.all",
                "media.list",
                "transaction.list",
                "sos.list",
                "sos.view",
                "sos.read",
                "sos.create",
                "sos.update",
                "sos.delete",
                "common.user",
                "data.list",
                "data.view",
                "data.read",
                "data.create",
                "data.delete",
                "data.update",
                "club.list",
                "club.view",
                "club.read",
                "club.update",
                "club.delete",
                "token.update",
                "post.list",
                "post.view",
                "post.create",
                "post.read",
                "post.update",
                "post.delete",
                "comment.list",
                "comment.view",
                "comment.create",
                "comment.read",
                "comment.update",
                "comment.delete",
                "club.create",
                "admin.user",
                "deposit.list",
                "deposit.view",
                "deposit.read",
                "deposit.create",
                "deposit.update",
                "deposit.delete",
                "category.view",
                "category.add",
                "wallet.create",
                "category.list",
                "category.create",
                "category.update",
                "product.list",
                "product.read",
                "product.create",
                "product.update",
                "product.delete",
                "product.view",
                "wallet.list",
                "wallet.view",
                "wallet.read"
            ],
        }

        const storess = await Store.findOne({
            where: {
                owner: user.user_id
            }
        })


        const status = user.status
        const phone_number = user.phone_number
        const role = user.role
        const user_type = user.user_type
        const email_activated = user.email_activated
        const phone_activated = user.phone_activated
        const fullname = profile.name
        const profile_pic = profile.profile_pic
        const user_name = user.user_name
        const email_address = user.email_address

        const storeid = storess.store_id ;

        let date = new Date()
        let day = ("0" + date.getDate()).slice(-2)
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()
        let hours = date.getHours()
        let minutes = date.getMinutes() + 2
        let seconds = date.getSeconds()
        let otpExpired = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
        let otpCreateUser = Math.floor(100009 + Math.random() * 9000 + date.getMilliseconds())
        
        if(email_activated == 0)
            db.query(`UPDATE users SET otp = '${otpCreateUser}', otp_expired = '${otpExpired}' WHERE user_id = '${uid}'`)

            if(email_activated == 0) return response(res, 500, true, "Masukan Kode OTP Terlebih dahulu")

        if(email_activated == 0){
            await axios.post(process.env.NOTIFICATION_SERVICE, {
                destination: email_address,
                senderName: "Salam Lestari",
                subject: "Verification OTP Code Salam Lestari",
                content: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto; width:70%; padding: 20px 0;">
                    <div style="border-bottom:1px solid #eee">
                        <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Salam Lestari</a>
                    </div>
                    <p style="font-size:1.1em;">Hi,</p>
                    <p>Thank you for choosing Salam Lestari. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes</p>
                    <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">`+ otpCreateUser +`</h2>
                    <p style="font-size:0.9em;">Regards, <br/>Salam Lestari</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    </div>
                </div>`,
                "source": "salamlestari"   
            }) 
        }
            
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET)
                    
        const passwordCheck = await bycrpt.compare(password, user.password)
        if(!passwordCheck) 
            throw new Error("Password is invalid")

        response(res, 200, false, "", {
            token: token,
            refreshToken: refreshToken,
            user: {
                email_address: email_address,
                email_activated: email_activated == "1" ? true : false,
                fullname: fullname,
                phone_number: phone_number,
                phone_activated: phone_activated == "1" ? true : false,
                role: role,
                status: status,
                user_id: uid,
                user_name: user_name,
                user_type: user_type,
                profile_pic:profile_pic,
                storeid
            }
        })
    } catch (e) {
        console.log(e)
        response(res, 400, true, e.message)
    }  
}

