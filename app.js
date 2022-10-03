const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML Forms)
app.use(express.urlencoded({ extended: false }));

//Parse JSON bodies (as sent by API Clients)
app.use(express.json());

app.use(cookieParser());

app.set('view engine', 'hbs')

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Database is connected ...");
    }
})

// Define Routes
app.use('/', require('./routes/pagesRoute'));
app.use('/auth', require('./routes/authRoute'));

app.listen(3000, () => {
    console.log("Server started on port 3000 ...");
});