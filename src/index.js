require('dotenv/config')
const express = require('express');
const app=express();
var cors = require('cors')
const multer = require('multer')
const aws = require('aws-sdk')
const uuid = require('uuid/v4')
const multerS3 = require("multer-s3");

app.use(express.json());
app.use(express.static("public"))
app.use(cors({credentials: true, origin: true}));


app.use("/css",express.static(__dirname+"public/css"));
app.use("/js",express.static(__dirname+"public/js"));
app.use("images",express.static(__dirname+"public/images"))

app.set('views', './public/')
app.set('view engine', 'ejs')

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region:"ap-south-1"
});

const s3 = new aws.S3();

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

app.post("/uploadfile",function (req, res) {
    let upload = multer({
		storage: multerS3({
			s3: s3,
			acl: 'public-read',
			bucket: process.env.AWS_BUCKET_NAME,
			key: function(req, file, cb){
				cb(null, `${uuid()}`+file.originalname);
			}
		}),
		fileFilter: function(req, file, cb){
			const fileExt = file.mimetype.split("/")[1];
			const extArray = ['jpeg', 'jpg', 'png', 'gif','webp'];
			const error = new Error("File type not support");

			if(!file) res.status(500).render("error");
			
			if(extArray.includes(fileExt)){
				cb(null, true);
			} else {
				cb(error, false);
			};
		},
		limits: {fileSize: 2*1024*1024}
	}).fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]);

	upload(req, res, (err) =>{
		if(err instanceof multer.MulterError || err){
			console.log("UPLOD-Error: ",err);
			return res.status(400).render("error");
		};
		
		res.status(200).render("success");
	});
})


app.get("/",(req,res)=>{
    res.render("index");
})

module.exports=app;