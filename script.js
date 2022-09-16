$(document).ready(function() {

  const Key = '46aba5b9bf9c9fb891f0c9848157f5edf0ebd6bd73a5212a8e53a249fc99cb3b'
  WEATHER = {
      0: "Soleil",
      1: "Peu nuageux",
      2: "Ciel voilé",
      3: "Nuageux",
      4: "Très nuageux",
      5: "Couvert",
      6: "Brouillard",
      7: "Brouillard givrant",
      10: "Pluie faible",
      11: "Pluie modérée",
      12: "Pluie forte",
      13: "Pluie faible verglaçante",
      14: "Pluie modérée verglaçante",
      15: "Pluie forte verglaçante",
      16: "Bruine",
      20: "Neige faible",
      21: "Neige modérée",
      22: "Neige forte",
      30: "Pluie et neige mêlées faibles",
      31: "Pluie et neige mêlées modérées",
      32: "Pluie et neige mêlées fortes",
      40: "Averses de pluie locales et faibles",
      41: "Averses de pluie locales",
      42: "Averses locales et fortes",
      43: "Averses de pluie faibles",
      44: "Averses de pluie",
      45: "Averses de pluie fortes",
      46: "Averses de pluie faibles et fréquentes",
      47: "Averses de pluie fréquentes",
      48: "Averses de pluie fortes et fréquentes",
      60: "Averses de neige localisées et faibles",
      61: "Averses de neige localisées",
      62: "Averses de neige localisées et fortes",
      63: "Averses de neige faibles",
      64: "Averses de neige",
      65: "Averses de neige fortes",
      66: "Averses de neige faibles et fréquentes",
      67: "Averses de neige fréquentes",
      68: "Averses de neige fortes et fréquentes",
      70: "Averses de pluie et neige mêlées localisées et faibles",
      71: "Averses de pluie et neige mêlées localisées",
      72: "Averses de pluie et neige mêlées localisées et fortes",
      73: "Averses de pluie et neige mêlées faibles",
      74: "Averses de pluie et neige mêlées",
      75: "Averses de pluie et neige mêlées fortes",
      76: "Averses de pluie et neige mêlées faibles et nombreuses",
      77: "Averses de pluie et neige mêlées fréquentes",
      78: "Averses de pluie et neige mêlées fortes et fréquentes",
      100: "Orages faibles et locaux",
      101: "Orages locaux",
      102: "Orages fort et locaux",
      103: "Orages faibles",
      104: "Orages",
      105: "Orages forts",
      106: "Orages faibles et fréquents",
      107: "Orages fréquents",
      108: "Orages forts et fréquents",
      120: "Orages faibles et locaux de neige ou grésil",
      121: "Orages locaux de neige ou grésil",
      122: "Orages locaux de neige ou grésil",
      123: "Orages faibles de neige ou grésil",
      124: "Orages de neige ou grésil",
      125: "Orages de neige ou grésil",
      126: "Orages faibles et fréquents de neige ou grésil",
      127: "Orages fréquents de neige ou grésil",
      128: "Orages fréquents de neige ou grésil",
      130: "Orages faibles et locaux de pluie et neige mêlées ou grésil",
      131: "Orages locaux de pluie et neige mêlées ou grésil",
      132: "Orages fort et locaux de pluie et neige mêlées ou grésil",
      133: "Orages faibles de pluie et neige mêlées ou grésil",
      134: "Orages de pluie et neige mêlées ou grésil",
      135: "Orages forts de pluie et neige mêlées ou grésil",
      136: "Orages faibles et fréquents de pluie et neige mêlées ou grésil",
      137: "Orages fréquents de pluie et neige mêlées ou grésil",
      138: "Orages forts et fréquents de pluie et neige mêlées ou grésil",
      140: "Pluies orageuses",
      141: "Pluie et neige mêlées à caractère orageux",
      142: "Neige à caractère orageux",
      210: "Pluie faible intermittente",
      211: "Pluie modérée intermittente",
      212: "Pluie forte intermittente",
      220: "Neige faible intermittente",
      221: "Neige modérée intermittente",
      222: "Neige forte intermittente",
      230: "Pluie et neige mêlées",
      231: "Pluie et neige mêlées",
      232: "Pluie et neige mêlées",
      235: "Averses de grêle",
  }

  let input = $('#input')
  $("#error").hide();
  $('#loading').hide()

  //These 2 actions make a call to the API service with fetch
  input.on('keyup', function(e) {
      if (e.key === "Enter") {
          $('#btn').click()
      }
  })
  $('#btn').click(function(e) {
      $('#hide').hide()
      let lieu = $('#input').val();
      fetch(`https://api.meteo-concept.com/api/location/cities?token=${Key}&search=${lieu}`)
          .then(res => {
              $('#loading').show()
              if (res.ok) {
                  res.json().then(data => {
                      $("#error").hide();
                      let dataCity = data.cities[0].name
                      let insee = data.cities[0].insee
                      fetch(`https://api.meteo-concept.com/api/forecast/daily?token=${Key}&insee=${insee}`)
                          .then(res => {
                              if (res.ok) {
                                  res.json().then(data => {
                                      console.log(data);
                                      let tMax = data.forecast[0].tmax
                                      let tMin = data.forecast[0].tmin

                                      $('#tempMin').html('<i class="fas fa-temperature-low"></i> ' + tMin + '.0°C min');
                                      $('#tempMax').html('<i class="fas fa-temperature-high"></i> ' + tMax + '.0°C max');
                                  })
                              }
                          })
                      fetch(`https://api.meteo-concept.com/api/forecast/daily/periods?token=${Key}&insee=${insee}`)
                          .then(response => {
                              if (response.ok) {
                                  response.json().then(data => {
                                      const date = new Date();
                                      let actualTemp = data.forecast[0][2].temp2m
                                      let actualWind = data.forecast[0][2].wind10m
                                      let indexWeather = data.forecast[0][2].weather
                                      let actualDate = date.toLocaleDateString('fr-FR', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                          weekday: 'long'
                                      })
                                      const currentHour = date.toLocaleString('fr-FR', {
                                          hour: 'numeric',
                                          minute: 'numeric'
                                      })
                                      $('#clock').text(currentHour)
                                      $('#city').html('' + dataCity);
                                      $('#temperature').text(actualTemp + '.0°C');
                                      $('#wind').html('<i class="fa-solid fa-wind"></i> ' + actualWind + '.0 km/h');
                                      $('#date').text(actualDate);
                                      $('#weatherTime').text(WEATHER[indexWeather]);

                                      const meteoTime = []
                                      const indexWeathers = []
                                      const dateNextDay = []
                                      for (let i = 1; i < 4; i++) {
                                          meteoTime.push(data.forecast[i][2].temp2m)
                                          indexWeathers.push(data.forecast[i][2].weather)
                                          dateNextDay.push(data.forecast[i][2].datetime)
                                      }

                                      const options = {
                                          weekday: 'long'
                                      };

                                      for (let index = 0; index < meteoTime.length; index++) {
                                          $('#next' + [index + 1] + 'Day').text(meteoTime[index] + '.0°C')
                                          $('#wheatherNext' + [index + 1] + 'Day').text(WEATHER[indexWeathers[index]]);
                                          $('#dateNext' + [index + 1] + 'Day').text(new Date(dateNextDay[index]).toLocaleDateString("fr-FR", options))
                                      }

                                      //These conditions modify the images according to the weather

                                      const imgPrincipal = document.getElementById('imgPrincipal')

                                      if (indexWeather == 0) {
                                          imgPrincipal.src = "img/day.svg";
                                      } else if (indexWeather >= 1 && indexWeather <= 5) {
                                          imgPrincipal.src = "img/cloudy-day-1.svg";
                                      } else if (indexWeather >= 10 && indexWeather <= 15 || indexWeather >= 30 && indexWeather <= 48 || indexWeather >= 70 && indexWeather <= 78 || indexWeather == 140 || indexWeather == 141 || indexWeather == 210 || indexWeather == 211 || indexWeather == 212 || indexWeather == 230 || indexWeather == 231 || indexWeather == 232) {
                                          imgPrincipal.src = "img/rainy-5.svg";
                                      } else if (indexWeather >= 60 && indexWeather <= 68 || indexWeather == 20 || indexWeather == 21 || indexWeather == 22 || indexWeather == 142 || indexWeather == 220 || indexWeather == 221 || indexWeather == 222) {
                                          imgPrincipal.src = "img/snowy-5.svg";
                                      } else if (indexWeather >= 100 && indexWeather <= 138) {
                                          imgPrincipal.src = "img/thunder.svg";
                                      } else {
                                          imgPrincipal.src = "img/day.svg";
                                      }

                                      const imgNextDay = document.getElementById('imgNextDay')

                                      if (indexWeathers[0] == 0) {
                                          imgNextDay.src = "img/day.svg";
                                      } else if (indexWeathers[0] >= 1 && indexWeathers[0] <= 5) {
                                          imgNextDay.src = "img/cloudy-day-1.svg";
                                      } else if (indexWeathers[0] >= 10 && indexWeathers[0] <= 15 || indexWeathers[0] >= 30 && indexWeathers[0] <= 48 || indexWeathers[0] >= 70 && indexWeathers[0] <= 78 || indexWeathers[0] == 140 || indexWeathers[0] == 141 || indexWeathers[0] == 210 || indexWeathers[0] == 211 || indexWeathers[0] == 212 || indexWeathers[0] == 230 || indexWeathers[0] == 231 || indexWeathers[0] == 232) {
                                          imgNextDay.src = "img/rainy-5.svg";
                                      } else if (indexWeathers[0] >= 60 && indexWeathers[0] <= 68 || indexWeathers[0] == 20 || indexWeathers[0] == 21 || indexWeathers[0] == 22 || indexWeathers[0] == 142 || indexWeathers[0] == 220 || indexWeathers[0] == 221 || indexWeathers[0] == 222) {
                                          imgNextDay.src = "img/snowy-5.svg";
                                      } else if (indexWeathers[0] >= 100 && indexWeathers[0] <= 138) {
                                          imgNextDay.src = "img/thunder.svg";
                                      } else {
                                          imgNextDay.src = "img/day.svg";
                                      }

                                      const imgNext2Day = document.getElementById('imgNext2Day')

                                      if (indexWeathers[1] == 0) {
                                          imgNext2Day.src = "img/day.svg";
                                      } else if (indexWeathers[1] >= 1 && indexWeathers[1] <= 5) {
                                          imgNext2Day.src = "img/cloudy-day-1.svg";
                                      } else if (indexWeathers[1] >= 10 && indexWeathers[1] <= 15 || indexWeathers[1] >= 30 && indexWeathers[1] <= 48 || indexWeathers[1] >= 70 && indexWeathers[1] <= 78 || indexWeathers[1] == 140 || indexWeathers[1] == 141 || indexWeathers[1] == 210 || indexWeathers[1] == 211 || indexWeathers[1] == 212 || indexWeathers[1] == 230 || indexWeathers[1] == 231 || indexWeathers[1] == 232) {
                                          imgNext2Day.src = "img/rainy-5.svg";
                                      } else if (indexWeathers[1] >= 60 && indexWeathers[1] <= 68 || indexWeathers[1] == 20 || indexWeathers[1] == 21 || indexWeathers[1] == 22 || indexWeathers[1] == 142 || indexWeathers[1] == 220 || indexWeathers[1] == 221 || indexWeathers[1] == 222) {
                                          imgNext2Day.src = "img/snowy-5.svg";
                                      } else if (indexWeathers[1] >= 100 && indexWeathers[1] <= 138) {
                                          imgNext2Day.src = "img/thunder.svg";
                                      } else {
                                          imgNext2Day.src = "img/day.svg";
                                      }

                                      const imgNext3Day = document.getElementById('imgNext3Day')

                                      if (indexWeathers[2] == 0) {
                                          imgNext3Day.src = "img/day.svg";
                                      } else if (indexWeathers[2] >= 1 && indexWeathers[2] <= 5) {
                                          imgNext3Day.src = "img/cloudy-day-1.svg";
                                      } else if (indexWeathers[2] >= 10 && indexWeathers[2] <= 15 || indexWeathers[2] >= 30 && indexWeathers[2] <= 48 || indexWeathers[2] >= 70 && indexWeathers[2] <= 78 || indexWeathers[2] == 140 || indexWeathers[2] == 141 || indexWeathers[2] == 210 || indexWeathers[2] == 211 || indexWeathers[2] == 212 || indexWeathers[2] == 230 || indexWeathers[2] == 231 || indexWeathers[2] == 232) {
                                          imgNext3Day.src = "img/rainy-5.svg";
                                      } else if (indexWeathers[2] >= 60 && indexWeathers[2] <= 68 || indexWeathers[2] == 20 || indexWeathers[2] == 21 || indexWeathers[2] == 22 || indexWeathers[2] == 142 || indexWeathers[2] == 220 || indexWeathers[2] == 221 || indexWeathers[2] == 222) {
                                          imgNext3Day.src = "img/snowy-5.svg";
                                      } else if (indexWeathers[2] >= 100 && indexWeathers[2] <= 138) {
                                          imgNext3Day.src = "img/thunder.svg";
                                      } else {
                                          imgNext3Day.src = "img/day.svg";
                                      }

                                      $('#loading').hide()
                                  })

                              }
                          })
                  }).catch(err => {
                      $("#error").show()
                      $('#loading').hide()

                  })
              }
          })
  });
})


