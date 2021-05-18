$(document).ready(function() {
  // --- our code goes here ---

  const timeAgo = timeago.format(new Date());
  $(".timeago").text(timeAgo);  
});