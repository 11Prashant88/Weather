const request = require('request');


const geocode = (address, callback)=>{
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJhc2hhbnR6ZW5kZSIsImEiOiJjandkZmF1dWMwbGFxNGJxMWx4ZDVpbHBpIn0.17uNB6haTfcx4dfTW05e-g";

    const forecast = request({url:url, json:true}, (error,res)=>{
        if(error)
        {
            callback("Unable to connect to server, please check internet connection", undefined);
        }
        else if(res.body.features.length == 0)
        {
            callback("Could not find location, please try different search", undefined);
        }
        else
        {
            callback(undefined, {latitude:res.body.features[0].center[1], longitude:res.body.features[0].center[0], location:res.body.features[0].place_name})
        }
    })
}

module.exports = geocode;