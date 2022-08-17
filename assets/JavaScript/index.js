/*               Variables               */
var searchInput = $("#default-search");

/*                  Functions                    */
// Function to grab data based on user keyword input
var searchEventButton = function () {
    var userInput = searchInput.val();

    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword='+userInput+'&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq';

    fetch(apiUrl)
        .then(function(response) {
            if(!response.ok) {
                alert(response.statusText)
            } else {
                return response.json().then(function(data) {
                    console.log(data);
                    displayResults(data);
                })
            }
        })

    .catch(function(error) {
        alert(error);
    })
};


// The below code is a work in progress displaying cards on the homescreen for specified events

// below code has been updated to return the name of querried results on the index.html page. Still needs work 

var displayCards = document.querySelector("#cards")

var displayResults = function (data) {
    //CODE TO DISPLAY RESULTS HERE
    var eventData = data._embedded.events
    console.log(eventData)
    
    var results = data._embedded.events.length
    for (var i = 0; i < results; i++) {
        var element = document.createElement("h4")
        displayCards.append(element)
        element.append(eventData[i].name)
        console.log(eventData[i].name)
    }
}




/*               Event Listeners              */
// Search button next to input box on header
$("#search-btn").on("click", searchEventButton);
