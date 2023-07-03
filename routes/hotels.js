const express = require('express');
const router = express.Router();
const Hotels = require('../models/hotels');

// <---- cloudinary ----->
const multer = require('multer');
const storage = require('../coudinary/index');
const upload = multer({ storage });


// <---- view Hotel ----->

router.get('/hotels', async(req, res)=>{
    try {
        const HotelsData = await Hotels.find();
        
        res.render('../views/hotels/index.ejs', {HotelsData});
    } catch (error) {
        console.log(error);
    }
})

router.get('/hotels/:hotelId/view', async(req, res)=>{
    try {
        const HotelData = await Hotels.findById(req.params.hotelId);
        const Images = HotelData.image;
        res.render('../views/hotels/view.ejs', {HotelData, Images});
    } catch (error) {
        console.log(error);
    }
})

// <---- Add new Hotel ----->
router.get('/hotels/new', (req, res)=>{
    res.render('../views/hotels/new.ejs');
})

router.post('/hotels/new', upload.array('image'), async(req, res)=>{
    try {
        const newHotel = new Hotels({
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description,
        });

        for (let img of req.files) {
            newHotel.image.push(img.path);
        }
        await newHotel.save();
        res.redirect('/hotels');
    } catch (error) {
        console.log(error);
    }
})

// <---- Edit Hotel ----->

router.get('/hotels/:hotelId/edit', async(req, res)=>{
    try {
        const HotelData = await Hotels.findById(req.params.hotelId);
        res.render('../views/hotels/edit.ejs', {HotelData});
    } catch (error) {
        console.log(error);
    }
})


router.patch('/hotels/:hotelId/edit', async(req, res)=>{
    try {
        const newHotelData = {
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description,
            image: req.body.image,
        };

        await Hotels.findByIdAndUpdate(req.params.hotelId, newHotelData);
        res.redirect('/hotels');

    } catch (error) {
        console.log(error);
    }
})


// <---- Delete Hotel ----->

router.delete('/hotels/:hotelId/delete', async(req, res)=>{
    try {
        await Hotels.findByIdAndDelete(req.params.hotelId);
        res.redirect('/hotels');
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;