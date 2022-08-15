/*     variables    */




/*      fucntions       */
var searchByGenre = function () {
    var selectedValue = $("#small").val();
    if (selectedValue == "Rap/Hiphop") {
        var apiUrl =  "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAv1&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative") {
        var apiUrl =  "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAvv&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else if (selectedValue == "Country") {
       var apiUrl =  "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAv6&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq"
    } else {
    var apiUrl =  "https://app.ticketmaster.com/discovery/v2/events.json?&genreId=KnvZfZ7vAeA&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    };

    fetch(apiUrl, {
        method: "get",
    }
    )
    .then(function(response) {
        if(!response.ok) {
        alert(response.statustext)
        } else {
            return response.json().then(function(data) {
                // Console loging the returned data so we can see what we need to get
                console.log(data);
                displayGenreResults(data);
            });
        }
    })

    .catch(function(error) {
        alert(error);
    });
};

function displayGenreResults(data) {
    var resultsContainer = $(".results-container");
    for (var i = 0; i < data.length; i++) {
        var resultsCard = $("<div>");
        resultsCard.addClass("results-card")
        var eventTitle = $("<h4>");
        eventTitle.textContent = data[i]._embedded.events[i].name;
        eventTitle.addClass("card-title");
        resultsCard.append($eventTitle);
        resultsContainer.append($resultsCard);

    }
}


// Event Listener for genre select menu
$("#small").on("change", searchByGenre);