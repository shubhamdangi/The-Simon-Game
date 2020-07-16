
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];
var level = 0;                    // setting the initial level to zero
var started = false;



// execution of the game
//detecting the first keypress and taking further actions
$(document).keydown(function() {
  if(!started){
    $("#level-title").text("Level " +level);  // h1 changes according to level
    nextSequence();
    started = true;
  }
});


// function for generating the next sequence and taking further actions on it
function nextSequence() {
  userClickedPattern = [];                          // resetting pattern to empty array
  level++;                                            // increasing the level every time the fucntion is called
  $("#level-title").text("Level - " +level);             // increamenting level on every function call
  var randomNumber = Math.floor(Math.random()*4);           // generating a random number
  var randomChosenColour = buttonColours[randomNumber];     // linking that number to a color
  gamePattern.push(randomChosenColour);
  $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" +randomChosenColour +".mp3");
  audio.play();


}



// detecting the color of the clicked button
$(".btn").click(function () {
  
  var userChosenColour = $(this).attr("id");    // storing the id of the clicked button
  userClickedPattern.push(userChosenColour);    // pushing the clicked color into the empty pattern array
  var audio = new Audio("sounds/" +userChosenColour +".mp3");   
  audio.play();                                                // playing the linked sound on button press 
  console.log(userClickedPattern);
  animatePress(userChosenColour);                               // calling animation function for pressed button
  // Calling checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the users sequence.
  checkAnswer(userClickedPattern.length-1);
  
});

// function to apply animation on the pressed button
function animatePress(currentColour){
  $("#" +currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" +currentColour).removeClass("pressed");
    
  },100);                                                   // get id, apply class, and rmv class after a delay of 100 miliseconds
  
}

// checking the user input
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
        
      },1000);
    }
  }else{
    console.log("wrong");
    var wrong = new Audio ("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");                            // turning the background color to red when user hit the wrong button
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("GAME OVER! Press Any Key to Restart");     // changing the h1 on wrong choice
    startOver();
    if (window.confirm('Click OK to learn the game, or Cancel and Continue..')){
      window.location.href='https://www.youtube.com/watch?v=vLi1qnRmpe4';
};                                                      
  }
  
}

// to restart the game
function startOver(params) {
  level = 0;                                    // re-setting all the values
  gamePattern = [];
  started = false;
}