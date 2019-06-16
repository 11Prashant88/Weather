var request = require('request')

const geocode = function(address, callback)
{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJhc2hhbnR6ZW5kZSIsImEiOiJjandkZmF1dWMwbGFxNGJxMWx4ZDVpbHBpIn0.17uNB6haTfcx4dfTW05e-g'

    request({url:url, json:true}, (error, {body})=>{
        
        console.log('error=');
        
        if(error)
        {
            callback('cant reach server, please check internet connectivity.', undefined)
        }
        else if(body.features.length == 0)
        {
            
            callback('Unable to find location, Try another search', undefined)
        }
        else
        {
            callback(undefined, {latitude:body.features[0].center[1], longitude:body.features[0].center[0], location:body.features[0].place_name})
        } 
        
    })
}


module.exports = geocode;