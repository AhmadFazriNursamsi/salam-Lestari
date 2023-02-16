import Express from "express";  
import{
    getArticies,
    getArticiesById,
    updateArticies,
    deleteArticies,
    createArticies
} from "../controller/articiesController.js";

import multer from "multer"
import csv from "fast-csv";
import jwt_decode from "jwt-decode";
import Articies from "../model/articies.js";
import path from "path";


const router = Express.Router();
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname),
      )
    },
  });

   var upload = multer({
    storage: storage,
  });
  var statuss = "active"
  
  router.post('/articies', async(req, res) => {
    const {content, highlight, title, type,picture, created_by, is_event } = req.body;

    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VyX25hbWUiOiJGYXpyaSIsImVtYWlsX2FkZHJlc3MiOiJueW9ueWFmYXpyaTE4MDUyMDAyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODU4MTc5NCwiZXhwIjoxNjY4NjY4MTk0fQ.P1XMBlZiAMxFNRO_C0EdXxKwG4mrl7xLnILrbb98y84";
    var decoded = jwt_decode(token); 
    
   const articiess =await Articies.create({
        content:content, 
        highlight:highlight, 
        title:title,
        type:type,
        picture:req.body.picture,
        created_by:decoded.user_name,
        status:1,
        is_event:is_event
    });

    res.json({
      message: 'File successfully inserted!',
      file: req.file,
      articiess,
      content, highlight, title, type,picture, statuss, created_by, is_event
    })
});


router.patch('/articies/:id', async(req, res) => {
    const {content, highlight, title, type,picture, created_by, is_event } = req.body;

    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJ1c2VyX25hbWUiOiJOdXJzYW1zaSIsImVtYWlsX2FkZHJlc3MiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2NjcyMDYyNDYsImV4cCI6MTY2NzI5MjY0Nn0.VqEMCb3avJaAj58VBfugdSEqxoB7zJo0W3Hm1Riv3UA";
    var decoded = jwt_decode(token); 
    
    // const artiscies = Articies.findOne({
    //     where: {
    //         id:req.params.id
    //     }
    // });
    Articies.update({
      content:content, 
      highlight:highlight, 
      title:title,
      type:type,
      picture:req.body.picture,
      created_by:decoded.user_name,
      status:1,
      is_event:is_event
    }, {
        where: {
            id:req.params.id
        }
    });
    res.json({
      message: 'Data Berhasil Diupdate!',
      file: req.file,
      content, highlight, title, type,picture, statuss, created_by, is_event, code : 0
    })
});

router.get('/articies', getArticies);
router.get('/articies/:id', getArticiesById);
// router.post('/articies', createArticies, );
router.patch('/articies/:id', updateArticies);
router.delete('/articies/:id', deleteArticies);

export default router;