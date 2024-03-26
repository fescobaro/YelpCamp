const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.set('strictQuery', true);

// import fetch from 'node-fetch'

// let clientID = "Oe9hohad9DevMOIOeJytHi26w3h0bm211r6dc5oExmM";
// let endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientID}`

// fetch(endpoint)
//      .then(function (response) {
//          return response.json();
//      })
//      .then(function (jsonData) {
//          imageElement.src = jsonData.urls.regular;
//      })

const Campground = require('../models/campground');
//const { isSameProtocol } = require('node-fetch/src/utils/is');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '658a0d5fce5fe1e8e8b220d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/featured/300x203",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequuntur placeat voluptates explicabo et magni iste, quis optio amet, obcaecati aspernatur. Eius dicta aperiam iste quam, neque ducimus nobis beatae.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})