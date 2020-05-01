var gamePattern=[];
var userClickedPattern=[];
var level=0;
var keyCount=0;

var buttonColors=["red","blue","green","yellow"];



$(document).on("keydown",function(){
  if(keyCount===0){
  nextSequence();
  keyCount=+1;
}
});


/************************************************************************************************/

function nextSequence(){
  level++;
  userClickedPattern=[];
  $("#level-title").text("Level "+level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);     /*** for creating blinking effect***/

  playSound(randomChosenColor);               /**********to play sound random***********/

}

$(".btn").on("click",handler);   /*****************To find out which button is clicked*************/

function handler(event){
 var userChosenColor=this.id;
 userClickedPattern.push(userChosenColor);
 playSound(userChosenColor);
 animatePress(userChosenColor);
 var clickedIndexNum=(userClickedPattern.length-1);
 checkAnswer(clickedIndexNum);
}
/************************************adding sound to user clicks***************************************/

function playSound(name){
  var buttonMusic= new Audio('sounds/'+name+'.mp3');
  buttonMusic.play();
}

/**********************************adding animation to user clicks*************************************/
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
  },100);
}

/********************************************Checking Function*************************************/
function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    // console.log("sucess");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);

    $("h1").text("Game-Over Press any key to Restart");
    startOver();
  }
}

/***************************************Restarting the game**********************************************/
function startOver(){
  gamePattern=[];
  level=0;
  keyCount=0;
}
