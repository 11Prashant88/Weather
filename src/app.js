var express = require('express');
var app = express();
var path = require('path');
const hbs = require('hbs');
var geocode = require('./utils/geocode.js');
var forecast = require('./utils/forecast.js');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const partialsPath = path.join(__dirname, '../partials')
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs')

app.get('', (req, res)=>{
    res.render('index',{
        title:"Weather",
        detailsText:'Use this site to get weather details',
        footerText:'@ copyright all rights reserved'
    })
})

app.get('/weather', (req,res)=>{
    console.log('working')
    if(!req.query.address)
    {
        console.log(req.query.address)
        return res.send({
            error:"Please provide address."
        })
    }

    geocode(req.query.address, (error, geocodeData)=>{
        if(error)
        {
            return res.send({error:error})
        }
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData)=>{
            if(error)
            {
                return res.send({error:error});
            }
            res.send({
                location:geocodeData.location,
                forecast:forecastData.forecast
            })
        })
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:"About",
        name:"Prashant",
        footerText:'@ copyright all rights reserved'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:"Help",
        email:'pzende88@gmail.com',
        phone:'7760181830',
        footerText:'@ copyright all rights reserved'
    })
})

app.listen(3000, ()=>{
    console.log('app is listening on port '+port);
})