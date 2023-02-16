import Articies from "../model/articies.js";
import multer from "multer";

export const getArticies = async(req, res)=>{
    try{
        const articies = await Articies.findAll({
        });
        res.status(200).json(articies);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getArticiesById = async(req, res)=>{
    try{
        const articies = await Articies.findOne({
            where: {
                id: req.params.id}
        });
        res.status(200).json(articies);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const createArticies = async(req, res)=>{
    
}
export const updateArticies = (req, res)=>{

    
};
export const deleteArticies = async(req, res)=>{
  const user = await Articies.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!user) return res.status(404).json({message: "User Tidak ditemukan!"});
   try{
        await Articies.destroy({
            where: {
                id: user.id
            }

        });
        res.status(200).json({message: "User Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }  
};