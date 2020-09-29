const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)

// Define paths for express config
// default views to custom templates
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials/')

//set handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);



//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'raghavendra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name : 'raghavendra'
    })
})

app.get('/products',(req,res)=> {
    if(!req.query.search) {
       return res.send({
            error:'you must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'you must provide address'
        })
    }
       geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error) {
               return res.send({error})
           }

           forecast(latitude,longitude,(error,forecastData) => {
               if(error) {
                return res.send({error})
               }
               res.send({
                   forecast:forecastData,
                   location,
                   address:req.query.address
               })
           })
       }) 
    // res.send({
    //     forecast: 'its snowing',
    //     location: 'bangalore',
    //     address: req.query.address
    // })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'this is show helpful text',
        title : 'Help',
        name:'raghavendra'
    })
})

app.get('/help/*',(req,res)=>{
  //  res.send('help article not found')
  res.render('404',{
      title:'404',
      name:'andrew',
      errorMessage:'Help article not found'
  })
})

app.get('*',(req,res)=>{
  //  res.send('my 404 page')
  res.render('404',{
      title: '404',
      name:'raghavendra',
      errorMessage:'Page not found'
  })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// it never runs
// app.get('', (req, res) => {
//     res.send('<h1>WEATHER</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'raghha',
//         age: 27
//     }, {
//         name: 'manju'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>ABOUT</h1>')
// })

