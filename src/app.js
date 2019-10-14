const path = require('path')

const express = require('express')
const hbs = require('hbs')

const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

// Create express app
const app = express()
const PORT = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // render can render handlebar views - index needs to batch with filename
  // pas object to view
  res.render('index', {
    title: 'Weather',
    name: 'Yves Matta'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Yves Matta'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Yves Matta',
    message: 'This is the help page'
  });
})

app.get('/weather', (req, res) => {
  const { address } = req.query || {};

  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  const geocodeResponse = geocode(address, (error, geocodeData) => {
    if (error) {
      return res.send({ error })
    }
    
    const {
      latitude,
      longitude,
      location
    } = geocodeData || {};

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        address,
        location,
        forecast: forecastData
      })
    })
  })
})

// app.get('/products', (req, res) => {
//   const { search } = req.query || {};
//   if (!search) {
//     return res.send({
//       error: 'You must provide a search term'
//     })
//   }

//   res.send({
//     products: []
//   })
// })

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yves Matta',
    errorMessage: 'Help article not found'
  })
})

// needs to be last
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yves Matta',
    errorMessage: 'Page not found'
  })
})

// running server is asynchronous
// web server never going to stop unless we stop it
app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT + '.')
})