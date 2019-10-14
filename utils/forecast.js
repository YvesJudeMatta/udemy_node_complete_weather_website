const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const secretKey = '483e8020fd579d42be30b5d8cee8880f';
    const url = 'https://api.darksky.net/forecast/' + secretKey + '/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const { temperatureHigh, temperatureLow, summary } = body.daily.data[0] || {};
            const { temperature } = body.currently || {}

            const message = summary + ' It is currently ' + temperature + ' degress out. The high today is ' + temperatureHigh + ' with a low of ' + temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.';
            callback(undefined, message)
        }
    })
}

module.exports = forecast