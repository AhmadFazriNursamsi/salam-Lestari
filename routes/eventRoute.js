import Express from "express";  
import{
    getEvents,
    getEventsById,
    updateEvents,
    deleteEvents,
    createEvents
} from "../controller/eventsController.js";

import multer from "multer"
import csv from "fast-csv";
import jwt_decode from "jwt-decode";
import Event from "../model/events.js";
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
  
  router.post('/events',  async(req, res) => {
    try{
      
      const {description,event_date,location,end,start,summary, picture,status,share_news,created_by} = req.body;
      
      var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VyX25hbWUiOiJGYXpyaSIsImVtYWlsX2FkZHJlc3MiOiJueW9ueWFmYXpyaTE4MDUyMDAyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODU4MTc5NCwiZXhwIjoxNjY4NjY4MTk0fQ.P1XMBlZiAMxFNRO_C0EdXxKwG4mrl7xLnILrbb98y84";
      var decoded = jwt_decode(token); 
      
      const event =await Event.create({
        
        description:description, 
        event_date:event_date, 
        location:location,
        end:end,
        start:start,
        summary:summary,
        picture:picture,
        status:1,
        share_news:share_news,
        user_id:req.body.user_id,
        created_by:decoded.user_name,
      });
      await Event_Join.update(
        {
          present: 1,
          even_id: event.id
        },{
          where: {
            user_id: req.body.user_id
          }
        });
        
        res.json({
          message: 'File successfully inserted!',
          event,
        })
      }catch (error){
        res.status(500).json({message: error.message});
    }
      });

router.patch('/events/:id', async(req, res) => {
    const {description,event_date,location,end,start,summary, picture,status,share_news,created_by} = req.body;

    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VyX25hbWUiOiJGYXpyaSIsImVtYWlsX2FkZHJlc3MiOiJueW9ueWFmYXpyaTE4MDUyMDAyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODU4MTc5NCwiZXhwIjoxNjY4NjY4MTk0fQ.P1XMBlZiAMxFNRO_C0EdXxKwG4mrl7xLnILrbb98y84";
    var decoded = jwt_decode(token); 
    
    const carous = Event.update({
        description:description, 
        event_date:event_date, 
        location:location,
        end:end,
        start:start,
        summary:summary,
        picture:picture,
        status:1,
        share_news:share_news,
        created_by:decoded.user_name,
    }, {
        where: {
            id:req.params.id
        }
    });
    res.json({
      message: 'Data Berhasil Diupdate!',
      file: req.file,
      description,event_date,location,end,start,summary, picture,status,share_news,created_by
    })
});

router.get('/events', getEvents);
router.get('/events/:id', getEventsById);
router.delete('/events/:id', deleteEvents);

export default router;