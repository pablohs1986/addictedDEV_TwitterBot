// Setup
console.log('The bot is starting');

var Twit = require('twit');
var config = require('./config/config');
var T = new Twit(config);

// Data
var addDevStatuses = require('./data/statuses');
let hashtags = require('./data/hashtags');

// Post function
function tweetIt(text){
    var params = {
        status: text
    }

    T.post('statuses/update', params, function (err, data){
        if(err){
            console.log("Shit!!");
            console.log(err);
        }else{
            console.log("It worked! Tweeting!!");
        }
    })
}

// Post random element from addDevStatuses array
function tweetRandomStatus(){
    console.log('Triying to post random Status...')
    var randomStatus = returnRandomElementFromArray(addDevStatuses);
    tweetIt(randomStatus);
}

tweetRandomStatus();
setInterval(tweetRandomStatus, 1000*60*5);

// Post master #100DOC progress
function tweetMaster100DocProgress(){
    console.log("Triying to post the master's progress...");
    var startDate =  new Date('2020-08-27');
    var actualDate = new Date();
    var currentChallengeDay = Math.ceil(Math.abs(actualDate - startDate) / (1000 * 60 * 60 * 24)); 

    var masterProgress = "My beloved master, @pablohs1986, is on the day " + currentChallengeDay + " of #100DaysOfCode challenge!!!"
    tweetIt(masterProgress);
}

tweetMaster100DocProgress();
setInterval(tweetMaster100DocProgress, 1000 * 60 * 60 * 24);

// Retweet random hashtags
function retweetRandomHashtag(){
    var randomHashtag = returnRandomElementFromArray(hashtags);
    console.log('Triying to retweet hastagh ' + randomHashtag);
    var params = {
        q: randomHashtag + ' ',
        result_type: 'mixed',
        count: '3'
    }

    T.get('search/tweets', params, function(err_search, data_search, response_search){
        let tweets = data_search.statuses;
       
        if(err_search){
            console.log("Shit searching!!");
            console.log(err_search);
        }else{
            var tweetIDList = [];
            
            for(let tweet of tweets){
                if(tweet.text.startsWith("RT @")){
                    if(tweet.retweeted_status){
                        tweetIDList.push(tweet.retweeted_status.id_str);
                    }else{
                        tweetIDList.push(tweet.id_str);
                    }
                }else{
                    tweetIDList.push(tweet.id_str);
                }
            }

            tweetIDList = tweetIDList.filter(onlyUniqueTweets);

            console.log("TweetIDList = \n" + tweetIDList);

            for (let tweetID of tweetIDList) {
                T.post('statuses/retweet/:id', {id : tweetID}, function(err_rt, data_rt, response_rt){
                    if(!err_rt){
                        console.log("\n\nRetweeted! ID - " + tweetID  + "| HASHTAG - " + randomHashtag);
                    }
                    else {
                        console.log("\nShit retweeting!! Duplication maybe... " + tweetID + "| HASHTAG - " + randomHashtag);
                        console.log("Error: " + err_rt);
                    }
                })
            }
            console.log("It worked! Hashtags retweeted!!!");
        }
    })
}

retweetRandomHashtag();
setInterval(retweetRandomHashtag, 1000*60*10);

// Auxiliar functions
function returnRandomElementFromArray(array){
    return status = array[Math.floor(Math.random()*array.length)];
}

function onlyUniqueTweets(value, index, self){
    return self.indexOf(value) === index;
}

