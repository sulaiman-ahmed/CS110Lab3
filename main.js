var pause = false;

$(document).ready(function() {
    //web server url
    const url = "http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";

    setInterval(async function() {
        fetch(url)
        .then(res => res.json()) .then(data => {
            if(!pause) {
                refreshTweets(data);
            }
        })
        .catch(err => {
            console.warn("Something went wrong! ", err);
        })
    }, 5000);

});

function searchTweets() {
    pause = true;
    var input = document.getElementById('searchBar')
    var filter = input.value.toLowerCase();
    var tweets = document.getElementsByClassName('tweetBlock')

    for(const tweet of tweets){
        var a = tweet.getElementsByClassName('tweetText')[0];
        var txtValue = a.textContent || a.innerText;
        if(txtValue.toLowerCase().indexOf(filter) > -1) {
            tweet.style.display = "";
        } else {
            tweet.style.display = "none";
        }
    }
}

function clearSearch() {
    pause = false;
    var search = document.getElementById('searchBar')
    var tweets = document.getElementsByClassName('tweetBlock')
    search.value = '';
    search.ariaPlaceholder = 'Search in tweets...';
    for(var tweet of tweets) {
        tweet.style.display = "";
    }
}

function URLError(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return (http.status != 404);
}

var tweetContainer = document.getElementById('contentCenter');
var tweetID = []
var tweetArr = []

function refreshTweets(tweets) {
    let tweetStatus = tweets.statuses;

    if(tweetContainer.firstChild) {
        while (tweetContainer.firstChild) {
            tweetContainer.removeChild(tweetContainer.firstChild);
        }
    }
    

    tweetStatus.forEach(tweet => {
        if(!tweetID.includes(tweet.id_str)){
            tweetID.push(tweet.id_str);

            var tweetBlock = document.createElement("div");
            tweetBlock.className = "tweetBlock";

            var tweetFlex = document.createElement("div");
            tweetFlex.className = "d-flex";

            const tweetPic = document.createElement("img");
            tweetPic.src = tweet.user.profile_image_url;
            if(!URLError(tweet.user.profile_image_url)){
                tweetPic.src = 'images/ratatouille.jpg';
            }
            tweetPic.className = "avatar";
            tweetPic.alt = "Avatar";
            tweetFlex.append(tweetPic);

            var tweetContent = document.createElement("div");
            tweetContent.className = "nextToAvatar d-flex flex-column";

            var tweetUserInfo = document.createElement("div");
            tweetUserInfo.className = "twoLine d-flex";
            var tweetName = document.createElement("p");
            var bold = document.createElement("b");
            bold.appendChild(document.createTextNode(tweet.user.name));
            tweetName.append(bold);
            var tweetHandleDate = document.createElement("p");
            tweetHandleDate.className = "tweetInfo";
            tweetHandleDate.appendChild(document.createTextNode('@' + tweet.user.screen_name + tweet.user.created_at.slice(4,10)));
            tweetUserInfo.append(tweetName);
            tweetUserInfo.append(tweetHandleDate);

            tweetContent.append(tweetUserInfo);

            var tweetText = document.createElement("p");
            tweetText.className = "tweetText";
            tweetText.appendChild(document.createTextNode(tweet.text));

            tweetContent.append(tweetText);
            tweetFlex.append(tweetContent);
            tweetBlock.append(tweetFlex);
            
            tweetArr.push(tweetBlock);
        } else {
            console.log("Tweet Duplicate found");
        }

        for(var i = tweetArr.length - 1; i >= 0; i--) {
            tweetContainer.appendChild(tweetArr[i]);
        }

    });
}