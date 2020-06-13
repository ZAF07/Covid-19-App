const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, (req,res) => {
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
        if (country) {
          country.toUpperCase();
        }
        let widthDisplay;
        let colorDisplay;
        if (totalDeaths > 10000) {
          widthDisplay = '100%';
          colorDisplay = 'danger'
        } else if (totalDeaths >= 5000 && totalDeaths < 10000) {
          widthDisplay = '75%';
          colorDisplay = 'warning';
        } else if (totalDeaths >= 500 && totalDeaths < 5000) {
          widthDisplay = '45%';
          colorDisplay = 'warning';
        } else if (totalDeaths > 10 && totalDeaths < 500) {
          widthDisplay = '25%';
          colorDisplay = 'success';
        } else if (totalDeaths > 0 && totalDeaths < 10) {
          widthDisplay = '10%';
          colorDisplay = 'success';
        } else {
          widthDisplay = '0%';
          colorDisplay = 'info';
        };

        let recentwidthDisplay;
        let recentcolorDisplay;
        if (newDeaths >= 10000) {
          recentwidthDisplay = '100%';
          recentcolorDisplay = 'danger'
        } else if (newDeaths >= 5000 && newDeaths < 10000) {
          recentwidthDisplay = '75%';
          recentcolorDisplay = 'warning';
        } else if (newDeaths >= 500 && newDeaths < 5000) {
          recentwidthDisplay = '45%';
          recentcolorDisplay = 'warning';
        } else if (newDeaths > 10 && newDeaths < 500) {
          recentwidthDisplay = '25%';
          recentcolorDisplay = 'success';
        } else if (newDeaths > 0 && newDeaths < 10) {
          recentwidthDisplay = '10%';
          recentcolorDisplay = 'success';
        } else if (newDeaths == 'null' || newDeaths == 0) {
          recentwidthDisplay = '0%';
          recentcolorDisplay = 'info';
        };

        let newCaseswidthDisplay;
        let newCasescolorDisplay;
        if (newCases >= 10000) {
          newCaseswidthDisplay = '100%';
          newCasescolorDisplay = 'danger'
        } else if (newCases >= 5000 && newCases < 10000) {
          newCaseswidthDisplay = '75%';
          newCasescolorDisplay = 'danger';
        } else if (newCases >= 500 && newCases < 5000) {
          newCaseswidthDisplay = '45%';
          newCasescolorDisplay = 'danger';
        } else if (newCases > 10 && newCases < 500) {
          newCaseswidthDisplay = '25%';
          newCasescolorDisplay = 'warning';
        } else if (newCases > 0 && newCases < 10) {
          newCaseswidthDisplay = '10%';
          newCasescolorDisplay = 'success';
        } else if (newCases == 'null' || newCases == 0) {
          newCaseswidthDisplay = '0%';
          newCasescolorDisplay = 'info';
        };

        let activeCaseswidthDisplay;
        let activeCasescolorDisplay;
        if (activeCases > 10000) {
          activeCaseswidthDisplay = '100%';
          activeCasescolorDisplay = 'danger'
        } else if (activeCases >= 5000 && activeCases < 10000) {
          activeCaseswidthDisplay = '75%';
          activeCasescolorDisplay = 'danger';
        } else if (activeCases >= 500 && activeCases < 5000) {
          activeCaseswidthDisplay = '45%';
          activeCasescolorDisplay = 'warning';
        } else if (activeCases > 10 && activeCases < 500) {
          activeCaseswidthDisplay = '25%';
          activeCasescolorDisplay = 'success';
        } else if (activeCases > 0 && activeCases < 10) {
          activeCaseswidthDisplay = '10%';
          activeCasescolorDisplay = 'success';
        } else {
          activeCaseswidthDisplay = '0%';
          activeCasescolorDisplay = 'info';
        };

        let criticalCaseswidthDisplay;
        let criticalCasescolorDisplay;
        if (totalDeaths > 10000) {
          criticalCaseswidthDisplay = '100%';
          criticalCasescolorDisplay = 'danger'
        } else if (criticalCases >= 5000 && criticalCases < 10000) {
          criticalCaseswidthDisplay = '75%';
          criticalCasescolorDisplay = 'warning';
        } else if (criticalCases >= 500 && criticalCases < 5000) {
          criticalCaseswidthDisplay = '45%';
          criticalCasescolorDisplay = 'warning';
        } else if (criticalCases > 10 && criticalCases < 500) {
          criticalCaseswidthDisplay = '25%';
          criticalCasescolorDisplay = 'success';
        } else if (criticalCases > 0 && criticalCases < 10) {
          criticalCaseswidthDisplay = '10%';
          criticalCasescolorDisplay = 'success';
        } else {
          criticalCaseswidthDisplay = '0%';
          criticalCasescolorDisplay = 'info';
        };

        let recoveredCaseswidthDisplay;
        let recoveredCasescolorDisplay;
        if (recoveredCases > 10000) {
          recoveredCaseswidthDisplay = '100%';
          recoveredCasescolorDisplay = 'success'
        } else if (recoveredCases >= 5000 && recoveredCases < 10000) {
          recoveredCaseswidthDisplay = '75%';
          recoveredCasescolorDisplay = 'success';
        } else if (recoveredCases >= 500 && recoveredCases < 5000) {
          recoveredCaseswidthDisplay = '45%';
          recoveredCasescolorDisplay = 'success';
        } else if (recoveredCases > 10 && recoveredCases < 500) {
          recoveredCaseswidthDisplay = '25%';
          recoveredCasescolorDisplay = 'success';
        } else if (recoveredCases > 0 && recoveredCases < 10) {
          recoveredCaseswidthDisplay = '10%';
          recoveredCasescolorDisplay = 'success';
        } else {
          recoveredCaseswidthDisplay = '0%';
          recoveredCasescolorDisplay = 'info';
        };

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
              <p>Total Death<p>
              <div class="progress rounded" style="height: 10px">
                <div class="progress-bar bg-${colorDisplay}" style="width:${widthDisplay}" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <small>${totalDeaths}</small>
              <hr>
              <p>Recent Deaths</p>
              <div class="progress rounded" style="height: 10px">
                <div class="progress-bar bg-${recentcolorDisplay}" style="width:${recentwidthDisplay}" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
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
                  <div class="progress rounded" style="height: 10px">
                    <div class="progress-bar bg-${newCasescolorDisplay}" style="width:${newCaseswidthDisplay}" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small>${newCases}</small>
                  <hr>
                  <p>Active Cases</p>
                  <div class="progress rounded" style="height: 10px">
                    <div class="progress-bar bg-${activeCasescolorDisplay}" style="width:${activeCaseswidthDisplay}" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small>${activeCases}</small>
                  <hr>
                  <p>Critical Cases</p>
                  <div class="progress rounded" style="height: 10px">
                    <div class="progress-bar bg-${criticalCasescolorDisplay}" style="width:${criticalCaseswidthDisplay}" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <small>${criticalCases}</small>
                  <hr>
                  <p>Recovered Cases</p>
                  <div class="progress rounded" style="height: 10px">
                    <div class="progress-bar bg-${recoveredCasescolorDisplay}" style="width:${recoveredCaseswidthDisplay}" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
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
        console.log(error);
        res.sendFile(__dirname + '/error.html');
      });
});
