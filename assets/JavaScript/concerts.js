/*     variables    */
var resultsContainer = document.getElementById("container-id");



/*      fucntions       */
var searchByGenre = function () {
    var selectedValue = $("#small").val();
    if (selectedValue == "Rap/Hiphop") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&size=6genreId=KnvZfZ7vAv1&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&genreId=KnvZfZ7vAvv&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&genreId=KnvZfZ7vAv6&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=6&genreId=KnvZfZ7vAeA&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
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
                    /*  console.log(data); */
                    displayGenreResults(data);
                });
            }
        })
        .catch(function (error) {
            alert(error);
        });
};

var searchForArtistOrEvent = function () {
    var selectedValue = $("#small").val();
    /*  var userInput = $("#search-btn"); */
    if (selectedValue == "Rap/Hiphop") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAv1&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAvv&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country") {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAv6&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAeA&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
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
                    console.log(data);
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

        var resultsCard = document.createElement("div");
        resultsCard.classList.add("results-card");

        var dateTime = document.createElement("h4");
        dateTime.textContent = events[i].dates.start.localDate + " " + events[i].dates.start.localTime;
        dateTime.classList.add("date-time");

        var eventTitle = document.createElement("h2");
        eventTitle.textContent = events[i].name; 
        eventTitle.classList.add("card-title");

        var eventLink = document.createElement("a");
        eventLink.textContent = "Purchase Tickets Now";
        eventLink.classList.add("website-link");
        eventLink.setAttribute("target", "_blank");
        eventLink.href = events[i].url;

        /* var backgroundImage = events[i].images[0].url; */

        resultsCard.appendChild(dateTime);
        resultsCard.appendChild(eventTitle);
        resultsCard.appendChild(eventLink);
        resultsCard.style.background = "url("+events[i].images[1].url+")";
        resultsContainer.appendChild(resultsCard);


    }
};



// Event Listener for genre select menu
$("#small").on("change", searchByGenre);
