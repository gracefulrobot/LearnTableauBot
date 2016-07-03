console.log('The bot is starting');

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//get tweets
var params = {
	q: 'Tableau',
	count: 2,
	language: 'en'
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i< tweets.length; i++) {
		console.log(tweets[i].text);
	}
};

//setting up a user stream
var stream = T.stream('user');

// //any time someone follows me
// stream.on('follow', followed);

// function followed(eventMsg) {
// 	console.log("Follow event!")
// 	var name = eventMsg.source.name;
// 	var screenName = eventMsg.source.screen_name;
// 	tweetIt('Yay, @' + screenName +' is joining the data party!');
// }

//any time someone tweets me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
//for when i want to write the metadata to my computer
	// var fs = require ('fs');
	// var json = JSON.stringify(tweet,null,2);
	// fs.writeFile("tweet.json", json);

//for when somebody @'s me
	var replyTo = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	console.log(replyTo + ' ' + from);

	if(replyTo === 'LearnTableauBot') {
		var newTweet = '@' + from + ' thanks for tweeting me!'
		tweetIt(newTweet);
	}

}


//post tweets
//tweetIt();
//setInterval(tweetIt,1000*60*60)

function tweetIt(txt) {

	var r = Math.floor(Math.random()*100);

	var tweet = {
		status: txt
	}

	T.post('statuses/update',tweet, tweeted);

	function tweeted(err,data,response) {
		if (err) {
			console.log("something went wrong");
		} else {
			console.log("It worked!");
		}
	}
};