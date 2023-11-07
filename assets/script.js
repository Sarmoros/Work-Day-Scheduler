// code that interacts with dom
$(document).ready(function() {

  $(".saveBtn").on("click", function() {
    // Uses the id in the containing time-block as a key to save the user input in local storage
    var blockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(blockId, userInput);
  });

  // Added code to apply the past, present, or future class to each time block
  var currentHour = dayjs().hour();
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Added code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    var savedInput = localStorage.getItem(blockId);

    if (savedInput) {
      $(this).find(".description").val(savedInput);
    }
  });

  // Added code to display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

});
