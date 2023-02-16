import user from "../model/userModel.js";
import argon2 from "argon2";

export const getUser = async(_, res) => {
    try{
        const response = await user.findAll({
            attributes: ['user_type', 'email_address', 'role', 'user_name', 'phone_number'],
        });
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

export const Register = async(req, res) => {

    const {status, email_address, password, confPassword,phone_number, role, user_name, user_type,email_activated,phone_activated,otp,date_activated,otp_expired,payment_activated}=req.body;
    if(password !== confPassword) return res.status(400).json({message: "Pastikan Password yang anda masukan sama!"})
    const hashpassword = await argon2.hash(password);
    try{
        await user.create({
            status: status, 
            email_address: email_address, 
            password: hashpassword,
            confPassword: confPassword,
            phone_number: phone_number,
            role: role,
            user_name: user_name,
            user_type: user_type,
            email_activated: email_activated,
            phone_activated: phone_activated,
            otp: otp,
            date_activated: date_activated,
            otp_expired: otp_expired,
            payment_activated: payment_activated
        });
        res.status(201).json({message: "Registrasi Berhasil!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }
}
// export const Login = async(req, res) => {
//     try{
//     const user = await user.findOne({
//         where: {
//             email_address: req.body.email_address
//         }
//     });
//     if(!user) return res.status(404).json({message: "User Tidak Ditemukan"});
//     const match = await argon2.verify(user.password, req.body.password);
//     if(!match) return res.status(400).json({message: "Something Wrong Password"});
//     req.session.id = user.id;
//     const id = user.id;
//     const email_address= email_address; 
//     const user_name = user_name ;
//     const role = role;
//     const accessToken = jwt.sign({user_name,role, email_address}, process.env.JWT_SECRET,{
//         expiresIn: '20s'
//     });
//     const refreshToken = jwt.sign({ user_name, email_address}, process.env.JWT_SECRET,{
//         expiresIn: '1d'
//     });
//     await user.update({refresh_token: refreshToken},{
//         where:{
//             id: userId
//         }
//     });
//     res.cookie('refreshToken', refreshToken,{
//                 httpOnly: true,
//                 maxAge: 24 * 60 * 60 * 1000
//             });
//             res.json({ accessToken });
//     } catch (error) {
//         res.status(404).json({message:"Email tidak ditemukan"});
//     }
        
// };
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await user.findAll({
        where:{
            refresh_token: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await user.update({refresh_token: null},{
        where:{
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
};