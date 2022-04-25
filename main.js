//web server url
const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";
let id_arr = []; //used to store tweet ID's so we don't have dupes
let master_arr = []; //all tweets that are displayed, and will be ordered/sorted

function getTweets() {
    fetch(url).then(function(res){
        return res.json();
    }).then(function(data){
        if (!document.getElementById("myCheck").checked){ //Only goes through Tweets when the pause button is UNCHECKED 
            for (let i =0; i < Object.keys(data.statuses).length; i++) {
                if (id_arr.includes(data.statuses[i].id)){ //means the Tweet already exists
                    //do nothing, do not add the Tweet to the list
                    console.log("Tweet already exists!");
                } else { //means that the Tweet does not already exist, add the Tweet to the lists
                    console.log(data.statuses[i].id)
                    id_arr.push(data.statuses[i].id);
                    master_arr.push(data.statuses[i]);
                }
                //console.log(data.statuses[i].text, data.statuses[i].id, data.statuses[i].created_at);
            }
        }
    }).catch(function(err){
        console.warn("Something went wrong!", err);
    });
}

window.onload = function (){ //what happens when it becomes unchecked?
    setInterval(getTweets, 5000); //runs the getTweets function every 5 seconds
}

function check() {
    document.getElementById("myCheck").checked = true;
  }
  
  function uncheck() {
    document.getElementById("myCheck").checked = false;
  }

// //for tweets
// const tweetContainer = document.getElementById('tweet-container');

// /*
//  * Removes all existing tweets from tweetList and then append all tweets back in
//  *
//  * @param {Array<Object>} tweets - A list of tweets
//  * @returns None, the tweets will be renewed
//  */

//  function refreshTweets(tweets) {
//     // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
//     // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
//     while (tweetContainer.firstChild) {
//         tweetContainer.removeChild(tweetContainer.firstChild);
//     }

//     // create an unordered list to hold the tweets
//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
//     const tweetList = document.createElement("ul");
//     // append the tweetList to the tweetContainer
//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
//     tweetContainer.appendChild(tweetList);

//     // all tweet objects (no duplicates) stored in tweets variable

//     // filter on search text
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
//     const filteredResult = tweets.filter(...);
//     // sort by date
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
//     const sortedResult = filteredResult.sort(...);

//     // execute the arrow function for each tweet
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
//     sortedResult.forEach(tweetObject => {
//         // create a container for individual tweet
//         const tweet = document.createElement("li");

//         // e.g. create a div holding tweet content
//         const tweetContent = document.createElement("div");
//         // create a text node "safely" with HTML characters escaped
//         // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
//         const tweetText = document.createTextNode(tweetObject.text);
//         // append the text node to the div
//         tweetContent.appendChild(tweetText);

//         // you may want to put more stuff here like time, username...
//         tweet.appendChild(tweetContent);

//         // finally append your tweet into the tweet list
//         tweetList.appendChild(tweet);
//     });
// }