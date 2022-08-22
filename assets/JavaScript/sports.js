// varibales
var resultContainer = document.getElementById("container-id");
var page = "0";
var nxtPrev = document.getElementById("next-prev");
var sportsPrev = document.getElementById("sports-prev");
var sportsNext = document.getElementById("sports-Next");
var userSearch = document.getElementById("sportSearch-btn");
var userInput = document.getElementById("music-input");

// the result card variables
var sportsResutlsWrapper = document.querySelector(".sports-results");
var sportsDateTime = document.querySelector(".date-time");
var venue = document.querySelectorAll (".venue-text");
var sportsTitle = document.querySelectorAll (".card-title");
var sportsLink = document.querySelectorAll(".website-link");
var sportsCardsResults = document.querySelectorAll(".results-card");
var sportsImg = document.querySelectorAll(".sports-img");

// brewery card variables
var brewsInput = document.getElementById("brews-input");
var brewsSearch = document.getElementById("brews-search");
var brewsName = document.querySelectorAll(".brews-name");
var brewsAddress = document.querySelectorAll(".brews-address");
var brewsUrl = document.querySelectorAll(".brews-url");
var brewsResults = document.querySelector(".brews-results");
var brewsPage = "1";
var brewsNextBtn = document.getElementById("brews-next");
var brewsPrevBtn = document.getElementById("brews-prev");
var brewsState = document.getElementById("sports-states");
var widget = document.getElementById("large-widgets");


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
                // Console loging the returned data so we can see what we need to get
                console.log(data)
                displayGenreResults(data);
            });
        }
    });
};


// search by sport and input function
function searchByInputAndSport(e) {
    e.preveentDefault();
    var selectedValue = $("medium").val();
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
                console.log(data)
                if (!data._embedded) {
                    swal({
                        title: "Ooops!",
                        text: "Sprry no events found!",
                        icon: "error",
                        button: "Try Again?",
                    });
                }
                displaySportsResults(data);
            });
        }
    });
}

//display sports results funciton 
function displayGenreResults(data) {
    var events = data._embedded.events;
    console.log(events);

    if (resultContainer.style.display == "none" && nxtPrev.style.display == "none") {
        resultsContainer.style.display = "flex";
        nextPrev.style.display = "flex";
        widget.style.display = "none";
    } 

    for (var i = 0; i < events.length; i++) {
        var sportsDate = events[i].dates.start.dateTime;
        var sportsReadableDate = new Date(sportsDate);
        sportsDateTime[i].textContent = sportsReadableDate.toDateString();
        sportsTitle[i].textContent = events[i].name;
        sportstLink[i].textContent = "Purchase Tickets Now";
        sportsLink[i].href = events[i].url;
        if (!events[i]._embedded.venues[0].city || !events[i]._embedded.venues[0].state) {
            venue[i].textContent = events[i]._embedded.venues[0].name;
        } else {
        venue[i].textContent = events[i]._embedded.venues[0].city.name + "," + " " + events[i]._embedded.venues[0].state.name;
        }
        sportsImg[i].setAttribute("style", "background: url(" + events[i].images[1].url + ");");
    }


        
    }

    


//sports next page 
var nextPage = function (event) {
    event.preveentDefault()
    if (page >= 0) {
        page ++;
        console.log(page);
        searchByGenre();
    }
}

//sports previous page
var prevPage = function () {
    if (page >= 1) {
        page--;
        searchBySport()
    } else {
        return;
    }
}

//get brewery API function 
var getBrews = function () {
    var brewsCity = brewsInput.value;
    var sportsState = brewsState.value;

    if (sportsState == true && brewsCity) {
        var brewsApi = "https://api.openbrewerydb.org/breweries?by_city="+brewsCity+"&by_state="+sportsState+"&per_page=3&page="+brewSportsPage; 
    } else {
        var brewsApi = "https://api.openbrewerydb.org/breweries?by_city="+brewsCity+"&per_page=3&page="+brewSportsPage;  
    };

    fetch(brewsApi, {
        method: "GET",
    })
    .then(function (res) {
        if (!res.ok) {
            alert(res.statusText)
        } else {
            return res.json().then(function (sportsBrews) {
                console.log(sportsBrews)
                if (sportsBrews.length == 0) {
                    swal("Sorry We Cannot Find Brewerys In That Area");
                    return;
                } else {
                displaySportsBrews(sportsBrews);
                };
            })
        }
    })
}

function displaySportsBrew(sportsBrews) {
    console.log(sportsBrews)
    if (brewsResults.style.display == "none") {
        brewsResults.style.display = "flex";
    };

    for (var i = 0; i < homeBrew.length; i++) {
        brewsName[i].textContent = sportsBrews[i].name;
        brewsAddress[i].textContent = sportsBrews[i].street;
        brewsAddress[i].href = "https://maps.google.com/?q=" + sportsBrews[i].street;
        brewsUrl[i].href = sportsBrew[i].website_url;
    };
}


// event listener for sports select menu
$("#medium").on("change", function() {
    searchBySport(page = "0");
});

//event listeners for pagination buttons 
/* musicNext.addEventListener("click", nextPage);
musicPrev.addEventListener("click", prevPage); */