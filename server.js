'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // new for lab 08

const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
    response.send('testing testing is this thing on????');
});

app.get('/photos', async (request, response) => {
    const searchQuery = request.query.searchQuery;

    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;

    const photoResponse = await axios.get(url);
    // just looking at the data
    console.log("Axios always gives me what I want in a property called data: ", photoResponse.data.results[0].urls);

    const photoArray = photoResponse.data.results.map(photo => new Photo(photo));

    response.status(200).send(photoArray);
});

class Photo {
    constructor(obj) {
        this.img_url = obj.urls.regular;
        this.photographer = obj.user.name
    }
}

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
