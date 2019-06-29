const request = require('request');

const forecast = (latitude, longitude, callback)=>{
    var url = "https://api.darksky.net/forecast/8eec5f85604e55fc39fee515c077b466/"+latitude+","+longitude+"?units=si";

    request({url:url, json:true}, (err,res)=>{

        var tempSymbol = '°F';
        if(res.body.flags.units == 'si')
        {
            tempSymbol = '°C';
        }

        if(err)
        {
            callback("Unable to connect to server, please check internet connection", undefined);
        }
        else if(res.body.error)
        {
            callback("Please provide correct latitude and longitude details", undefined)
        }
        else
        {
            callback(undefined,{forecast:res.body.daily.data[0].summary + " Current temperature is "+ res.body.currently.temperature+" "+tempSymbol+". There is "+res.body.currently.precipProbability+" % chance of rain."})
        }
    })
}


module.exports = forecast;