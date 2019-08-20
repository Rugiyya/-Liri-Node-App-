// Read and set environment variables
require("dotenv").config();

//VARS
const request = require("request");
const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
//vars to capture user inputs.
var userCommand = process.argv[2];
var inputParameter = process.argv[3];

//Execute function
UserInputs(userCommand, inputParameter);

//FUNCTIONS
function UserInputs(userCommand, inputParameter) {
    switch (userCommand) {
        case 'spotify-this-song':
            showSongInfo(inputParameter);
            break;
        case 'movie-this':
            showMovieInfo(inputParameter);
            break;
        case 'do-what-it-says':
            showSomeInfo();
            break;
        default:
            console.log("Invalid Command. Please type any of the following commands: \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}


//Funtion for Music Info: Spotify
function showSongInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign"; //default Song
    }
    spotify.search({
            type: "track",
            query: inputParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************************\n");
            }
        }
    );
};

//Funtion for Movie Info: OMDB
function showMovieInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=b3c0b435";
    let rottenTmt = "";
    //Axios call from activities
    axios.get(queryUrl).then(
            function (response) {
                // taking rotten tomatoes rating from an array 
                for (let i = 0; i < response.data.Ratings.length; i++) {
                    if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                        rottenTmt = response.data.Ratings[i].Value;
                        break;
                    } else {
                        rottenTmt = "unavailable";
                    }
                }
                //Print all info
                console.log("**********MOVIE INFO*********");
                fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
                console.log("Title: " + response.data.Title);
                fs.appendFileSync("log.txt", "Title: " + response.data.Title + "\n");
                console.log("Release Year: " + response.data.Year);
                fs.appendFileSync("log.txt", "Release Year: " + response.data.Year + "\n");
                console.log("IMDB Rating: " + response.data.imdbRating);
                fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating + "\n");
                console.log("Rotten Tomatoes Rating: " + rottenTmt);
                fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + rottenTmt + "\n");
                console.log("Country of Production: " + response.data.Country);
                fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country + "\n");
                console.log("Language: " + response.data.Language);
                fs.appendFileSync("log.txt", "Language: " + response.data.Language + "\n");
                console.log("Plot: " + response.data.Plot);
                fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
                console.log("Actors: " + response.data.Actors);
                fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************************\n");

            })
        //Error handling from activity
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}


//function for reading out of random.txt file  
function showSomeInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}