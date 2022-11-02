
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '635e32a9c52637af36063d9c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure temporibus ratione alias repellat laboriosam ab quas quis omnis excepturi non minima, facere quisquam accusamus odio, quam, harum animi corrupti tempore.',
            price,
            geometry: {
                type:"Point",
                coordinates:[cities[random1000].longitude,cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dv3wmwi3l/image/upload/v1667282001/Yelpcamp/tkpi9xagwwmgnkgymbbb.jpg',
                    filename: 'Yelpcamp/tkpi9xagwwmgnkgymbbb.jpg',
                },
                {
                    url: 'https://res.cloudinary.com/dv3wmwi3l/image/upload/v1667275311/Yelpcamp/dn0ldtqhsek118cv2kwh.jpg',
                    filename: 'Yelpcamp/dn0ldtqhsek118cv2kwh.jpg',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

