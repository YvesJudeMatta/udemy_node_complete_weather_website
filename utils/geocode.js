const request = require('request')

const geocode = (address, callback) => {
    const accessToken = 'pk.eyJ1IjoieWV2c20iLCJhIjoiY2lpeXAzMTF2MDAzdnUybTQ2cjNtd2g0YiJ9.c2MrUYlSvKg-qd7zBc1Wyw';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + accessToken;

    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode