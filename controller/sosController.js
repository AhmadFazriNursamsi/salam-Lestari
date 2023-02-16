import Sos from "../model/sos.js";
import User from "../model/userModel.js";


export const getSos = async(req, res)=>{
    try{
        const daily = await Sos.findAll({
        });
        res.status(200).json(daily);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};
export const getSosById = async(req, res)=>{
    try{
        const daily = await Sos.findOne({
            where: {
                id: req.params.id}
        });
        res.status(200).json(daily);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const createSos = async(req, res)=>{

    try{
        const { address,sos_type,geo_position,message,sender,phone_number} = req.body ;
 
        // const scopess = await User.findOne({
        //     where: {
        //         user_id: req.params.user_id
        //     }
        // });
        const scopp = await Sos.findOne({where: {
            user_id: req.body.user_id
        }}) ;
        if(!scopp) return res.status(400).json({message: "User Tidak Ditemukan!"})
        
        const scopes = await scopp.update({
            address:address,
            sos_type:sos_type,
            geo_position:geo_position,
            message:message,
            sender:sender,
            phone_number:phone_number,
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};
export const updateSos = async(req, res)=>{
    try{
        const { address,sos_type,geo_position,message,sender,phone_number} = req.body ;
 
        const scopess = await User.findOne({
            where: {
                user_id: req.params.user_id
            }
        });
        const scopp = await Sos.findOne({where: {
            user_id: scopess.user_id
        }}) ;
        
        const scopes = await scopp.update({
            address:address,
            sos_type:sos_type,
            geo_position:geo_position,
            message:message,
            sender:sender,
            phone_number:phone_number,
        }, {
            where: {
                userId: scopess.id
            }
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const deleteSos = async(req, res)=>{
    const carousels = await Sos.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!carousels) return res.status(404).json({message: "User Tidak ditemukan!"});
   try{
        await Sos.destroy({
            where: {
                id: carousels.id
            }

        });
        res.status(200).json({message: "Data Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }  
    
};