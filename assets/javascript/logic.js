$(document).ready(function(){
    //array of topics
    var topics = ["mario","solid snake","marcus fenix","booker dewitt","gordon freeman",
        "pikachu","lara croft","glados","link","shodan","sonic"];
    //function that adds buttons to the dom
    var populateButtons = function(arr){
        //removes all buttons from the dom so there won't be duplicates
        $("#buttons").empty();
        //for each item in the topics array
        for(i = 0; i < arr.length; i++){
            //create a jQuery button, give it the class topic, and assign the value of the current topic item to the data-query attribute and the button text
            var button = $("<button></button>");
            button.addClass("topic");
            button.addClass("col-auto");
            button.attr("data-query",arr[i]);
            button.text(arr[i]);
            //add the new button to the dom
            $("#buttons").append(button);
        }
    }
    //call function to populate the buttons and pass the topics array as an arg
    populateButtons(topics);

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=I5jiUCWL9lR5Qoq5k7NRf59EnCwtxpn0&q=";
    var gifs;
    //function that will be used to add gifs to the dom
    var getGifs = function (term) {
        gifs=[];
        $("#gif-container > div").empty();
        $.ajax({
            url: queryURL + term,
            method: "GET"
        }).then(function (response) {

            var k = 0;
            //while there less than 10 gifs in the array
            while(gifs.length < 10){
                //if the gif is not rated r
                if(response.data[k].rating !="r"){
                    //add the still source, the animated source, and the rating to the gifs array
                    gifs.push([response.data[k].images.original_still.url, response.data[k].images.original.url, response.data[k].rating]);
                }
                k++;
            }
            //for every gif in the array
            for (var j = 0; j < gifs.length; j++) {
                //add an element to the gif container that contains all of the data about the gif
                $("#gif-container > div").append("<div class='col-6 col-sm-3'><h6 class='rating'> Rating: " + gifs[j][2] + "</h6> <img class='img-fluid aGif' src=" + gifs[j][0] +
                " data-index='"+ j + "' data-still='" + gifs[j][0] + "' data-anim='" + gifs[j][1] + "' />");
            }
        });
    }
    //when a topic is clicked
    $(document).on("click",".topic",function(){
        console.log("i have been called");
        //set the query to be called in the giphyapi to the title of the invoking button
        var query = $(this).attr("data-query");
        //replace the spaces in the query with +
        query.replace(" ","+");
        getGifs(query);
    });
    //when the user clicks the submit button
    $(document).on("click","#addChar",function(event){
        event.preventDefault();
        //if there is some text in the box
        if($("#newChar").val() != ""){
            //add the contects of the text box to the topics array
            topics.push($("#newChar").val());
        }
        populateButtons(topics);
        //clear the text box
        $("#newChar").val("");
    });
    //when a gif is clicked
    $(document).on("click",".aGif", function(event){
        //if the gif is currently the still version
        if($(this).attr("src") === $(this).attr("data-still")){
            //change the source to the animated version
            $(this).attr("src",$(this).attr("data-anim"));
        }
        else{
            //otherwise change the source to the still version
            $(this).attr("src",$(this).attr("data-still"));
        }
    })
});
