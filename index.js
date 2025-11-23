const express=require ('express');
const app=express();

const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/File_upload")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));;

//user route
const user_route=require('./routes/userRoute');
app.use('/api',user_route);

app.listen(3000,function() {
    console.log("connected to mongoDB succesfully");
});