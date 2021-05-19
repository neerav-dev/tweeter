/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

  const loadTweets = function () {
    $.get("/tweets", (data) => {
      console.log(data);
      renderTweets(data);
    })
  }

  loadTweets();

  const form = $("main.container form");

  const text = $("#tweet-text").val();

  form.on("submit", (event) => {
    event.preventDefault();
    $.post("/tweets", $("#tweet-text").serialize())
      .done(function (data) {
        console.log(data);
      });
  });
});