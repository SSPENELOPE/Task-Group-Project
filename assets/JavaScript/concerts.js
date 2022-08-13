/*     variables    */




/*      fucntions       */
var searchByGenre = function () {
    var selectedValue = $("#small").val();
    if (selectedValue == "Rap/Hiphop") {
        var apiUrl =  "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vAv1?locale=en-us&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Alternative") {
        var apiUrl =  "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else if (selectedValue == "Country") {
        var apiUrl =  "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vAv6?locale=en-us&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    } else {
        var apiUrl =  "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vAeA?locale=en-us&apikey=taiF3boXdKk17IQ69YlGzA1O29aTWlnq";
    };

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


// Event Listener for genre select menu
$("#small").on("change", searchByGenre);