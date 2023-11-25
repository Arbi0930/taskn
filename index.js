const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();

app.use(express.static('public'));
const BUCKETNAME = "mytaskmcs";

AWS.config.update({
    accessKeyId: "AKIA5YFY2CBLCIEIUZVF",
    secretAccessKey: "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",
    region: "us-east-1"
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

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
            data.forEach((uploadResult) => {
                console.log("amjilttai hadgalalaa");
            });
            res.status(200).send("amjilttai hadgalalaa");
        })
        .catch((err) => {
            console.error("Amjiltgv bollo:", err);
            res.status(500).send("zurag hadgalahad aldaa garlaa");
        });
});

app.listen(5000, () => {
    console.log('port 5000');
});
