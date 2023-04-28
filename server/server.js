const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const port = 4400;
const hbs = require('hbs');


// get database files
require('../db/conn');
const register = require('../db/register');
const { match } = require('assert');

// set template engine
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// load assets
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
// app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
// app.use('/js',express.static(path.resolve(__dirname,"assets/js")));


app.use(express.static('assets'))
// app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, resp) => {

    resp.render('index');
});

app.get('/login', (req, resp) => {

    resp.render('login');
});
app.post('/register', async (req, resp) => {

    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registeruser = new register({

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword

            })

            const savedata = await registeruser.save();
            resp.status(201).render('index');

        } else {
            resp.send('password not match');

        }
    }

    catch (error) {
        resp.status(400).send(error);

    }


});

app.post('/login', async (req, resp) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await register.findOne({ email:email });

        if (usermail.password === password) {

            resp.status(201).render("home")

        } else {

            resp.send("Invalid login details")
        }
  
    }
    catch (error) {
        resp.status(400).send("ERROR....Something isnt right");

    }


})
app.listen(port, () => {

    console.log(`Server is listening on localhost:${port}`);
});