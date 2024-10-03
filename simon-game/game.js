var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var start=0;
var level=0;


$(document).keypress(function(){
  if(start===0){
    $("#heading").text("Level "+(level+1));
    nextSequence();
    start=1;
  }
});

function nextSequence() {
  userClickedPattern=[];
  level++;

  $("#heading").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColor[randomNumber];
  var color="#"+randomChosenColor;
  gamePattern.push(randomChosenColor);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();

  $(color).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(){
  
  var userChosenColour = $(this).attr("id");
  
  animatePress(userChosenColour);
  playSound(userChosenColour);
  
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("clicked");
  setTimeout(function(){
    $("#"+currentColor).removeClass("clicked");
  },100);

}

function checkAnswer(CurrentLevel){
  
  if(gamePattern[CurrentLevel]===userClickedPattern[CurrentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  }
  else{
    
    $("body").addClass("game-over");
    setTimeout(function(){
     $("body").removeClass("game-over");
    },200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("#heading").text("Game Over, Press Any Key to Restart");
      StartOver();
  }
}

function StartOver(){
  start=0;
  level=0;
  gamePattern=[];
}