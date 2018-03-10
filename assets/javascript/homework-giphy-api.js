$(document).ready(function() {
    // declaring global variables
    var topics = [];

    // function to create the buttons container section of the page
    function initializeButtonsContainer() {
        // for loop to create the buttons for each index of the topics array
        for (var x = 0; x < topics.length; x++) {
            $("#buttonsContainer").append($("<button>").attr("id", topics[x] /*("btnTopic-" + topics[x])*/).attr("class", "topics-info").text(topics[x]));
        }
    }

    // // function to create the results container section of the page
    // function initializeGifResultsContainer() {
        
    // }

    // function to create the add a topic section of the page
    function initializeAddTopicContainer() {
        // creates a variable for creating new elements
        var newElement, targetDiv = $("#addTopicContainer");

        // creates and adds the text for a new label element
        newElement = $("<label>").text("Add a topic");

        // appends the label element to the add topic container
        $(targetDiv).append(newElement);

        // appends the breakline element to the add topic container
        $(targetDiv).append($("<br><br>"));
        
        // creates and adds the id and type attributes for a new textbox input element
        newElement = $("<input>").attr("id", "topicInput").attr("type", "text");

        // appends the input element to the add topic container
        $(targetDiv).append(newElement);

        // appends another breakline element to the add topic container
        $(targetDiv).append($("<br><br>"));

        // creates and adds the attributes for a new submit button element
        newElement = $("<button>").attr("id", "btnSubmit").attr("type", "submit").text("Submit");

        // appends the new submit button element to the add topic container
        $(targetDiv).append(newElement);
    }

    // current test values for initializing topics array
    topics = ["dog", "cat", "rabbit"];

    // call initialize functions
    initializeButtonsContainer(),initializeAddTopicContainer();

    function addNewTopicButton(newTopic) {
        $("#buttonsContainer").empty();
        topics.push(newTopic);
        for (var x = 0; x < topics.length; x++) {
            // $("#buttonsContainer").append($("<button>").attr("id", ("btnTopic-" + topics[x])).text(topics[x]));
            var a = $("<button>");
            a.attr("id", topics[x]); // ("btnTopic-" + topics[x]));
            a.attr("class", "topics-info");
            a.text(topics[x]);
            $("#buttonsContainer").append(a);
        }
    //     var tempArray = [];
    //     // topics.reverse();
    //     var topicsLength = topics.length;

    //     for (var x = 1; x < topics.length; x++) {
    //         x--;
    //         tempArray.push(topics.pop());
    //    }

    //     // tempArray.reverse();
    //     for (var x = 1; x < tempArray.length; x++) {
    //         x--;
    //         topics.push(tempArray.pop());
    //     }

    //     $("#buttonsContainer").empty();

    //     for (var x = 0; x < topics.length; x++) {
    //         $("#buttonsContainer").append($("<button>").attr("id", ("btnTopic-" + topics[x])).text(topics[x]));
    //     }
    }

    function displayResults() {
        var btnClicked = $(this).attr("id");
        // displayResults(btnClicked);
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=W3Nj5uF17CXgQ3pHRxcfbAQyk4xwXotM&q="
             + btnClicked + "&limit=25&offset=0&rating=y&rating=g&rating=pg&rating=pg13&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;

            console.log(results);
        });
    }

    // event listener for when a button is clicked
    $("#btnSubmit" /*"button" */).on("click", function(event) {
        // prevents the form from immediately submitting
        event.preventDefault();

        // creates a variable to temporarily hold the id of the button clicked
        var btnTargetId = $(this).attr("id");

        // check to see which type of button was clicked - btnSubmit or one of the btnTopic buttons
        // if (btnTargetId === "btnSubmit") {
            var newTopic = $("#topicInput").val().trim();
            addNewTopicButton(newTopic);
        // }

        // else {
            // var btnClicked = $(this).attr("id");
            // // displayResults(btnClicked);
            
            // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=W3Nj5uF17CXgQ3pHRxcfbAQyk4xwXotM&q="
            //      + btnClicked + "&limit=25&offset=0&rating=y&rating=g&rating=pg&rating=pg13&lang=en";
            // $.ajax({
            //     url: queryURL,
            //     method: "GET"
            // }).then(function(response) {
            //     var results = response.data;

            //     console.log(results);
            // })
        // }
    });

    $("button").on("click", "topics-info", displayResults);
})