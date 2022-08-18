/*     variables    */
var resultsContainer = document.getElementById("container-id");
var page = "0";
var nextPrev = document.getElementById("next-prev");
var musicPrev = document.getElementById("music-prev");
var musicNext = document.getElementById("music-next");
var userSearch = document.getElementById("musicSearch-btn");
var userInput = document.getElementById("music-input");

// Results Card Variables
var musicResultsWrapper = document.querySelector(".music-results");
var concertDateTime = document.querySelectorAll(".date-time");
var concertTitle = document.querySelectorAll(".card-title");
var concertLink = document.querySelectorAll(".website-link");
var venue = document.querySelectorAll(".venue-text");
var musicCardResults = document.querySelectorAll(".results-card");


/*      fucntions       */
// Search by Genre Function
var searchByGenre = function () {
    var selectedValue = $("#small").val();
    if (selectedValue == "Rap/Hiphop") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&size=8&page=" + page + "&totalPages&genreId=KnvZfZ7vAv1&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&totalPages&genreId=KnvZfZ7vAvv&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&totalPages&genreId=KnvZfZ7vAv6&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&totalPages&genreId=KnvZfZ7vAeA&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
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

// Display Concert Results Function
function displayGenreResults(data) {
    var events = data._embedded.events;
    console.log(events);

    if (resultsContainer.style.display == "none") {
        resultsContainer.style.display = "flex";
    } 

    for (var i = 0; i < events.length; i++) {
        var concertDate = events[i].dates.start.dateTime;
        var concertReadableDate = new Date(concertDate);
        concertDateTime[i].textContent = concertReadableDate.toDateString();
        concertTitle[i].textContent = events[i].name;
        concertLink[i].textContent = "Purchase Tickets Now";
        concertLink[i].href = events[i].url;
        venue[i].textContent = events[i]._embedded.venues[0].city.name + "," + " " + events[i]._embedded.venues[0].state.name;
        musicCardResults[i].setAttribute("style", "background: url(" + events[i].images[1].url + ");");
    }

};

// Search by Genre and Input Function
function searchByInputAndGenre(e) {
    e.preventDefault();
    var selectedValue = $("#small").val();
    var musicInput = userInput.value;
    if (selectedValue == "Rap/Hiphop" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&size=8&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAvv&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAv6&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAeA&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    };

    fetch(apiUrl)
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
        .catch(function () {
            alert("No Events Found");
        });
}


// Concert Pagination Next Page
var nextPage = function (event) {
    event.preventDefault()
    if (page >= 0) {
        page++;
        console.log(page);
        searchByGenre();
    }
}

// Concert Pagination Previous Page
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

// Event Listener for search button
userSearch.addEventListener("click", searchByInputAndGenre);

// Event Listeners for Pagination buttons
musicNext.addEventListener("click", nextPage);
musicPrev.addEventListener("click", prevPage);