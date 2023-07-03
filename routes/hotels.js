const express = require('express');
const router = express.Router();
const Hotels = require('../models/hotels');

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
        res.render('../views/hotels/view.ejs', {HotelData});
    } catch (error) {
        console.log(error);
    }
})

// <---- Add new Hotel ----->
router.get('/hotels/new', (req, res)=>{
    res.render('../views/hotels/new.ejs');
})

router.post('/hotels/new', async(req, res)=>{
    try {
        const newHotel = new Hotels({
            name: req.body.name,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description,
            image: req.body.image,
        });
        await newHotel.save();
        res.send('data saved');
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;