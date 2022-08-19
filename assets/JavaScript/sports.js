// varibales
var page = "0";
var nextPrev = document.getElementById("next-prev");
var userSearch = document.getElementById("sportSearch-btn");
var userInput = document.getElementById("music-input");

// the result car variables
var sportsResutlsWrapper = document.querySelector(".sports-results");
var sportsDateTime = document.querySelector(".date-time");
var venue = document.querySelectorAll (".venue-text");
var sportsTitle = document.querySelectorAll (".card-title");
var sportsLink = document.querySelectorAll(".website-link");
var sportsCardsResults = document.querySelectorAll(".restults-results");



// functions
//search by sport function
var searchBySport = function () {
    var selectedValue = $("#medium").val();
    if (selectedValue ) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword="+selectedValue+"&page=" + page + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } 
//keyword="+selectedValue+"


    fetch(apiUrl, {
        method: "get", 
    }
    )
        .then(function (response) {
            if (!response.ok) {
                alert(response.statustext)
            } else {
                return response.json().then(function (data) {
                    console.log(data)
                    displaySportsResults(data);
                });
            }
        })
};

//display sports results funciton 
function displaySportsResults(data) {
    var events = data._embedded.events;
    console.log(events);
    if (sportsCards.style.display == "none") {
        sportsCards.style.display = "flex" ;
    }
    for (var i= 0; i< events.length; i++ ) {
        venue[i].textContent = events[i]._embedded.venues[0].name;
        sportsTitle[i].textContent = events[i].name;
        sportsLink[i].textContent = "Purchase Tickets Now";
        sportsLink[i].textContent = events[i].url;

        
    }

    
}



// search by sport and input function
function searchByInputAndSport(e) {
    e.preveentDefault();
    var selectedValue = $("small").val();
    var SportsInput = userInput.value; 
    if (selectedValue == "Football" && sportsInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + sportsInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Baseball" && sportsInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + sportsInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Basketball" && sportsInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + sportsInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Hockey" && sportsInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + sportsInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Soccer" && sportsInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + sportsInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    };

    fetch(apitUrl)
    .then(function (response) {
        if (!response.ok) {
            alert(response.statustext)
        } else {
            return response.json().then(function (data) {
                displaySportsResults(data);
            })
        }
    })
    .catch(function () {
        alert("no evnets found");
    });
}

//next page 
var nextPage = function (event) {
    event.preveentDefault()
    if (page >= 0) {
        page ++;
        console.log(page);
        searchByGenre();
    }
}

//previous page
var prevPage = function () {
    if (page >= 1) {
        page--;
        searchBySport()
    } else {
        return;
    }
}

// event listener for sports select menu
$("#medium").on("change", function() {
    searchBySport(page = "0");
});

//event listeners for pagination buttons 
/* musicNext.addEventListener("click", nextPage);
musicPrev.addEventListener("click", prevPage); */