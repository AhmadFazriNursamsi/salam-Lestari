// import Carousels from  "../model/carouseis.js"
import jwtDecode from "jwt-decode";
import db from "../config/db.js"

export const getData = async(req, res)=>{
    try{
        const resData = await db.query(`SELECT * FROM  tb_ro_provinces INNER JOIN tb_ro_cities ON tb_ro_provinces.province_id  = tb_ro_cities.province_id WHERE tb_ro_provinces.province_id  = ${req.query.province_id} `)
        res.status(400).json({body: resData[0], message : "Successfully!", status: "Successfuly!", code: 0})

    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getDataprovince = async(req, res)=>{
    try{
        const resData = await db.query(`SELECT * FROM  tb_ro_provinces trp`)
        res.status(400).json({body: resData, message : "Successfully!", status: "Successfuly!", code: 0})

    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getDatadistrict = async(req, res)=>{
    try{
        const resData = await db.query(`SELECT * FROM  tb_ro_cities INNER JOIN tb_ro_subdistricts ON tb_ro_cities.city_id  = tb_ro_subdistricts.city_id  WHERE tb_ro_cities.city_id  =${req.query.cities_id} `)
        res.status(400).json({body: resData[0], message : "Successfully!", status: "Successfuly!", code: 0})

    }catch (error){
        res.status(500).json({message: error.message});
    }
};
export const getDataBy = async(req, res)=>{
    try{
        // console.log(req.query.province);
        // console.log(req.query.cities);
        // console.log(req.query.districk);

        const resData = await db.query(`SELECT *, tb_ro_cities.postal_code ,tb_ro_cities.city_name , tb_ro_subdistricts.subdistrict_name  FROM  tb_ro_provinces INNER JOIN tb_ro_cities ON tb_ro_provinces.province_id  = tb_ro_cities.province_id INNER  JOIN  tb_ro_subdistricts ON tb_ro_cities.city_id  = tb_ro_subdistricts.city_id  WHERE tb_ro_provinces.province_id = ${req.query.province}  AND tb_ro_cities.city_id= ${req.query.cities} AND tb_ro_subdistricts.subdistrict_id = ${req.query.districk}
        `)
        res.status(400).json({body: resData[0], message : "Successfully!", status: "Successfuly!", code: 0})

    }catch (error){
        res.status(500).json({message: error.message});
    }
};

export const getDataById = async(req, res)=>{
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
export const createData = async(req, res)=>{
    try{

        const token = req.cookies.refreshToken;
        const token_decode =jwtDecode(token);
        
        const data = await Carousels.create({
        name: req.body.name,
        placement: req.body.placement,
        picture: req.body.picture,
        created_by:token_decode.uid,
        status: "true"
        }) ;

        res.status(400).json({body: data, message : "Successfully!", status: "Bad Request!", code: 400})

    }catch(error){

    }
};
export const updateData = async(req, res)=>{
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
export const deleteData = async(req, res)=>{
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

        // res.status(200).json({message: "User Berhasil Dihapus!"});
    }catch (error){
        res.status(400).json({message: error.message});
    }  
};