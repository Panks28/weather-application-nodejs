const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=02f7331dce03914997c71ab0abe5c81d&query=" + latitude + "," + longitude;

    request({url:weatherURL, json:true}, (error,{body}) => {

        if (error) {

            callback("Unable to Connect to the Weather Services!", undefined)

        } else if (body.error) {
            callback("Unable to identify the coordinates. Error Code: " + body.error.code + "Error Type: " + body.error.type, undefined)

        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        };
    });
};


module.exports = forecast