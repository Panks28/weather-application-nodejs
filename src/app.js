const path = require('path');
const express =  require ('express');
const hbs = require('hbs');
const app = express();
const forecast= require ('./Utilities/forecast.js');
const geocode = require('./Utilities/geocode.js');
const port = process.env.PORT || 3000;

// Defining the path directory of the folder that contains the static assets of the webiste.
const publicDirectoryPath = path.join(__dirname, '../public')

// Setting up the Default directory to look up for static content/pages to be loaded on the website.
app.use(express.static(publicDirectoryPath))

//Initializing and Defining the view engine (for handlebars) that will help to render dynamic content/pages on the webiste. 
app.set ('view engine','hbs')

//*** FilePath needs to be mentioned if the .hbs files are put in folder other than the default directory i.e. views */
const viewsPath = path.join (__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Routing with Express

app.get ('', function(req,res){
    res.render('index',{
        title: "Weather",
        name:"Pankaj Bhadwal"
    })
});

app.get('/about', function(req,res){
    res.render('about',{
        title:"About",
        name: "Pankaj Bhadwal"
    })
});

app.get('/help', function (req,res){
    res.render('help', {
        title:"Help",
        name:"Pankaj Bhadwal",
        message:"Welcome to the Help Page of the Weather Website. All of your queries will be addressed here!"
    })
});

app.get('/weather', function (req, res){

    const userInput = req.query.address;

if (!userInput) {
    return res.send (
        {
        error:"Please provide a location name!"
        }
        
    )}

else {
geocode(userInput, (error, {latitude, longitude, Location} = {}) => {

    if (error) {
        return res.send ({error})
    }

    forecast(latitude, longitude, callback = (error, forecastData) => {

        if (error) {
            return res.send ({error})
        }

        res.send({
            Address:Location,
            WeatherForecast: "The temperature right now is " + forecastData.temperature + " degree Celcius and it feels like "
            + forecastData.feelslike + " degree Celcius"

        })
        
    });
});
};
    
    });
    


app.get('/help/*', function (req,res) {
    res.render('404Error', {
        title: "Help",
        name:"Pankaj Bhadwal",
        error: "404 Error",
        errortype: "Requested help article not found"
    })
});


app.get('*', function (req,res) {
    res.render ('404Error', {
        title: "Weather",
        name:"Pankaj Bhadwal",
        error: "404 Error",
        errortype: "Page Not Found"
    })
});



// Initializing the Server at which the website content will be loaded
app.listen (port, function () {
    console.log("Loaded at Port 3000 successfully!")
});

