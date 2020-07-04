const apiController = require('../models/apiModel');


exports.showData = async (req,res) => {
  const country = req.body.country;
  const data = await apiController.getResults(country)
  .then(data => {
    console.log(data.totalDeaths);
    if (country) {
      country.toUpperCase();
    }
    let widthDisplay;
    let colorDisplay;
    if (data.totalDeaths > 10000) {
      widthDisplay = '100%';
      colorDisplay = 'danger'
    } else if (data.totalDeaths >= 5000 && data.totalDeaths < 10000) {
      widthDisplay = '75%';
      colorDisplay = 'warning';
    } else if (data.totalDeaths >= 500 && data.totalDeaths < 5000) {
      widthDisplay = '45%';
      colorDisplay = 'warning';
    } else if (data.totalDeaths > 10 && data.totalDeaths < 500) {
      widthDisplay = '25%';
      colorDisplay = 'success';
    } else if (data.totalDeaths > 0 && data.totalDeaths < 10) {
      widthDisplay = '10%';
      colorDisplay = 'success';
    } else {
      widthDisplay = '0%';
      colorDisplay = 'info';
    };

    let recentwidthDisplay;
    let recentcolorDisplay;
    if (data.newDeaths >= 10000) {
      recentwidthDisplay = '100%';
      recentcolorDisplay = 'danger'
    } else if (data.newDeaths >= 5000 && data.newDeaths < 10000) {
      recentwidthDisplay = '75%';
      recentcolorDisplay = 'warning';
    } else if (data.newDeaths >= 500 && data.newDeaths < 5000) {
      recentwidthDisplay = '45%';
      recentcolorDisplay = 'warning';
    } else if (data.newDeaths > 10 && data.newDeaths < 500) {
      recentwidthDisplay = '25%';
      recentcolorDisplay = 'success';
    } else if (data.newDeaths > 0 && data.newDeaths < 10) {
      recentwidthDisplay = '10%';
      recentcolorDisplay = 'success';
    } else if (data.newDeaths == 'null' || data.newDeaths == 0) {
      recentwidthDisplay = '0%';
      recentcolorDisplay = 'info';
    };

    let newCaseswidthDisplay;
    let newCasescolorDisplay;
    if (data.newCases >= 10000) {
      newCaseswidthDisplay = '100%';
      newCasescolorDisplay = 'danger'
    } else if (data.newCases >= 5000 && data.newCases < 10000) {
      newCaseswidthDisplay = '75%';
      newCasescolorDisplay = 'danger';
    } else if (data.newCases >= 500 && data.newCases < 5000) {
      newCaseswidthDisplay = '45%';
      newCasescolorDisplay = 'danger';
    } else if (data.newCases > 10 && data.newCases < 500) {
      newCaseswidthDisplay = '25%';
      newCasescolorDisplay = 'warning';
    } else if (data.newCases > 0 && data.newCases < 10) {
      newCaseswidthDisplay = '10%';
      newCasescolorDisplay = 'success';
    } else if (data.newCases == 'null' || data.newCases == 0) {
      newCaseswidthDisplay = '0%';
      newCasescolorDisplay = 'info';
    };

    let activeCaseswidthDisplay;
    let activeCasescolorDisplay;
    if (data.activeCases > 10000) {
      activeCaseswidthDisplay = '100%';
      activeCasescolorDisplay = 'danger'
    } else if (data.activeCases >= 5000 && data.activeCases < 10000) {
      activeCaseswidthDisplay = '75%';
      activeCasescolorDisplay = 'danger';
    } else if (data.activeCases >= 500 && data.activeCases < 5000) {
      activeCaseswidthDisplay = '45%';
      activeCasescolorDisplay = 'warning';
    } else if (data.activeCases > 10 && data.activeCases < 500) {
      activeCaseswidthDisplay = '25%';
      activeCasescolorDisplay = 'success';
    } else if (data.activeCases > 0 && data.activeCases < 10) {
      activeCaseswidthDisplay = '10%';
      activeCasescolorDisplay = 'success';
    } else {
      activeCaseswidthDisplay = '0%';
      activeCasescolorDisplay = 'info';
    };

    let criticalCaseswidthDisplay;
    let criticalCasescolorDisplay;
    if (data.criticalCases > 10000) {
      criticalCaseswidthDisplay = '100%';
      criticalCasescolorDisplay = 'danger'
    } else if (data.criticalCases >= 5000 && data.criticalCases < 10000) {
      criticalCaseswidthDisplay = '75%';
      criticalCasescolorDisplay = 'warning';
    } else if (data.criticalCases >= 500 && data.criticalCases < 5000) {
      criticalCaseswidthDisplay = '45%';
      criticalCasescolorDisplay = 'warning';
    } else if (data.criticalCases > 10 && data.criticalCases < 500) {
      criticalCaseswidthDisplay = '25%';
      criticalCasescolorDisplay = 'success';
    } else if (data.criticalCases > 0 && data.criticalCases < 10) {
      criticalCaseswidthDisplay = '10%';
      criticalCasescolorDisplay = 'success';
    } else {
      criticalCaseswidthDisplay = '0%';
      criticalCasescolorDisplay = 'info';
    };

    let recoveredCaseswidthDisplay;
    let recoveredCasescolorDisplay;
    if (data.recoveredCases > 10000) {
      recoveredCaseswidthDisplay = '100%';
      recoveredCasescolorDisplay = 'success'
    } else if (data.recoveredCases >= 5000 && data.recoveredCases < 10000) {
      recoveredCaseswidthDisplay = '75%';
      recoveredCasescolorDisplay = 'success';
    } else if (data.recoveredCases >= 500 && data.recoveredCases < 5000) {
      recoveredCaseswidthDisplay = '45%';
      recoveredCasescolorDisplay = 'success';
    } else if (data.recoveredCases > 10 && data.recoveredCases < 500) {
      recoveredCaseswidthDisplay = '25%';
      recoveredCasescolorDisplay = 'success';
    } else if (data.recoveredCases > 0 && data.recoveredCases < 10) {
      recoveredCaseswidthDisplay = '10%';
      recoveredCasescolorDisplay = 'success';
    } else {
      recoveredCaseswidthDisplay = '0%';
      recoveredCasescolorDisplay = 'info';
    };
    res.render('show', {
      day: data.day,
      time: data.time,
      recoveredCaseswidthDisplay: recoveredCaseswidthDisplay,
      recoveredCasescolorDisplay: recoveredCasescolorDisplay,
      criticalCaseswidthDisplay: criticalCaseswidthDisplay,
      criticalCasescolorDisplay: criticalCasescolorDisplay,
      activeCaseswidthDisplay: activeCaseswidthDisplay,
      activeCasescolorDisplay: activeCasescolorDisplay,
      newCaseswidthDisplay: newCaseswidthDisplay,
      newCasescolorDisplay: newCasescolorDisplay,
      recentwidthDisplay: recentwidthDisplay,
      recentcolorDisplay: recentcolorDisplay,
      widthDisplay: widthDisplay,
      colorDisplay: colorDisplay,
      curCountry: data.curCountry,
      totalCases: data.totalCases,
      population: data.population,
      newCases: data.newCases,
      activeCases: data.activeCases,
      recoveredCases: data.recoveredCases,
      criticalCases: data.criticalCases,
      newDeaths: data.newDeaths,
      totalDeaths: data.totalDeaths,
      continent: data.continent

    })
  })
}
