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

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=";
    var gifs;
    //function that will be used to add gifs to the dom
    var getGifs = function (term) {
        gifs=[];
        $("#gif-container > div").empty();
        $.ajax({
            url: queryURL + term,
            method: "GET"
        }).then(function (response) {
            //
            console.log(response);
            for (var i = 0; i < 10; i++) {
                gifs.push([response.data[i].images.original_still.url,response.data[i].images.original.url]);
            }

            for (var j = 0; j < gifs.length; j++) {
                $("#gif-container > div").append("<div class='col-6 col-sm-3'><img class='img-fluid aGif' src=" + gifs[j][0] +
                " data-index='"+ j + "' data-still='" + gifs[j][0] + "' data-anim='" + gifs[j][1] + "' />");
            }
        });
    }
    $(document).on("click",".topic",function(){
        console.log("i have been called");
        var query = $(this).attr("data-query");
        query.replace(" ","+");
        getGifs(query);
    });
    $(document).on("click","#addChar",function(event){
        event.preventDefault();
        if($("#newChar").val() != ""){
            topics.push($("#newChar").val());
        }
        populateButtons(topics);
        $("#newChar").val("");
    });
    $(document).on("click",".aGif", function(event){
        if($(this).attr("src") === $(this).attr("data-still")){
            $(this).attr("src",$(this).attr("data-anim"));
            console.log("true");
        }
        else{
            $(this).attr("src",$(this).attr("data-still"));
        }
        console.log("image clicked");
    })
});
