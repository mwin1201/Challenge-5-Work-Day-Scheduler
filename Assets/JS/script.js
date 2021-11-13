// write current date to the Scheduler page
$("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));

// object to contain all of the workday events
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

// determines the color or hour blocks by assigning 'present', 'past', and 'future' classes
var timeOfDay = function() {
    var currentHour = moment().hour();
    var textAreaEl = document.querySelectorAll("textarea");
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
};

// saves events to LocalStorage
var saveEvents = function(hour, text) {
    var keepCurrentStorage = checkLocalStorage();
    // if LocalStorage is empty then right into it
    if (!keepCurrentStorage) {
        dailyEvents[hour] = text;
        localStorage.setItem("Scheduler", JSON.stringify(dailyEvents));
    }
    // if LocalStorage is not empty AND the date property equals today's date then extract the data and append events to it
    else {
        var schedule = JSON.parse(localStorage.getItem("Scheduler"));
        schedule[hour] = text;
        localStorage.setItem("Scheduler", JSON.stringify(schedule));
    }
};

// checks to see if anything is in LocalStorage and if there is then it checks the date for the data
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

// loads events saved in LocalStorage as long as something exists and the date matches today's
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

// when a save button is clicked it saves the data if event exists
$(".saveBtn").click(function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).parent().children("textarea").val();
    if (!text) {
        alert("You cannot save an empty event. Please enter something.");
    }
    saveEvents(hour, text);
    // trigger a little icon indicating to the user their information saved
    $("#save-confirmation").html('<span class="oi oi-thumb-up">Saved to LocalStorage</span>');
    
    // remove saved indicator after 1 second
    setInterval(function() {
        $("#save-confirmation").html("");
    }, 1000);
});

timeOfDay();
setInterval(timeOfDay, (1000 * 60));
loadEvents();