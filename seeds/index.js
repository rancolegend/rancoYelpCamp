const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("database connected!!")
};
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62ea7eb9a68b5ac380728cb9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui totam dolorum alias earum cumque reprehenderit facere maiores porro aspernatur aut ipsa iure architecto blanditiis cupiditate quas dolor, tenetur nobis consequatur.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
                cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dke95bowb/image/upload/v1659632271/YelpCamp/tyo8guzejp8yysw1mjx0.jpg',
                    filename: 'YelpCamp/tyo8guzejp8yysw1mjx0',
                },
                {
                    url: 'https://res.cloudinary.com/dke95bowb/image/upload/v1659632272/YelpCamp/sy9dj7mqivxls14mshle.jpg',
                    filename: 'YelpCamp/sy9dj7mqivxls14mshle',
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})