/*               Variables               */
/* var searchBtn = $("#search-btn") */
var searchInput = $("#default-search");

/*                  Functions                    */

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
                console.log(data);
            });
        }
    })

    .catch(function(error) {
        alert(error);
    });
};


/*               Event Listeners              */
$("#search-btn").click(searchEventbutton);
