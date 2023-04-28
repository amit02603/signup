const mongoose = require('mongoose');

 mongoose.connect("mongodb+srv://admin:admin123@cluster0.dzlqqfi.mongodb.net/?retryWrites=true&w=majority")
 .then(() => {

     console.log(" Online Database Connectionn succesfull ");

 })
 .catch((error) => 
 {
    console.log(error);
});