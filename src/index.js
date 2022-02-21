require('dotenv/config')
const express = require('express');
const app=express();
var cors = require('cors')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

app.use(express.json());
app.use(express.static("public"))
app.use(cors({credentials: true, origin: true}));


app.use("/css",express.static(__dirname+"public/css"));
app.use("/js",express.static(__dirname+"public/js"));
app.use("images",express.static(__dirname+"public/images"))

app.set('views', './public/')
app.set('view engine', 'ejs')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('mypic')


app.post("/login",(req,res)=>{
        if(req.body.email=="gyan@gmail.com" && req.body.password=="gyan")
        {
            res.status(200).render("upload");
        }
        else
        {
             res.status(500).render("index",{status:false,authenticate:false});
        }
           
});
app.get("/upload",(req,res)=>{
    res.render("upload");
})

app.post("/uploadfile",upload,function (req, res) {
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).render("error");
        }

        res.status(200).render("success");
    })
 
})
app.get("/",(req,res)=>{
    res.render("index");
})

module.exports=app;