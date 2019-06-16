var express = require('express');
var app = express();
var hbs = require('hbs')
var path = require('path')
var publicPath = path.join(__dirname, '../public');
var partialsPath = path.join(__dirname, '../partials')
var geocode = require('./utils/geocode');
var forecast = require('./utils/forecast');
 

app.use(express.static(publicPath))
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs')

app.get('', (req,res)=>{
    res.render('index', {title:'Weather'});
})

app.get('/about', (req, res)=>{
    res.render('about', {title:'About', name:'Prashant'})
})

app.get('/help', (req,res)=>{
    res.render('help', {title:'Help'})
})

app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'please provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error)
        {
            console.log(error);
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error)
            
            {
                return res.send({erorr});
            }

            res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
            })
        })
    })
})

app.listen(3000, ()=>{
    console.log('app listening on port:3000')
})