// Setup
console.log('The bot is starting');

var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

var addDevStatuses = [
    "#CleanCode for live. #dev #code #botsPower",
    "I'm a #PragmaticProgrammer. #dev #code #botsPower",
    "I love #code. #dev #code #botsPower",
    "I need #code. #dev #code #botsPower",
    "I love unicorns. #dev #code #botsPower",
    "I'm addicted to #code. #dev #code #botsPower",
    "I love #Java. #dev #code #botsPower",
    "I love #JavaScript. #dev #code #botsPower",
    "I love #Python. #dev #code #botsPower",
    "I love #SQL. #dev #code #botsPower",
    "I love #Angular. #dev #code #botsPower",
    "I love #StackOverflow. #dev #code #botsPower",
    "It’s Not a Bug, It’s a Feature. #dev #code #botsPower",
    "Have you tried deleting your cookies and cache? #dev #code #botsPower",
    "*#$@%(*@@ Internet explorer. #dev #code #botsPower",
    "No one uses XYZ browser, we can ignore it… #dev #code #botsPower",
    "QA is being a pain in the a**! #dev #code #botsPower",
    "There’s this new javascript framework... #dev #code #botsPower",
    "It shouldn’t take too long... #dev #code #botsPower",
    "This is just a temporary fix. #dev #code #botsPower",
    "Database needs data. #dev #code #botsPower",
    "I can finish this in a few minutes. #dev #code #botsPower",
    "It “should” work now. #dev #code #botsPower",
    "Did you try logging out and logging in again? #dev #code #botsPower",
    "Did you refresh the page? #dev #code #botsPower",
    "Works on my machine. #dev #code #botsPower",
    "The best thing about a boolean is even if you are wrong, you are only off by a bit. #dev #code #botsPower",
    "Without requirements or design, programming is the art of adding bugs to an empty text file (Louis Srygley) #dev #code #botsPower",
    '"Before software can be reusable it first has to be usable" (Ralph Johnson) #dev #code #botsPower',
    '"The best method for accelerating a computer is the one that boosts it by 9.8 m/s2" #dev #code #botsPower',
    '"I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing" (Oktal) #dev #code #botsPower',
    '"If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization" (Gerald Weinberg) #dev #code #botsPower',
    '"There are two ways to write error-free programs; only the third one works" (Alan J. Perlis) #dev #code #botsPower',
    '"Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development" (Anonymous) #dev #code #botsPower',
    '"It’s not a bug – it’s an undocumented feature" (Anonymous) #dev #code #botsPower',
    'One man’s crappy software is another man’s full-time job." (Jessica Gaston) #dev #code #botsPower',
    '"A good programmer is someone who always looks both ways before crossing a one-way street" (Doug Linder) #dev #code #botsPower',
    '"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live" (Martin Golding) #dev #code #botsPower',
    '"Programming is like sex. One mistake and you have to support it for the rest of your life" (Michael Sinz) #dev #code #botsPower',
    '"Deleted code is debugged code" (Jeff Sickel) #dev #code #botsPower',
    '"Walking on water and developing software from a specification are easy if both are frozen" (Edward V Berard) #dev #code #botsPower',
    '"If debugging is the process of removing software bugs, then programming must be the process of putting them in" (Edsger Dijkstra) #dev #code #botsPower',
    '"Software undergoes beta testing shortly before it’s released. Beta is Latin for “still doesn’t work" (Anonymous) #dev #code #botsPower',
    '"Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to produce bigger and better idiots. So far, the universe is winning" (Rick Cook) #dev #code #botsPower',
    '"It’s a curious thing about our industry: not only do we not learn from our mistakes, but we also don’t learn from our successes" (Keith Braithwaite) #dev #code #botsPower',
    '"There are only two kinds of programming languages: those people always bitch about and those nobody uses" (Bjarne Stroustrup) #dev #code #botsPower',
    '"In order to understand recursion, one must first understand recursion" (Anonymous) #dev #code #botsPower',
    '"The cheapest, fastest, and most reliable components are those that aren’t there" (Gordon Bell) #dev #code #botsPower',
    '"The best performance improvement is the transition from the nonworking state to the working state" (J. Osterhout) #dev #code #botsPower',
    '"The trouble with programmers is that you can never tell what a programmer is doing until it’s too late" (Seymour Cray) #dev #code #botsPower',
    '"Don’t worry if it doesn’t work right. If everything did, you’d be out of a job" (Mosher’s Law of Software Engineering) #dev #code #botsPower',
    "#100DaysOfCode challenge??? I want a #365DaysOfCode challenge! #dev #code #botsPower"
];

let hashtags = [
    '#java', '#Java', '#js', '#javascript', '#JavaScript', '#python', '#Python', '#nodejs', '#nodeJS', '#100DaysOfCode', '#100daysofcode', '#100DOC', '#100doc', '#stackoverflow', 
    '#StackOverFlow', '#angular', '#Angular', '#VSCode', '#vscode', '#Netbeans', '#netbeans', '#Oracle', '#oracle', '#dev', '#Dev', '#developer', '#Developer', '#Development', '#development', '#sql', '#SQL'
]

// function randomStatus(){
//     return status = addDevStatuses[Math.floor(Math.random()*addDevStatuses.length)];
// }

function returnRandomElementFromArray(array){
    return status = array[Math.floor(Math.random()*array.length)];
}

function onlyUniqueTweets(value, index, self){
    return self.indexOf(value) === index;
}

// Post every 2 hours
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

tweetIt(returnRandomElementFromArray(addDevStatuses));
setInterval(tweetIt, 1000*60*120, returnRandomElementFromArray(addDevStatuses));

// Retweet hashtags
function retweetHashtags(hashtag){
    var params = {
        q: hashtag + ' ',
        result_type: 'mixed',
        count: '5'
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
                        console.log("\n\nRetweeted! ID - " + tweetID);
                    }
                    else {
                        console.log("\nShit retweeting!! Duplication maybe... " + tweetID + "| HASHTAG - " + hashtag);
                        console.log("Error: " + err_rt);
                    }
                })
            }
            console.log("It worked! Hashtags retweeted!!!");
        }
    })
}

retweetHashtags(returnRandomElementFromArray(hashtags));
setInterval(retweetHashtags, 1000*60*10, returnRandomElementFromArray(hashtags));

