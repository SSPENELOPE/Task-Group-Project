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
                })
            }
        })

    .catch(function(error) {
        alert(error);
    })
};



var displayResults = function () {
    //CODE TO DISPLAY RESULTS HERE
}


/*               Event Listeners              */
// Search button next to input box on header
$("#search-btn").on("click", searchEventButton);
