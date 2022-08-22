/*               Variables               */
var searchInput = $("#default-search");
var eventImg = document.querySelectorAll(".event-img");
var eventTitle = document.querySelectorAll(".event-title");
var venueName = document.querySelectorAll(".venue-name");
var eventDate = document.querySelectorAll(".date-time-home");
var eventLink = document.querySelectorAll(".event-link");
var homepageContainer = document.querySelector(".homepage-container");
var homeWidget = document.getElementById("wid-div");
var homePage = 0;
var homePrev = document.getElementById("home-prev");
var homeNext = document.getElementById("home-next");

// Brewery Variables
var brewInput = document.getElementById("brew-input");
var brewSearch = document.getElementById("brew-search");
var brewState = document.getElementById("home-states")
var brewResults = document.querySelector(".brew-results");
var brewName = document.querySelectorAll(".brew-name");
var brewAddress =  document.querySelectorAll(".brew-address");
var brewUrl = document.querySelectorAll(".brew-url");
var brewHomePage = 1;


/*                  Functions                    */
// Function to grab data based on user keyword input
var searchEventButton = function () {
    var userInput = searchInput.val();

    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?page='+homePage+'&size=6&keyword='+userInput+'&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq';

    fetch(apiUrl)
        .then(function(response) {
            if(!response.ok) {
                alert(response.statusText)
            } else {
                return response.json().then(function(data) {
                    if (!data._embedded) {
                        swal({
                            title: "Oops!",
                            text: "Sorry no events found!",
                            icon: "error",
                            button: "Try Again?",
                          });
                    } else {
                        displayResults(data);
                    }
                })
            }
        })
};

// Function to display the results of user search
var displayResults = function (data) {
    var eventData = data._embedded.events
    console.log(eventData)

    // Hide the widgets and display the results
    if (homepageContainer.style.display == "none") {
        homepageContainer.style.display = "flex";
        homeWidget.style.display = "none";
    }
    
    // Cycle through and display the data from our fetch
    for (var i = 0; i < eventData.length; i++) {
        eventImg[i].setAttribute("style", "background: url(" + eventData[i].images[1].url + ");");
        eventTitle[i].textContent = eventData[i].name;
        if (eventData[i]._embedded.venues[0].state) {
        venueName[i].textContent = eventData[i]._embedded.venues[0].city.name + "," + " " + eventData[i]._embedded.venues[0].state.name;
        } else {
        venueName[i].textContent = eventData[i]._embedded.venues[0].city.name 
        }
        eventLink[i].textContent = "Purchase Tickets Now";
        eventLink[i].href = eventData[i].url;

        var eventDateTime = eventData[i].dates.start.dateTime;
        var eventReadableDate = new Date(eventDateTime);
        eventDate[i].textContent = eventReadableDate.toDateString();
    }
}

// Next button for pagination 
var nextHome = function (e) {
    e.preventDefault();
    if (homePage >= 0) {
        homePage++;
        searchEventButton();
    }
};

// Previous Button for pagination 
var prevHome = function (e) {
    e.preventDefault();
    if (homePage >= 1) {
        homePage--;
        searchEventButton();
    }
}

// Function to fetch brewery data
var getHomeBrewery = function () {
    var brewCity = brewInput.value;
    var homeState = brewState.value;

    if (homeState == true && brewCity) {
        var brewApi = "https://api.openbrewerydb.org/breweries?by_city="+brewCity+"&by_state="+homeState+"&per_page=3&page="+brewHomePage; 
    } else {
        var brewApi = "https://api.openbrewerydb.org/breweries?by_city="+brewCity+"&per_page=3&page="+brewHomePage; 
    }

    fetch(brewApi, {
        method: "GET",
    })
    .then(function (resp) {
        if (!resp.ok) {
            alert(resp.statusText);
        } else {
            return resp.json().then(function (homeBrew) {
                if (homeBrew.length == 0) {
                    swal("Sorry We Cannot Find Brewerys In That Area");
                    return;
                } else {
                    displayHomeBrew(homeBrew);
                }
            })
        }
    })
}

// Function to display the brewery data
function displayHomeBrew(homeBrew) {
    console.log(homeBrew)
    if (brewResults.style.display == "none") {
        brewResults.style.display = "flex";
    };

    for (var i = 0; i < homeBrew.length; i++) {
        brewName[i].textContent = homeBrew[i].name;
        brewAddress[i].textContent = homeBrew[i].street;
        brewAddress[i].href = "https://maps.google.com/?q=" + homeBrew[i].street;
        brewUrl[i].href = homeBrew[i].website_url;
    };
}




/*               Event Listeners              */
// Search button next to input box on header
$("#search-btn").on("click", searchEventButton);

// Brewery Search button 
brewSearch.addEventListener("click", getHomeBrewery);

// Event Listners for next and prev pagingation
homeNext.addEventListener("click", nextHome);
homePrev.addEventListener("click", prevHome);