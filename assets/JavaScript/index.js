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
                    displayResults(data)
                })
            }
        })

    .catch(function(error) {
        alert(error);
    })
};


// The below code is a work in progress displaying cards on the homescreen for specified events

// var displayCards = document.querySelector("#cards")

// var displayResults = function (data) {
//     //CODE TO DISPLAY RESULTS HERE
//     var eventData = data._embedded.events
//     displayCards.append(eventData)
//     displayCards.innerHTML = eventData
//     var results = data._embedded.events[i]
//     for (var i = 0; i < results; i++) {
//         displayCards.addClass("results")
//         var eventTitle = displayCards.append("h4")
//         eventTitle.innerHTML = eventData[i].name
//         eventTitle.addClass("title");
//         displayCards.append(eventTitle);
//         displayCards.append(resultsCard);
//     }
//     console.log(eventData[i].name)

// }

// var resultsContainer = $(".results-container");
//     for (var i = 0; i < data.length; i++) {
//         var resultsCard = $("<div>");
//         resultsCard.addClass("results-card")
//         var eventTitle = $("<h4>");
//         eventTitle.textContent = data[i]._embedded.events[i].name;
//         eventTitle.addClass("card-title");
//         resultsCard.append($eventTitle);
//         resultsContainer.append($resultsCard);


/*               Event Listeners              */
// Search button next to input box on header
$("#search-btn").on("click", searchEventButton);
