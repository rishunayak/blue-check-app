const express = require('express');
const app=express();
var cors = require('cors')
const multer = require("multer")
const path = require("path")
app.use(express.json());
app.use(cors({credentials: true, origin: true}));



var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       

const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
});  

app.post("/login",(req,res)=>{
        if(req.body.email=="gyan@gmail.com" && req.body.password=="gyan")
        {
            res.status(200).send({status:true,authenticate:true});
        }
        else
            res.status(401).send({status:false,authenticate:false});
});

app.post("/uploadfile",upload.single("mypic"),function (req, res, next) {
   
 
})
module.exports=app;