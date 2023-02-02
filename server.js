const generateUploadURL = require ("./s3");

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('./server/config/mongoose.config')
app.use(cookieParser());
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

app.listen(port, () => console.log(`Listening on port ${port}`));