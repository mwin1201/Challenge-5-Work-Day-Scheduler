// write current date to the Scheduler page
$("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));
var dailyEvents = {
    date: moment().format('dddd, MMMM Do YYYY'),
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: ""
};

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
        console.log("1 minute");
        // run the interval loop every minute
   // }, (1000 * 60));
};

var saveEvents = function(hour, text) {
    var keepCurrentStorage = checkLocalStorage();
    if (!keepCurrentStorage) {
        dailyEvents[hour] = text;
        localStorage.setItem("Scheduler", JSON.stringify(dailyEvents));
    }
    else {
        var schedule = JSON.parse(localStorage.getItem("Scheduler"));
        schedule[hour] = text;
        localStorage.setItem("Scheduler", JSON.stringify(schedule));
    }
};

var checkLocalStorage = function() {
    var schedule = JSON.parse(localStorage.getItem("Scheduler"));
    if (!schedule) {
        return false;
    }
    else if (schedule.date !== dailyEvents.date) {
        return false;
    }
    else {
        return true;
    }
};

var loadEvents = function() {
    var schedule = JSON.parse(localStorage.getItem("Scheduler"));
    if (schedule) {
        if (schedule.date === moment().format('dddd, MMMM Do YYYY')) {
            for (var i = 9; i < 18; i++) {
                $("#" + i).children("textarea").val(schedule[i]);
            }
        }
    }
};

$(".saveBtn").click(function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).parent().children("textarea").val();
    if (!text) {
        alert("You cannot save an empty event. Please enter something.");
    }
    saveEvents(hour, text);
});

timeOfDay();
setInterval(timeOfDay, (1000 * 60));
loadEvents();