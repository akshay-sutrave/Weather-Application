const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geoCode= require('./utils/geoCode');
const darkSky = require('./utils/darkSky')
//Initialize Express
const app = express();

//Path 
const viewPath = path.join(__dirname, '../templates/views');
const publicDiroctory = path.join(__dirname, '../public');
const partial_Path  = path.join(__dirname, '../templates/partials');

//Declare
app.use(express.static(publicDiroctory))
app.set('view engine', 'hbs');
app.set('views', viewPath  )
hbs.registerPartials(partial_Path);

app.get('', (req, res) => {
    res.render('index', {
        title : 'Index',
        data: 'Akshay S'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'about',
        data: 'about data'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title : 'help',
        data: 'help data'
    });
})

app.get('/weather', (req,res) =>{
    if(!req.query.address) {
        return res.send({
            error : 'Please provide address'
        })
    }
    geoCode(req.query.address, (error, {Longitude, Latitude, Place} = {}) =>{
        if(error) {
            return res.send({
                error : 'Please provide valid address'
            })
        }
       darkSky( Latitude,Longitude, (error, data) =>{
           if(error){
            return res.send({
                error : 'Please provide valid address'
            })
           }
           res.send({
            forecast: data,
            address : req.query.address,
            location: Place
        })
       })
    })
  
})

app.get('/products', (req, res) =>{
    res.send({
        products :[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('notFound', {
        title : 'help',
        data: 'help data',
        errorMSG: 'Help page not found'
    });
   
})

app.get('*', (req,res) => {
    res.render('notFound', {
        title : 'Generic',
        data: 'Generic data',
        errorMSG: 'Generic page not found'
    });
})
app.listen(3000, () => {
    console.log('Server started');
});