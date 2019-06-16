var request = require('request')
var chalk = require('chalk');

const forecast = function(lat, long, callback)
{
    var url = 'https://api.darksky.net/forecast/8eec5f85604e55fc39fee515c077b466/'+lat+','+long+'?units=si';

    request({url:url, json:true}, (error, {body})=>{
        if(error)
        {
            callback('cant reach server, please check internet connectivity', undefined);
        }
        else if(body.error)
        {
            callback('please provide correct details', undefined);
        }
        else
        {
            var tempUnit = body.flags.units === 'us' ? '°F' : '°C';
            callback(undefined,body.daily.data[0].summary + ' Current temperature is '+ body.currently.temperature +' '+tempUnit+'. There is '+body.currently.precipProbability+'% chance of rain.');
        }
    })
}
module.exports = forecast;
