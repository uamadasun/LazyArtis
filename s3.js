// const aws = require('aws-sdk');
// const dotenv = require('dotenv') ;
// const crypto= require('crypto')  ;
// const {promisify}= require("util")  ;
// const randomBytes = promisify(crypto.randomBytes)

// dotenv.config()

// const region = "us-west-2"
// const bucketName = "lazyartis"
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECURE_ACCESS_KEY

// const s3 = new aws.S3({
//     region, 
//     accessKeyId,
//     secretAccessKey,
//     signatureVersion: 'v4'
// })

// module.exports.generateUploadURL =  async() => {
//     const rawBytes = await randomBytes(16);
//     const imageName = rawBytes.toString('hex');
//     // const imageName = "random image name";
    
//     const params = ({
//         Bucket: bucketName,
//         Key: imageName,
//         Expires: 60
//     })

//     const uploadURL = await s3.getSignedUrlPromise('putObject', params)
//     return uploadURL;
// }