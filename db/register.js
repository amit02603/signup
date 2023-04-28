const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/omnios")
require('../db/conn')
const productSchema = new mongoose.Schema({

    firstname: {

        type: String,
        required: true

    },

    lastname: {

        type: String,
        required: true

    },
    email: {

        type: String,
        required: true,
        unique: true
    },
    age: {

        type: Number,
        required: true

    },
    password: {

        type: String,
        required: true

    },
    confirmpassword: {

        type: String,
        required: true

    },

});

const register=new mongoose.model('chd', productSchema);

module.exports=register;