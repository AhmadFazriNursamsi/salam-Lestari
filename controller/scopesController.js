import Scopes from "../model/scopes.js";


export const getScopes = async(req, res)=>{
    try{
        const scopes = await Scopes.findAll({
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getScopesById = async(req, res)=>{
    try{
        const scopes = await Scopes.findOne({
            where: {
                id: req.params.id}
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};
export const createScopes = async(req, res)=>{
    try{
        const { parent,	scope,status,description} = req.body ;
        const scopes = await Scopes.create({
            parent:parent,
            scope:scope,
            status:status,
            description:description,
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};
export const updateScopes = async(req, res)=>{
    try{
        const { parent,	scope,status,description} = req.body ;

        const scopess = await Scopes.findOne({
            where: {
                id: req.params.id
            }
        }) ;
        
        const scopes = await scopess.update({
            parent:parent,
            scope:scope,
            status:status,
            description:description,
        });
        res.status(200).json(scopes);
    }catch (error){
        res.status(500).json({message: error.message});
    }
    
};
export const deleteScopes = async(req, res)=>{
    const scopes = await Scopes.findOne({
        where: {
            id:req.params.id
        }
    });
    if(!scopes) return res.status(404).json({message: "Data Tidak ditemukan!"});
   try{
        await Scopes.destroy({
            where: {
                id: scopes.id
            }

        });
        res.status(200).json({message: "Data Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }  
};