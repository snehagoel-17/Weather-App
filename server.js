var express=require('express');
var request=require('request');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended:true}));
const connectDB=require('./config/db');
const { response } = require('express');
connectDB();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


 var citySchema=new mongoose.Schema({
     name: String
 });

 var cityModel =mongoose.model('city',citySchema);

//  var lasvegas= new cityModel({name : 'Las Vegas'});
// var torento= new cityModel({name : 'Toronto'});
// var sydney= new cityModel({name : 'Sydney'});

//  lasvegas.save()
//  torento.save()
// sydney.save()



// var city='Las Vegas';
//async function getweather(cities){
     app.get('/',function(req,res){
       var city="ghaziabad";
    var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3320a19916a4ce956896d4c0c2677c75`;
 request(url,function(error,response, body){
     if(response.statusCode!=200)
         res.render("error");
     else{
        var weather_json=JSON.parse(body);
        
        var weather={
            city: city,
            temperature: Math.round(weather_json.main.temp),
            description: weather_json.weather[0].description,
            icon: weather_json.weather[0].icon,
        };
        var weather_data={weather:weather};
        res.render('weather',weather_data);
     }
    
 });
        
});

   
    // cityModel.find({},function(err,cities){
       
    //     getweather(cities).then(function(results){
    //        console.log(results);

    //        var weather_data={weather_data:results};
           
    //  res.render('weather',weather_data);
    //     });
    // });
    
    // });
   
  app.post('/',function(req,res){
      var city=req.body.city_name;
      //var newCity=new cityModel({name: req.body.city_name});
      //newCity.save();
      var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3320a19916a4ce956896d4c0c2677c75`;
      request(url,function(error,response, body){
          if(response.statusCode!=200)
              res.render("error");
          else{
      var weather_json=JSON.parse(body);
        
      var weather={
          city: city,
          temperature: Math.round(weather_json.main.temp),
          description: weather_json.weather[0].description,
          icon: weather_json.weather[0].icon,
      };
      var weather_data={weather:weather};
      console.log(weather_data);
      res.render("weather", weather_data);
  };
});
});

app.listen(8000,()=>{
    console.log("server is started")});
