// write current date to the Scheduler page
$("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));
var workHoursArr = [9,10,11,12,13,14,15,16,17];

var timeOfDay = function() {
    var currentHour = moment().hour();
    var textAreaEl = document.querySelectorAll("textarea");
    //setInterval(function() {
        for (var i = 0; i < textAreaEl.length; i++) {
            if (parseInt(textAreaEl[i].getAttribute("data-hour")) > currentHour) {
                textAreaEl[i].classList.add("future");
            }
            else if (parseInt(textAreaEl[i].getAttribute("data-hour")) < currentHour) {
                textAreaEl[i].classList.add("past");
            }
            else {
                textAreaEl[i].classList.add("present");
            }
        }
        // run the interval loop every minute
   // }, (1000 * 60));
};

timeOfDay();
setInterval(timeOfDay, 1000);