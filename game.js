
// Variables
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


// Press A to start!
$(document).keypress(function(event) {
    if (event.key === "a" && level === 0) {
nextSequence();
}
});


// Next sequence of buttons to press - nextSequence function
function nextSequence() {
level++;
$("h1").text("Level " + level); // Level header
randomNumber = Math.floor(Math.random() * 4); // Roll a color
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor) // Add randomly rolled color to game's generated pattern array
setTimeout(function() {
$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // Animate next button in sequence by blinking
}, 1000);
}

// Play sound effects - playSound function
function playSound(name) {
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}


// User clicks button do this v
$(".btn").click(function() {
var userChosenColor = $(this).attr("id");
userClickedPattern.push(userChosenColor); // Add latest array
playSound(userChosenColor);
animatePress($(this));
console.log(userClickedPattern);
checkColor(userChosenColor);
});

// Button Animation - animatePress function
function animatePress(currentColor) {
currentColor.toggleClass("pressed");
setTimeout(function() {
currentColor.toggleClass("pressed");
}, 100);
}

// Checks if user pattern is finished against game's pattern
function sequenceFinishCheck() {
  if (userClickedPattern.length < gamePattern.length) {
    return "fail"
  }
  else {
    nextSequence();
  resetUserPattern();
  }
}

// Returns "true" if picked color is same as gamePattern's matching array number
function checkColor(colorPicked) {
if (colorPicked === gamePattern[0]) {
sequenceFinishCheck();
}
else if (colorPicked === gamePattern[userClickedPattern.length - 1]) {
sequenceFinishCheck();
}
  else {
lose();
  }
}


// Reset pattern
function resetUserPattern() {
userClickedPattern = [];
}

// Lose game and reset level
function lose() {
  $("h1").text("You lose! Better luck next time");
  setTimeout(function() {
  $("h1").text("Press A to Start");
}, 1000);
  resetUserPattern();
  level = 0;
  gamePattern = [];
}
