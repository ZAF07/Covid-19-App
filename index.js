const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(3000, (req,res) => {
  console.log('SERVER LISTENING');
})

// Home Page
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/home.html');
})

// Search Page
app.get('/search', (req,res) => {
  res.sendFile(__dirname + '/search.html')
})

// Error Page
// app.get('/error', (req, res) => {
//   res.sendFile(__dirname + '/error.html');
// });

// Handling the "Search" button in the Home Page (redirects to "search.html")
app.post('/search', (req,res) => {
  res.sendFile(__dirname + '/search.html')
})

// Handling the "Search" button in the Search Page (redirects to "show.html")
app.post('/show', (req,res) => {
  let country = req.body.country;

  // axios here
  axios({
      "method":"GET",
      "url":"https://covid-193.p.rapidapi.com/statistics",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"covid-193.p.rapidapi.com",
      "x-rapidapi-key":"cea516208fmsh3470ec4837cb294p174685jsna83448666099",
      "useQueryString":true
      },"params":{
      "country": `${country}`
      }
      })
      .then((response)=>{
        const continent = (response.data.response[0].continent);
        const curCountry = (response.data.response[0].country);
        const totalCases = (response.data.response[0].cases.total);
        const population = (response.data.response[0].population);
        const newCases = (response.data.response[0].cases.new);
        const activeCases = (response.data.response[0].cases.active);
        const recoveredCases = (response.data.response[0].cases.recovered);
        const criticalCases = (response.data.response[0].cases.critical);
        const newDeaths = (response.data.response[0].deaths.new);
        const totalDeaths = (response.data.response[0].deaths.total);
        const day = (response.data.response[0].day);
        const time = (response.data.response[0].time);
        console.log(response.data.response[0].time);
        if (country === 'usa') {
          country = 'USA';
        }

        res.send(`


          <!doctype html>
          <html lang="en">
            <head>
              <!-- Required meta tags -->
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

              <!-- Bootstrap CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
              <!-- Custom CSS -->
              <link rel="stylesheet" href="show.css">
              <!-- Fontawesome CDN -->
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V" crossorigin="anonymous">

              <title>COVID-19 | Reports</title>
            </head>
            <body class="">

              <header>
                <ul class="nav nav-pills back-btn">
                  <li class="nav-item">
                    <a class="nav-link btn btn-sm" href="/search"><i class="fas fa-arrow-left"></i> Go Back</a>
                  </li>
                </ul>
                <div class="jumbotron jumbotron-fluid" id="jumbotron">

                  <div class="container text-right">
                    <h1 class="display-4">Covid-19 World Statistics</h1>
                    <p class="lead">Keep up to date with the world's COVID-19 reports.</p>
                  </div>
                </div>
              </header>




              <div class="container-fluid">

            <div class="row">

            <div class="col-lg-3">

            <main role="main" class="inner cover text-center">
              <div class="card rounded-lg p-3">
              <h1 class="text-capitalize">Deaths</h1>
              <p>Total Deaths</p>
              <small>${totalDeaths}</small>
              <hr>
              <p>Recent Deaths</p>
              <small>${newDeaths}</small>
              <hr>




              <div class="card rounded-lg p-3">
              <h5 class="text-capitalize">Accurate as of:</h5>

              <small>${day}</small>
              <hr>

              <small>${time}</small>
              <hr>

              </div>
            </main>


            </div>

            <div class="col-lg-3">
                <main role="main" class="inner cover text-center">

                  <div class="card rounded-lg p-3">
                  <h1 class="text-capitalize">Cases</h1>
                  <p>New Cases</p>
                  <small>${newCases}</small>
                  <hr>
                  <p>Active Cases</p>
                  <small>${activeCases}</small>
                  <hr>
                  <p>Critical Cases</p>
                  <small>${criticalCases}</small>
                  <hr>
                  <p>Recovered Cases</p>
                  <small>${recoveredCases}</small>
                  <hr>


                  </div>
                </main>

            </div>


              <div class="col-lg-6">
                  <main role="main" class="inner cover text-center">

                    <div class="card rounded-lg p-3">
                      <h1>Country</h1>
                      <h3 class="text-capitalize">${country}</h3>
                      <hr>
                      <h3>Continent</h3>
                      <p class="lead">${continent}</p>






                    <h3 class="">Population:</h3>
                    <p class="text-capitalize">${population}</p>
                    <hr>
                    <h3 class="">Total Cases:</h3>
                    <p class="lead">${totalCases}</p>

                  </div>
                </main>
          </div>
          </div>
        </div>

          <!-- Optional JavaScript -->
          <!-- jQuery first, then Popper.js, then Bootstrap JS -->
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        </body>
      </html>



          `);
      })

      .catch((error)=>{
        res.sendFile(__dirname + '/error.html');
      });
});
