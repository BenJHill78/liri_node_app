
    var request = require("request");
    var fs = require("fs");
    var keys = require("./keys.js");
    var twitter = require("twitter");
    var inquirer = require("inquirer");

    var client = new twitter(keys.twitterKeys);
    var SpotifyWebApi = require('node-spotify-api');

    var spotify = new SpotifyWebApi(keys.spotifyKeys);

    var a;
    var b;

    inquirer.prompt([    
   {
        type: "list",
        message: "Which activity do you want to do?",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "commands"
    },
            {
        type: "input",
        message: "Choose a song or movie.",
        name: "songMovie"
    }
        
        ]).then(function(inquirerResponse){
        
        a = inquirerResponse.commands;
        b = inquirerResponse.songMovie;
        
        switchA();
    })

    function switchA(){
     
// The switch-case will direct which function gets run.
switch (a) {
    case "my-tweets":
        mtw();
        break;

    case "spotify-this-song":
        sts();
        break;

    case "movie-this":
        mt();
        break;

    case "do-what-it-says":
        dwis();
        break;
        
    default:
        dt();
}
    }

    function mtw() {
       client.get("statuses/user_timeline",{screen_name: "My DevHill app", count: 20}, function(error,tweets,response){
           console.log("get is running");
           var newTweets = JSON.parse(response.body);

               for(var i = 0; i < 20; i++){
                  console.log(newTweets[i].created_at);
                  console.log(newTweets[i].text);
               }
    })
    }

    function sts() {
        if (b===""){
            b="The Sign, by Ace of Base"
        }
        spotify.search({type: "track",query:b}, function(error, data){
            //console.log(data.tracks.items[0].artist[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);
        })
        
    }

    function mt() {
        if (b===""){
            b="Mr. Nobody"
        }
        var movieChoice = "http://www.omdbapi.com/?apikey=40e9cece&t="+ b;
        request(movieChoice, function(error, response, body){
            console.log(movieChoice);
        var movieInfo = JSON.parse(body);
           console.log(movieInfo.Title);
            console.log(movieInfo.Released);
            console.log(movieInfo.imdbRating);
            console.log(movieInfo.Country);
            console.log(movieInfo.Language);
            console.log(movieInfo.Actors);
            console.log(movieInfo.Plot);
            console.log(movieInfo.Ratings[1].Value);
                })
    }
    function dwis(){
        fs.readFile ("random.txt", "utf8", function(error, data){
            var dataArr = data.split(",");
            a = dataArr[0];
            b = dataArr[1];
            switchA();
        })
    }
    function dt() {
        
    }