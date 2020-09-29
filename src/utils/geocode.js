const request = require('postman-request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFnaHUxMDYiLCJhIjoiY2tmNmlkM2J2MHd5bzJybm93aHhpMnhreiJ9.R6jbuNhb92tQHEzOP9OUwQ'

    request({  url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location , try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })

}

module.exports = geoCode