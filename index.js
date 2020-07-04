const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');

const homePage = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, (req,res) => {
  console.log('SERVER LISTENING');
})

app.use('/', homePage);

// Search Page
app.get('/search', (req,res) => {
  res.sendFile(__dirname + '/search.html')
})

// Handling the "Search" button in the Home Page (redirects to "search.html")
app.post('/search', (req,res) => {
  res.sendFile(__dirname + '/search.html')
})
