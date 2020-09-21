// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

// Milestone 1

// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0


// print all the days in the month of jenuary

function printCalendar(holidays, date) {

  $("h1").text(date.format("MMMM YYYY"));

  var source = $("#calendar__days-template").html();
  var template = Handlebars.compile(source);

  var numDays = date.daysInMonth();

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

    date.add(1, 'days');
  }

  for (var i = 0; i < holidays.length; i++) {
    $(".calendar__day[data-date=\"" + holidays[i].date + "\"] .calendar__holiday").text(holidays[i].name);
    $(".calendar__day[data-date=\"" + holidays[i].date + "\"]").addClass("holiday");
  }
};

function getHolydays(date) {

  var month = date.get("month");
  var year = date.get("year");

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": year,
        "month": month,
      },
      "method": "GET",
      "success": function (data, state) {
        printCalendar(data.response, date);
      },
      "error": function (request, state, errors) {
        alert("error");
      }
    }
  );
}


$(document).ready(function () {

  var date = moment("2018-01-01");

  getHolydays(date);





});
