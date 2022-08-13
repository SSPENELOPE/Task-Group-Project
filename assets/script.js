/*               Variables               */
/* var searchBtn = $("#search-btn") */
var searchInput = $("#default-search");

/*                  Functions                    */
// Function to grab data based on user keyword input
var searchEventbutton = function () {
    var userInput = searchInput.val();
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+userInput+"&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";

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
            });
        }
    })

    .catch(function(error) {
        alert(error);
    });
};


/*               Event Listeners              */
// Search button next to input box on header
$("#search-btn").click(searchEventbutton);
