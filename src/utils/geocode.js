const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFybmV5c3RpbnNvbm4iLCJhIjoiY2t0MWxpMDdlMGJtOTJ2czIwNmJxejZ2dSJ9.8YvBhGFnHMypcKCrI_A3Mg&limit=1`;
    const json = true;
    request({ url, json }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const res = body.features[0];
            callback(undefined, { 
                latitude: res.center[1], 
                longitude: res.center[0], 
                location: res.place_name });
        }
    });
}; 

module.exports = geocode;