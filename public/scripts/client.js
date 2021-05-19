/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Implement createTweetElement function

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweetData) {
  const timeAgo = timeago.format(tweetData.created_at);
  const tweet = `<article class="tweet">
                      <header>
                        <div>
                          <img src=${tweetData.user.avatars} />
                          <span class="name">${tweetData.user.name}</span>
                        </div>
                        <div>
                          <span class="handler">${tweetData.user.handle}</span>
                        </div>
                      </header>
                      <div>
                        <textarea name="" id="">${tweetData.content.text}</textarea>
                      </div>
                      <footer>
                        <div>
                          <span class="timeAgo">${timeAgo}</span>
                        </div>
                        <div>
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                        </div>
                      </footer>
                    </article>`;
  return tweet;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  });
};

$(document).ready(function() {
  renderTweets(data);

  const form = $("main.container form");

  const text = $("#tweet-text").val();

  form.on("submit", (event) => {
    event.preventDefault();
    //console.log($("#tweet-text").serialize());
    $.post("/tweets", $("#tweet-text").serialize())
      .done(function (data) {
        console.log(data);
      });
  });
});