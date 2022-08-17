/*     variables    */
var resultsContainer = document.getElementById("container-id");
var page = "0";
var nextPrev = document.getElementById("next-prev");
var musicPrev = document.getElementById("music-prev");
var musicNext = document.getElementById("music-next");
var userSearch = document.getElementById("search-btn");
var userInput = document.getElementById("music-input");

// Results Card Variables
var concertDateTime = document.querySelectorAll(".date-time");
var concertTitle = document.querySelectorAll(".card-title");
var concertLink = document.querySelectorAll(".website-link");
var venue = document.querySelectorAll(".venue-text");
var musicCardResults = document.querySelectorAll(".results-card");


/*      fucntions       */
var searchByGenre = function () {
    var selectedValue = $("#small").val();
    if (selectedValue == "Rap/Hiphop") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&size=6&page=" + page + "&totalPages&genreId=KnvZfZ7vAv1&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&page=" + page + "&totalPages&genreId=KnvZfZ7vAvv&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&page=" + page + "&totalPages&genreId=KnvZfZ7vAv6&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&page=" + page + "&totalPages&genreId=KnvZfZ7vAeA&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    };

    fetch(apiUrl, {
        method: "get",
    }
    )
        .then(function (response) {
            if (!response.ok) {
                alert(response.statustext)
            } else {
                return response.json().then(function (data) {
                    // Console loging the returned data so we can see what we need to get
                    console.log(data)
                    displayGenreResults(data);
                });
            }
        })
        .catch(function (error) {
            alert(error);
        });
};

function searchByInput(Event) {
    Event.preventDefault();
    var selectedValue = $("#small").val();
    var musicInput = userInput.value /* $("#music-input").val(); */
    if (selectedValue == "Rap/Hiphop" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&size=6&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&page=" + page + "&genreId=KnvZfZ7vAvv&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&page=" + page + "&genreId=KnvZfZ7vAv6&keyword" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&page=" + page + "&genreId=KnvZfZ7vAeA&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    };



    fetch(apiUrl, {
        method: "POST",
    }
    )
        .then(function (response) {
            if (!response.ok) {
                alert(response.statustext)
            } else {
                return response.json().then(function (data) {
                    // Console loging the returned data so we can see what we need to get
                    displayGenreResults(data);
                });
            }
        })
        .catch(function (error) {
            alert(error);
        });
}

function displayGenreResults(data) {
    var events = data._embedded.events;
    console.log(events);

    for (var i = 0; i < events.length; i++) {
        var concertDate = events[i].dates.start.dateTime;
        var concertReadableDate = new Date(concertDate);
        concertDateTime[i].textContent = concertReadableDate.toDateString();
        concertTitle[i].textContent = events[i].name;
        concertLink[i].textContent = "Purchase Tickets Now";
        concertLink[i].href = events[i].url;
        venue[i].textContent = events[i]._embedded.venues[0].city.name + "," + " " + events[i]._embedded.venues[0].state.name;
        musicCardResults[i].setAttribute("style", "background: url(" + events[i].images[1].url + ")");
    }

};

var nextPage = function () {
    if (page >= 0) {
        page++;
        console.log(page);
        searchByGenre();
    }
}

var prevPage = function () {
    if (page >= 1) {
        page--;
        searchByGenre();
    } else {
        return;
    }
}

// Event Listener for genre select menu
$("#small").on("change", function() {
    searchByGenre(page = "0");
});

userSearch.addEventListener("click", function (Event) {
    Event.preventDefault();
    searchByInput();
});

musicNext.addEventListener("click", nextPage);

musicPrev.addEventListener("click", prevPage);