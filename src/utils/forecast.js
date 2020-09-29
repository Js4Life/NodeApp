const request = require('postman-request')

const forecast = (lat,long,cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=fff680f2017d62e557e1ca72e122d63c&query='+ lat + ','+long + ',-122.4233&units=f';
    request({url,json:true},(err,{body})=>{
        if(err) {
            cb('unable to connect to weather svc',undefined)
        } else if (body.error) {
            cb('unable to locate',undefined)
        } else {
            console.log(body.current)
            cb(undefined,body.current.temperature + ' deg out . there is a ' + body.current.feelslike + ' chance of rain. and its very humid of ' + body.current.humidity + ' with visibility of ' +body.current.visibility)
        }
    })
}


module.exports = forecast