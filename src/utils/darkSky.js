const request = require('request');

const weatherApi = (latitute, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=31d7d60901279e51e4bfdc14a18e58d1&query=' + latitute + ',' + longitude;


    request({ url, json: true }, (error, {body} ) => {
        if (error) {
            callback('Service Unavailble', undefined);
        } else if (body.error) {
            callback('Cannot find location', undefined);
        } else {
            const data = body.current;
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degress out. But feels like ' + data.feelslike + ' degrees out')
        }
    })
}

module.exports = weatherApi;