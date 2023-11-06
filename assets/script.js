// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// code that interacts with dom
$(document).ready(function() {

  $('.saveBtn').on("click", function() {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Getting the current hour in 24-hour format from day.js
  var currentHour = dayjs().format("H");

  $(".time-block").each(function() {
    var timeBlockId = parseInt($(this).attr("id").split("-")[1]);
    
    if(timeBlockId < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockId == currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });  

  for (var i = 9; i <= 17; i++) {
    var timeBlock = $("<div>").addClass("time-block row");
    var hourColumn = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(i + "AM");

    var hourText = i > 12 ? i - 12 : i;
    var amPm = i >= 12 ? "PM" : "AM";

    hourColumn.text(hourText + amPm);
    
    var descriptionTextarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("aria-label", "save").append('<i class="fas fa-save" aria-hidden="true"></i>');
    var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append('<i class="fas fa-save" aria-hidden="true"></i>');
  
    timeBlock.attr("id", "hour-" + i);
    timeBlock.append(hourColumn, descriptionTextarea, saveButton);
    $(".container-lg").append(timeBlock);
  }



  // Code to grab the user input from local storage
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    
    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });


  // Code to display current date in the header of the page
  var currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  




  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});