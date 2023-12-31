const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer  = require('multer');
const hotelsRoute = require('./routes/hotels');

// <----- MongoDB ------>
const URI = process.env.URI;
mongoose.connect(URI)
.then(()=>{
    console.log("DB connected!");
}).catch((error)=>{
    console.log(error);
})



// <----- Server Setup ------>


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(hotelsRoute);




app.get('/', (req, res)=>{
    res.send('server is working');
})

app.listen(3000, ()=>{
    console.log("server is up and running opn port 3000");
})