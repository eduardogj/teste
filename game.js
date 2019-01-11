// !ARRAY CREATION!
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;


// ****************GAME START****************

$(document).keypress(function() {
  if (started === false) {
    started = true;
    $("h1").text("INICIANDO...");
    setTimeout(function() {
      nextSequence();
      $("#level-title").text("NÍVEL " + gamePattern.length);
    }, 1000);
  }
});

$("h1").on("click", function() {
  if (started === false) {
    started = true;
    $("h1").text("INICIANDO...");
    setTimeout(function() {
      nextSequence();
      $("#level-title").text("NÍVEL " + gamePattern.length);
    }, 1000);
  }
});


// ****************SEQUENCE CREATION****************
function nextSequence() {
  // HERE A RANDOM NUMBER IS CREATED - BETWEEN 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  // HERE I INDICATE THE CORRESPONDENT ELEMENT OF THE ARRAY ACCORDING TO THE NUMBER
  var randomChosenColour = buttonColours[randomNumber];
  // HERE I ADD THE COLOR TO THE ARRAY gamePattern[]
  gamePattern.push(randomChosenColour);
  // HERE THE BOX FLASHES
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  // console.log(randomChosenColour);   --- Here we can see the color.
  // HERE SOUND PLAYS
  var name = randomChosenColour;
  playSound(name);
  $("#level-title").text("NÍVEL " + userClickedPattern.length);
}

// ****************CLICKING EVENTS****************
// BUTTON CLICKED, GOES TO userClickedPattern
$(".btn").on("click", function() {

  if (started === true) {
    // console.log($(this).attr("id"));   --- Here we can se the color.
    userClickedPattern.push(($(this).attr("id")));
    var name = $(this).attr("id");
    var currentColour = $(this).attr("id"); //----PARA CLICK EFFECT
    playSound(name);
    animatePress(currentColour); //----PARA CLICK EFFECT
    checkAnswer(userClickedPattern.length - 1); //AQUI EU MANDO A POSIÇÃO DO ARRAY DO ULTIMO ITEM ANTES DO CLIQUE
  }
});

// ****************PLAY SOUND****************
function playSound(name) {

  switch (name) {

    case "red":
      var redsound = new Audio('./sounds/red.mp3');
      redsound.play();
      break;

    case "blue":
      var bluesound = new Audio('./sounds/blue.mp3');
      bluesound.play();
      break;

    case "green":
      var greensound = new Audio('./sounds/green.mp3');
      greensound.play();
      break;

    case "yellow":
      var yellowsound = new Audio('./sounds/yellow.mp3');
      yellowsound.play();
      break;

    default:
      console.log("what?");
  }


}

// ****************CLICK EFFECT***************
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// ****************CHECK ANSWER***************
// AQUI ELE PEGA A POSIÇÃO DO ARRAY E CHECA. NO PRIMEIRO IF, ELE VE SE A SELECAO === AO DO GERADO AUTOMATICAMENTE
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }

  } else {
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("FIM DE JOGO, PRESSIONE AQUI PARA INICIAR");
    startOver();
  }
}

// ****************CHECK ANSWER***************
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
