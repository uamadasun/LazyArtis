const generateUploadURL = require ("./s3");

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('./server/config/mongoose.config')
app.use(cookieParser());
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.options("*", cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./server/routes/user.routes')(app);
require('dotenv').config();
// app.get('/s3Url', async (req,res) => {
//     // const url = s3.generateUploadURL(imageURL)
//     const url = await s3.generateUploadURL(imageURL)
//     res.send({url})
// })


const port = 8000;
// //Defining CORS
// app.use(function(req, res, next) {
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type"
//     );
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

app.listen(port, () => console.log(`Listening on port ${port}`));