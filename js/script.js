// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

// Milestone 1

// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0


// print all the days in the month of jenuary

// functions

function printCalendar(holidays, date) {

  $("h1").text(date.format("MMMM YYYY"));
  $("h1").attr("data-month", date.format("MM"));

  var source = $("#calendar__days-template").html();
  var template = Handlebars.compile(source);

  var numDays = date.daysInMonth();

  date.date(1);

  $(".calendar__days").html("");

  var dayOfWeek = date.day();
  var htmlLi = "<li class=\"calendar__day\"></li>";

  if (dayOfWeek == 0) {
    for (var i = 0; i < 6; i++) {
      $(".calendar__days").append(htmlLi);
    }
  } else if (dayOfWeek == 2) {
    $(".calendar__days").append(htmlLi);
  } else if (dayOfWeek == 3) {
    for (var i = 0; i < 2; i++) {
      $(".calendar__days").append(htmlLi);
    }
  } else if (dayOfWeek == 4) {
    for (var i = 0; i < 3; i++) {
      $(".calendar__days").append(htmlLi);
    }
  } else if (dayOfWeek == 5) {
    for (var i = 0; i < 4; i++) {
      $(".calendar__days").append(htmlLi);
    }
  } else if (dayOfWeek == 6) {
    for (var i = 0; i < 5; i++) {
      $(".calendar__days").append(htmlLi);
    }
  }

  for (var i = 0; i < numDays; i++) {
    var context = {
      "day": date.format('D'),
      "month": date.format('MMMM'),
      "DD": date.format("DD"),
      "MM": date.format("MM"),
      "YYYY": date.format("YYYY"),
    };
    var html = template(context);
    $(".calendar__days").append(html);

    if (date.format("DD") != numDays) {
      date.add(1, 'days');
    }
  }

  for (var i = 0; i < holidays.length; i++) {
    $(".calendar__day[data-date=\"" + holidays[i].date + "\"] .holiday").text(holidays[i].name).addClass("calendar__holiday");
  }
};

function getHolydays(date) {

  var month = date.get("month");
  var year = date.get("year");

  if (arrayMonths[month] == undefined) {
    $.ajax(
      {
        "url": "https://flynn.boolean.careers/exercises/api/holidays",
        "data": {
          "year": year,
          "month": month,
        },
        "method": "GET",
        "success": function (data, state) {
          arrayMonths[month] = data.response;
          console.log("sto facendo una chiamata AJAX per il mese " + (month + 1));
          printCalendar(data.response, date);
        },
        "error": function (request, state, errors) {
          alert("error");
        }
      }
    );
  } else {
    console.log("NON sto facendo una chiamata AJAX per il mese " + (month + 1) + " , ma lo sto prendendo dall'array in cui ho salvato le risposte del server!");
    printCalendar(arrayMonths[month], date);
  }


}


// script

var arrayMonths = [];

$(document).ready(function () {

  var date = moment("2018-01-01");

  getHolydays(date);

  $("#today").click(function () {

    date = moment().year("2018");
    getHolydays(date);

  });

  $("#prev").click(function () {
    if ($("h1").attr("data-month") == "01") {
      alert("errore!!! \nsi può navigare esclusivamente nel 2018");
    } else {
      date = date.subtract(1, "months");
      getHolydays(date);
    }
  });

  $("#next").click(function () {
    if ($("h1").attr("data-month") == "12") {
      alert("errore!!! \nsi può navigare esclusivamente nel 2018");
    } else {
      date = date.add(1, "months");
      getHolydays(date);
    }
  });

});
