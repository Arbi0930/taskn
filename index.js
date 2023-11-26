const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();

app.use(express.static('public'));
const BUCKETNAME = "mytaskmcs";

AWS.config.update({
    accessKeyId: "AKIA5YFY2CBLMZLFN7W3",
    secretAccessKey: "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",
    region: "us-east-1"
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/files',(req,res)=>{
    const s3 = new AWS.S3()

    const listParams = {
        Bucket: BUCKETNAME
    }

    s3.listObjectsV2(listParams,(err,data)=>{
        if(err){
            console.error("aldaa",err)
            return res.status(500).send("internal error")
        }
        const files = data.Contents.map((file)=>({
            name: file.Key,
            url: `https://${BUCKETNAME}.s3.amazonaws.com/${file.Key}`
        }))
        res.json(files)

    })
})

app.post('/upload', upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("File missing");
    }

    const s3 = new AWS.S3();
    const uploadPromises = req.files.map((file) => {
        const uploadParams = {
            Bucket: BUCKETNAME,
            Key: file.originalname,
            Body: file.buffer
        };
        return s3.upload(uploadParams).promise();
    });

    Promise.all(uploadPromises)
        .then((data) => {
            console.log("amjilttai");
            res.status(200).send("amjilttai");
        })
        .catch((err) => {
            console.error("amjiltgv", err);
            res.status(500).send("amjiltgv");
        });
});


app.listen(5000, () => {
    console.log('port 5000');
});
