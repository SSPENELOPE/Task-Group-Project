// varibales
var page = "0";
var nextPrev = document.getElementById("next-prev");
var userSearch = document.getElementById("sportSearch-btn");
var userInput = document.getElementById("music-input");
var sportsCards = document.getElementById("container-id");

// the result card variables
var sportsResutlsWrapper = document.querySelector(".sports-results");
var sportsDateTime = document.querySelector(".date-time");
var venue = document.querySelectorAll (".venue-text");
var sportsTitle = document.querySelectorAll (".card-title");
var sportsLink = document.querySelectorAll(".website-link");
var sportsCardsResults = document.querySelectorAll(".results-card");
var sportsImg = document.querySelectorAll(".sports-img")

// brewery card variables
var beweryInput = document.getElementById("brewery-input");
var brewerySearch = document.getElementById("brewery-search");
var breweryName = document.querySelectorAll(".brewery-name");
var breweryAddress = document.querySelectorAll(".brewery-address");
var breweryUrl = document.querySelectorAll(".brewery-url");
var breweryResults = document.querySelectorAll(".brewery-results");
var brewPage = "1";


// functions
//search by sport function
var searchBySport = function () {
    var selectedValue = $("#medium").val();
    if (selectedValue ) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&keyword="+selectedValue+"&page=" + page + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
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
        sportsLink[i].href = events[i].url;
        /* sportsImg[i].textContent = events[i].images[0].attribution; */
           
        sportsImg[i].setAttribute("style", "background: url("+ events[i].images[1].url + ");");
        
    }

    
}



// search by sport and input function
function searchByInputAndSport(e) {
    e.preveentDefault();
    var selectedValue = $("medium").val();
    var sportsInput = userInput.value; 
    if (selectedValue == "Football" && sportsInput) {
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&page=" + page + "&genreId=KnvZfZ7vAv1&keyword=" + sportsInput + "&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
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

// brewery API function 
var getbrewery = function () {
    var breweryCity = breweryInput.value;
    var selectedState = breweryState.value;

    if (selectedState == true && breweryCity) {
        var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city="+breweryCity+"&by_state"+selectedState+"&per_page=3&page="+brewPage;
    } else {
        var breweryApi = "https://api.openbrewerydb.org/breweries?by_city="+breweryCity+"&per_page=3&page="+brewPage;
    };

    fetch(breweryApi, {
        method: "GET",
    })
    .then(function (response) {
        if(!response.ok) {
            alert(response.statusText)
        } else {
            return response.json().then(function (brewData) {
                console.log(brewData)
                if (brewData.length == 0) {
                    swal ("sorry we cannot find brewerys in that area");
                    return;
                } else {
                    displayBreweryResults(brewData);
                };
            })
        }
    });
};

// function to bdispkay brewery results
function displayBreweryResluts(brewData) {
    if (breweryResults.style.display == "none") {
        breweryResults.style.display = "flex";
    };

    for (var i = 0; i < brewData.length; i ++) {
        breweryName[i].textContent = brewData[i].name;
        breweryAddress[i].textContent = brewData[i].street;
        brewyAddress[i].href = "https://maps.google.com/?" + brewData[i].stret;
        breweryUrl[i].href = brewData[i].href = brewData[i].website_url;
    };
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