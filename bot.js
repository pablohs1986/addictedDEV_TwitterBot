// Setup
console.log('The bot is starting');
var Twit = require('twit');
var config = require('./config/config');
var T = new Twit(config);

// Post random element from addDevStatuses array
var addDevStatuses = require('./data/statuses');

function tweetRandomStatus(){
    console.log('Triying to post random Status...')
    var randomStatus = returnRandomElementFromArray(addDevStatuses);
    tweetIt(randomStatus);
}

tweetRandomStatus();
setInterval(tweetRandomStatus, 1000*60*73);

// Post master #100DOC progress every day at 10, 18h
var schedule = require('node-schedule');
var tweetMastersProgressAt10 = schedule.scheduleJob('05 11 * * *', function(){
    console.log('Tweting master progress at 10 AM');
    tweetMasters100DocProgress();
    });
var tweetMastersProgressAt18 = schedule.scheduleJob('05 18 * * *', function(){
    console.log('Tweting master progress at 10 AM');
    tweetMasters100DocProgress();
    });

tweetMastersProgressAt10.schedule();
tweetMastersProgressAt18.schedule();

function tweetMasters100DocProgress(){
    console.log("Triying to post the master's progress...");
    const startDate =  new Date('2020-08-27');
    var actualDate = new Date();
    var currentChallengeDay = Math.ceil(Math.abs(actualDate - startDate) / (1000 * 60 * 60 * 24)); 
    var masterProgress = "My beloved master, @pablohs1986, is on the day " + currentChallengeDay + " of #100DaysOfCode challenge!!! 0x1F9BE"
    tweetIt(masterProgress);
}

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

// Retweet random hashtags
let hashtags = require('./data/hashtags');

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
setInterval(retweetRandomHashtag, 1000*60*130);

// Auxiliar functions
function returnRandomElementFromArray(array){
    return status = array[Math.floor(Math.random()*array.length)];
}

function onlyUniqueTweets(value, index, self){
    return self.indexOf(value) === index;
}

