$(document).ready(function() {
    // declaring global variables
    var topics = [];

    // function to create the buttons container
    function initializeButtonsContainer() {
        // for loop to create the buttons for each index of the topics array
        for (var x = 0; x < topics.length; x++) {
            $("#buttonsContainer").append($("<button>").attr("id", topics[x]).text(topics[x]));
        }
    }

    // function to create the add a topic section of the page
    function initializeAddATopicContainer() {
        // creates a variable for creating new elements
        var newElement, targetDiv = $("#addATopicContainer");

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
    initializeButtonsContainer(),initializeAddATopicContainer();
})