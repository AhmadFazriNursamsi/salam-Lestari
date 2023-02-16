import Events from "../model/events.js";


export const getEvents = async(req, res)=>{
    try{
        const carouseis = await Events.findAll({
        });
        res.status(200).json(carouseis);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getEventsById = async(req, res)=>{
    try{
        const daily = await Events.findOne({
            where: {
                id: req.params.id}
        });
        res.status(200).json(daily);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const createEvents = async(req, res)=>{
    
};
export const updateEvents = async(req, res)=>{
    
};
export const deleteEvents = async(req, res)=>{
    const carousels = await Events.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!carousels) return res.status(404).json({message: "User Tidak ditemukan!"});
   try{
        await Events.destroy({
            where: {
                id: carousels.id
            }

        });
        res.status(200).json({message: "Data Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }  
};