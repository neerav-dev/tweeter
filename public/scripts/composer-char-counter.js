$(document).ready(function() {
  // --- our code goes here ---
  //console.log("Hello");

  const updateCounter = function(element, counter) {
    const counterElement = $(element).parent().children("div.action").children("output.counter");
    const limit = 140;
    let result = limit - counter;
    if (result < 0) {
      counterElement.css("color","#f11");
    } else {
      counterElement.css("color","#545149");
    }
    counterElement.text(result);
  }

  $(".new-tweet textarea").on("input", function() {
    let counter  = $(this).val().length;
    updateCounter(this, counter);
  })
  
});