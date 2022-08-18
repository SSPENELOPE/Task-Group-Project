/*     variables    */
var resultsContainer = document.getElementById("container-id");
var page = "0";
var nextPrev = document.querySelector(".next-prev");
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

// Brewery Card Variables
var breweryInput = document.getElementById("brewery-input");
var brewerySearch = document.getElementById("brewery-search");
var breweryName = document.querySelectorAll(".brewery-name");
var breweryAddress = document.querySelectorAll(".brewery-address");
var breweryUrl = document.querySelectorAll(".brewery-url");
var breweryResults = document.querySelector(".brewery-results");
var brewPage = "1";
var brewNextBtn = document.getElementById("brew-next");
var brewPrevBtn = document.getElementById("brew-prev");
var breweryState = document.getElementById("states");

/*      fucntions       */
// Search by Genre Function
var searchByGenre = function () {
    // Determine whether our parameters are met to get our desired search outcomes
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

    // This is the function that gets the data we need
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
    } else if (selectedValue == "Alternative" && musicInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&genreId=KnvZfZ7vAeA&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else {
            var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&page=" + page + "&classificationName=music&keyword=" + musicInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    }

    fetch(apiUrl)
        .then((function (response) {
            if (!response.ok) {
                alert(response.statustext)
            } else {
                return response.json().then(function (data) {
                    console.log(data)
                    if (!data._embedded) {
                        swal({
                            title: "Oops!",
                            text: "Sorry no events found!",
                            icon: "error",
                            button: "Try Again?",
                          });
                    }
                    displayGenreResults(data);
                });
            }
        }))
}

// Display Concert Results Function
function displayGenreResults(data) {
    var events = data._embedded.events;
    console.log(events);

    if (resultsContainer.style.display == "none" && nextPrev.style.display == "none") {
        resultsContainer.style.display = "flex";
        nextPrev.style.display = "flex";
    } 

    for (var i = 0; i < events.length; i++) {
        var concertDate = events[i].dates.start.dateTime;
        var concertReadableDate = new Date(concertDate);
        concertDateTime[i].textContent = concertReadableDate.toDateString();
        concertTitle[i].textContent = events[i].name;
        concertLink[i].textContent = "Purchase Tickets Now";
        concertLink[i].href = events[i].url;
        if (!events[i]._embedded.venues[0].city || !events[i]._embedded.venues[0].state) {
            venue[i].textContent = events[i]._embedded.venues[0].name;
        } else {
        venue[i].textContent = events[i]._embedded.venues[0].city.name + "," + " " + events[i]._embedded.venues[0].state.name;
        }
        musicCardResults[i].setAttribute("style", "background: url(" + events[i].images[1].url + ");");
    }

};

// Concert Pagination Next Page
var nextPage = function (event) {
    event.preventDefault();
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

// Get brewery API function
var getbrewery = function () {
    var breweryCity = breweryInput.value;
    var selectedState = breweryState.value;

    if (selectedState == true && breweryCity) {
        var breweryApi = "https://api.openbrewerydb.org/breweries?by_city="+breweryCity+"&by_state="+selectedState+"&per_page=3&page="+brewPage; 
    } else {
        var breweryApi = "https://api.openbrewerydb.org/breweries?by_city="+breweryCity+"&per_page=3&page="+brewPage;  
    };

    fetch(breweryApi, {
        method: "GET",
    })
    .then(function (response) {
        if (!response.ok) {
            alert(response.statusText)
        } else {
            return response.json().then(function (brewData) {
                console.log(brewData)
                if (brewData.length == 0) {
                    swal("Sorry We Cannot Find Brewerys In That Area");
                    return;
                } else {
                displayBreweryResluts(brewData);
                };
            })
        }
    });
};

// Display the brewery Results function
function displayBreweryResluts(brewData) {
    if (breweryResults.style.display == "none") {
        breweryResults.style.display = "flex";
    }

    for (var i = 0; i < brewData.length; i++) {
        breweryName[i].textContent = brewData[i].name;
        breweryAddress[i].textContent = brewData[i].street;
        breweryAddress[i].href = "https://maps.google.com/?q=" + brewData[i].street;
        breweryUrl[i].href = brewData[i].website_url;
    };
}

// Brewery Pagination Next function 
var brewNext = function (e) {
    e.preventDefault();
    if (brewPage >= 1) {
        brewPage++;
        console.log(brewPage);
        getbrewery();
    } 
}

// Brewery Pagination Previous function
var brewPrev = function (e) {
    e.preventDefault();
    if (brewPage >= 2) {
        brewPage--;
        console.log(brewPage);
        getbrewery();
    } else {
        return;
    }
}

/*      Event Listeners       */
// Event Listener for genre select menu
$("#small").on("change", function() {
    searchByGenre(page = "0");
});

// Event Listener for brewery search
brewerySearch.addEventListener("click", getbrewery);

// Event Listeners for brewery pagination buttons
brewNextBtn.addEventListener("click", brewNext);
brewPrevBtn.addEventListener("click", brewPrev);

// Event Listener for search button
userSearch.addEventListener("click", searchByInputAndGenre);

// Event Listeners for Pagination buttons
musicNext.addEventListener("click", nextPage);
musicPrev.addEventListener("click", prevPage);