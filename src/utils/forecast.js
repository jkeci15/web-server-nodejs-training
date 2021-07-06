const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa284e94ff49854b0a3f8e1e89aedc10&query='
        + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +
                    '. It feels like ' + body.current.feelslike +'. The humidity is ' + body.current.humidity +' %.')
        }
    })
}

module.exports = forecast