const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    description: String,
    image: String,
})

const Hotel = mongoose.model('Hotels', hotelSchema);

module.exports = Hotel;