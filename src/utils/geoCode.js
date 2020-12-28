const request = require('request');

const geoCode = (address, callback) => {
    console.log(address);
    const weatherUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF5cyIsImEiOiJja2lsZ2xxY2MwaGs2MnJsYnZsb21iODd6In0.3NPw4MuHgGXtEiwHyk2EXQ&limit=1';
    request({ url: weatherUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Service Unavailble', undefined);
        } else if (body.message) {
            callback('Cannot find location', undefined);
        } else {
            const features = body.features[0];
            let data = {};
            if(body.features[0]){
             data = {
                'Longitude': features.center[0],
                'Latitude': features.center[1],
                'Place' : features.place_name
            } 
        }
            console.log(data);
            callback(undefined, data);
        }
    })
}

module.exports = geoCode;