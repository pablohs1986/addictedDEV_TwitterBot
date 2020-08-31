// Setup
console.log('The bot is starting');

var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

// Post
function randomStatus(){
    var addDevStatuses = [
        "#CleanCode for live.",
        "I'm a #PragmaticProgrammer",
        "I love #code",
        "I need #code",
        "I'm addicted to #code",
        "I love #Java",
        "I love #JavaScript",
        "I love #Python",
        "I love #SQL",
        "I love #Angular",
        "#100DaysOfCode challenge??? I want a #365DaysOfCode challenge!"
    ];

    var randomIndex = Math.floor(Math.random()*addDevStatuses.length);
    var status = addDevStatuses[randomIndex];
    return status;
}

function tweetIt(text){
    var tweet = {
        status: text
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response){
        if(err){
            console.log("Shit!!");
            console.log(err);
        }else{
            console.log("It worked!");
        }
        // console.log(data);
    }
}

tweetIt(randomStatus());
setInterval(tweetIt, 1000*20, randomStatus());
