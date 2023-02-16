import Carousels from  "../model/carouseis.js"
import jwtDecode from "jwt-decode";

export const getCarouseis = async(req, res)=>{
    try{
        const carouseis = await Carousels.findAll({
        });
        res.status(400).json({body: carouseis, message : "Successfully!", status: "Successfuly!", code: 0})

    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getCarouseisById = async(req, res)=>{
    try{
        const articies = await Carousels.findOne({
            where: {
                id: req.params.id}
        });
        if(!articies) return res.status(400).json({message : "Bad Request!", status: "Bad Request!", code: 500})

        res.status(400).json({body: articies, message : "Successfully!", status: "Successfully!", code: 0})
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const createCarouseis = async(req, res)=>{
    try{

        // const token = req.cookies.refreshToken;
        // const token_decode =jwtDecode(token);
        const decoded = jwtDecode(req.get("Authorization"));
        const userId = decoded.uid;
        // console.log(userId);
        
        const data = await Carousels.create({
        name: req.body.name,
        placement: req.body.placement,
        picture: req.body.picture,
        created_by:userId,
        status: "true"
        }) ;

        res.status(400).json({body: data, message : "Successfully!", status: "Bad Request!", code: 400})

    }catch(error){
        console.log(error);
        res.status(400).json({message : error, status: "Bad Request!", code: 0})
    }
};
export const updateCarouseis = async(req, res)=>{
    try{
        const datas = await Carousels.findOne({
            where: {
                id: req.params.id}
        });
        if(!datas) {return res.status(400).json({message : "Bad Request!", status: "Bad Request!", code: 500})
    }
        const body = await datas.update({
        name: req.body.name,
        placement: req.body.placement,
        picture: req.body.picture
        }) ;
        res.status(400).json({body: body, message : "Successfully!", status: "Successfully!", code: 0})
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const deleteCarouseis = async(req, res)=>{
    const carousels = await Carousels.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!carousels) return res.status(404).json({message: "User Tidak ditemukan!"});
   try{
        await Carousels.destroy({
            where: {
                id: carousels.id
            }

        });
        res.status(400).json({ message : "User Berhasil Dihapus!", status: "User Berhasil Dihapus!", code: 0})

    }catch (error){
        res.status(400).json({message: error.message});
    }  
};