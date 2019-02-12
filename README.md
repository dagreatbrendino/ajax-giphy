# Giphy API Demo
## Overview
This application demonstrates the power of the Giphy API. There are 11 buttons at the top with the names of tv shows. When the user clicks on one of the buttons, the Giphy api will be used to retreive the still and playing urls of 10 gifs related to the tv show. By default the still versions of the gifs are shown first. When a user clicks on a gif, the playing version will be swapped in. If the user clicks the same gif again, the gif will be replaced by its still version again. 

The user also has the ability to add tv shows to the already existing list. When a new tv show is submitted, a new button will be added to retreive gifs from that tv show. Additionally, users can click on the dial to cycle through the tv shows in order from left to right. 
## Technical Aspects
### Javascript
This project utilizes the jQuery library to simplify DOM manipulation and AJAX calls.

All of the tv shows are stored in array called **topics**. This array is passed into a function **populateButtons(arr)** to dynamically add a button to the DOM for each show in the array. The jQuery library is used here to make manipulating the DOM simple. 
``` javascript
$(document).ready(function(){
    var topics = ["shameless","the simpsons","family guy","always sunny","breaking bad", ...];
    var populateButtons = function(arr){
        $("#buttons").empty();
        for(i = 0; i < arr.length; i++){
            var button = $("<button></button>");
            button.addClass("topic");
            button.addClass("col-auto");
            button.attr("data-query",arr[i]);
            button.attr("id",i);
            button.text(arr[i]);
            $("#buttons").append(button);
        }
    }
```
Each button is given an *data-query* attribute equal to the name of the tv show. This will be used to build the query URL for the AJAX call to the Giphy API. When a tv show button is clicked the *data-query* is parsed and used as an argument in the function **getGifs(term)** 
``` javascript
    var getGifs = function (term) {
        gifs=[];
        $("#gif-container > div").empty();
        $.ajax({
            url: queryURL + term,
            method: "GET"
        }).then(function (response) {
            var k = 0;
            while(gifs.length < 10){
                if(response.data[k].rating !="r"){
                    //add the still source, the animated source, and the rating to the gifs array
                    gifs.push([response.data[k].images.original_still.url, response.data[k].images.original.url, response.data[k].rating]);
                }
                k++;
            }
            for (var j = 0; j < gifs.length; j++) {
                $("#gif-container > div").append("<div class='col-6 col-sm-3'><h6 class='rating'> Rating: " + gifs[j][2] + "</h6> <img class='img-fluid aGif' src=" + gifs[j][0] +
                " data-index='"+ j + "' data-still='" + gifs[j][0] + "' data-anim='" + gifs[j][1] + "' />");
            }
        });
    }
```
### Giphy API
Giphy provides a search paramater for its query url which uses a GET method to retrieve an array of GIF Objects and stores them in **data**. The particular properties that are useful to this project are *rating*, *images.original_still.url* and *images.original.url*. Below is an example of the data structure of a GIF Object
``` javascript
data[i] = {
  analytics: {...}
  ...
  images: {
    original_still: { 
      url: examplestilleurl.gif
    }
    original: {
      url: exampleurl.gif
    }
  }
  ...
  rating: 'PG'
```
### jQueryRotate
The jQueryRotate.js library is used to make the dial animate a certain degree of rotation every time the user clicks on the dial. It makes the animation consistent and is very easy to impliment. 
