const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2140e56e9179c5af1e3eafddecdb7913&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;
    const json = true;
    request({ url, json }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find coordinates.', undefined);
        } else {
            const res = body.current;
            callback(undefined, `${res.weather_descriptions[0]}. It is currently ${res.temperature} degrees out. It feels like ${res.feelslike} degrees out. The humidity is ${res.humidity}%.`);
        }
    });
}; 

module.exports = forecast;