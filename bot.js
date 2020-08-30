// Authentication
console.log('The bot is starting');

var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);


// Get
/*var hashtags = ['#developer'];

var params = {q: hashtags, result_type: 'recent', count: 5};

T.get('search/tweets', params, gotData); 

function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
    }
  }*/

// Post
// tweetIt();
// setInterval(tweetIt, 1000*20);

// function tweetLove(){
//     var statuses = [
//         "#CleanCode for live.",
//         "I'm a #PragmaticProgrammer",
//         "I love #code",
//         "I need #code",
//         "I'm addicted to #code",
//         "I love #Java",
//         "I love #JavaScript",
//         "I love #Python",
//         "I love #SQL",
//         "I love #Angular"
//     ];

//     var randomIndex = Math.floor(Math.random()*statuses.length);

//     var tweet = {
//         status: statuses[randomIndex]
//     }

//     T.post('statuses/update', tweet, tweeted);

//     function tweeted(err, data, response){
//         if(err){
//             console.log("Shit!!");
//         }else{
//             console.log("It worked!");
//         }
//         // console.log(data);
//     }
// }

function tweetIt(text){
    var tweet = {
        status: text
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response){
        if(err){
            console.log("Shit!!");
        }else{
            console.log("It worked!");
        }
        // console.log(data);
    }
}


// Stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

// Followed
function followed(event){
    var name = event.source.name;
    var screenName = event.source.screen_name
    tweetIt('@' + screenName + 'Thank you for following! Are you an addicted dev too?');
}




