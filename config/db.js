const mongoose=require('mongoose');
mongoURi="mongodb+srv://sneh:sneh123@cluster0.f6th5.mongodb.net/weatherInfo?retryWrites=true&w=majority"

var connectDB=async()=>{
    try{
        const conn= await mongoose.connect(mongoURi,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log("database connected");

    }
    catch(err){
        console.log('err: '+err);
    }
}
module.exports=connectDB;