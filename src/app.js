const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// lets express know which templates you are using
// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory location
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jorgel Keci'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jorgel Keci'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Help is on its way!',
        title: 'Help!',
        name: 'Jorgel Keci'
    })
})
app.get('/help/*', (req, res) => {
    res.render('errorhandler', {
        title: '404',
        errorText: 'Help article not found',
        name: 'Jorgel'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide address search term'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('errorhandler', {
        title: '404',
        errorText: 'Page not found',
        name: 'Jorgel '
    })
})
app.listen(port, () => {
    console.log('Running server and listening on '+ port);
})