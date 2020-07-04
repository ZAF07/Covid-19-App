const _ = require('lodash');
const axios = require('axios');


exports.getResults = async (country) => {
  const data = await axios({
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
      const today = new Date();
      return {
        continent : (data.data.response[0].continent),
        curCountry : (data.data.response[0].country),
        totalCases : (data.data.response[0].cases.total),
        population : (data.data.response[0].population),
        newCases : (data.data.response[0].cases.new),
        activeCases : (data.data.response[0].cases.active),
        recoveredCases : (data.data.response[0].cases.recovered),
        criticalCases : (data.data.response[0].cases.critical),
        newDeaths : (data.data.response[0].deaths.new),
        totalDeaths : (data.data.response[0].deaths.total),
        today : new Date(),
        day : (data.data.response[0].day),
        time : `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} hrs`
        
      }
}
