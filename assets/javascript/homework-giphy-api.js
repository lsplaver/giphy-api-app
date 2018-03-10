$(document).ready(function() {
    var topics = [];

    function initializeButtonsContainer() {
        for (var x = 0; x < topics.length; x++) {
            $("#buttonsContainer").append($("<button>").attr("id", topics[x]).attr("class", "topics-info").text(topics[x]));
        }
    }

    function initializeAddTopicContainer() {
        var newElement, targetDiv = $("#addTopicContainer");

        newElement = $("<label>").text("Add a topic");

        $(targetDiv).append(newElement);

        $(targetDiv).append($("<br><br>"));
        
        newElement = $("<input>").attr("id", "topicInput").attr("type", "text");

        $(targetDiv).append(newElement);

        $(targetDiv).append($("<br><br>"));

        newElement = $("<button>").attr("id", "btnSubmit").attr("type", "submit").text("Submit");

        $(targetDiv).append(newElement);
    }

    topics = ["dog", "cat", "rabbit", "aragorn", "arnold schwarzenegger"];

    initializeButtonsContainer(),initializeAddTopicContainer();

    function addNewTopicButton(newTopic) {
        $("#buttonsContainer").empty();
        topics.push(newTopic);
        for (var x = 0; x < topics.length; x++) {
            var a = $("<button>");
            a.attr("id", topics[x]);
            a.attr("class", "topics-info");
            a.text(topics[x]);
            $("#buttonsContainer").append(a);
        }
    }

    function displayResults(btnClicked) {
        var btnClicked = $(this).attr("id");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=W3Nj5uF17CXgQ3pHRxcfbAQyk4xwXotM&q="
             + btnClicked + "&limit=10&offset=0&rating=y&rating=g&rating=pg&rating=pg13&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;

            console.log(results);

            $("#gifResultsContainer").empty();

            for (var x = 0; x < results.length; x++) {
                var resultsDiv = $("<div>");
                var ratingLabel = $("<label>").text("Rating: " + results[x].rating);
                var topicImage = $("<img>").attr("src", results[x].images.fixed_height_still.url).
                    attr("data-still", results[x].images.fixed_height_still.url).attr("data-animate", 
                    results[x].images.fixed_height.url).attr("data-state", "still").attr("class", "gifs");

                $(resultsDiv).append(ratingLabel);
                $(resultsDiv).append($("<br><br>"));
                $(resultsDiv).append(topicImage);
                $("#gifResultsContainer").append(resultsDiv);
            }
        });
    }

    $("#btnSubmit").on("click", function(event) {
        event.preventDefault();

        var btnTargetId = $(this).attr("id");

            var newTopic = $("#topicInput").val().trim();
            addNewTopicButton(newTopic);
    });

    $(document).on("click", ".topics-info", displayResults);

    $(document).on("click", ".gifs", function() {
        var currentState = $(this).attr("data-state");
        var animateURL = $(this).attr("data-animate");
        var stillURL = $(this).attr("data-still");
        if (currentState === "still") {
            $(this).attr("src", animateURL);
            $(this).attr("data-state", "animate");
        }

        if (currentState === "animate") {
            $(this).attr("src", stillURL);
            $(this).attr("data-state", "still");
        }
    })
})