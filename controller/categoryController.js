import Category from "../model/categoryModel.js";
import { v4 as uuidv4, } from 'uuid';

export const createCategory = async (req, res) => {
    try {
        const uid = uuidv4();

        const { name, picture, type } = req.body;

        const data = await Category.create({
            category_id: uid,
            name: name,
            picture: picture,
            type:type,
            status: 1
        });

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};

export const getAllCategory = async (req, res) => {
    try {
        const data = await Category.findAll();

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};

export const getCategoryInfo = async(req, res)=>{
    try{
        const data = await Category.findOne({
            where: {
                category_id: req.params.id
            }
        });

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    }catch (error){
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};

export const deleteCategory = async(req, res)=>{
    try{
        const data = await Category.findOne({
            where: {
                category_id: req.params.category_id
            }
        });
        
        if (!data) return res.status(500).json({
            message: "Invalid category id",
            status: "Bad Request",
            code: 400
        });

        await data.destroy({
            
        });

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    }catch (error){
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { category_id, name, picture } = req.body;

        const category = await Category.findOne({
            where: {
                category_id: category_id
            }
        });

        if (!category) return res.status(500).json({
            message: "Invalid category id",
            status: "Bad Request",
            code: 400
        });

        const data = await category.update({
            name: name,
            picture: picture
        });

        res.status(200).json({
            message: "Successfuly",
            code: 0,
            body: data
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Internal Server Error",
            code: 500
        });
    }
};
// export const deleteCategory = async (req, res) => {
//     try{
//         const category = await Category.findOne({
//             where: {
//                 category_id: req.params.id
//             }
//         });
        
//         if(!category) return res.status(500).json({
//             message: error.message,
//             status: "ID Cannot Be Find!",
//             code: 500
//         });

//         res.status(500).json({
//             message: error.message,
//             status: "DELETE!",
//             code: 500
//         });
//     }catch(error){
//         res.status(500).json({
//             message: error.message,
//             status: "Internal Server Error",
//             code: 500
//         });
//     }
// }