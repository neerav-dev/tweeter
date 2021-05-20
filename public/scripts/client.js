/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
                        <textarea name="" id="">${escape(tweetData.content.text)}</textarea>
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
  $('.tweets-container').empty();
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
  });
};

$(document).ready(function() {

  const loadTweets = function() {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  loadTweets();

  const form = $("main.container form");

  form.on("submit", (event) => {
    event.preventDefault();
    
    $('.caution').empty();
    const text = $("#tweet-text").val();
    if (text.trim() === '') {
      $('.caution').append('🛑 Tweet 💬 cannot 🙅🏻‍♂️ be empty 🛑');
      $('.caution').slideDown("fast","linear");
      return;
    } else {
      if (text.length > 140) {
        $('.caution').append('🛑 Tweet 💬 cannot 🙅🏻‍♂️ be more then📏 140 characters 🛑');
        $('.caution').slideDown("fast","linear");
        return;
      }
    }
    $('.caution').empty();
    $('.caution').slideUp("fast","linear");

    $.post("/tweets", $("#tweet-text").serialize())
      .done(function() {
        loadTweets();
      });
    $("#tweet-text").val("");
  });

  $('.showForm').on("click", (event) => {
    if ($('.new-tweet').prop('clientHeight') > 0) {
      $('.new-tweet').slideUp("fast","linear");
    } else {
      $('.new-tweet').slideDown("fast","linear");
      $("#tweet-text").focus();
    }
  });
});