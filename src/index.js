const choiceList = ["rock", "paper", "scissors"];
let gameScore = 0;

$("#btn-game-ruler").click(function () {
  $(".game-rules").addClass("help");
});

$("#gamebtn-close").click(function () {
  $(".game-rules").removeClass("help");
});

const computerSelection = function () {
  let randomIndex = Math.floor(Math.random() * choiceList.length);
  let pickedChoice = choiceList[randomIndex];
  $(`#${pickedChoice}`).clone().appendTo("#computer-side");
  return randomIndex;
};

const playPressedSound = function () {
  let audio = new Audio("./sound/pressed.wav");
  audio.crossOrigin = 'anonymous';
  audio.play();
};

const playWinSound = function () {
  let audio = new Audio("./sound/win.wav");
  audio.play();
};

const playLoseSound = function () {
  let audio = new Audio("./sound/lose.wav");
  audio.play();
};

const playerSelection = function (key) {
  key.clone().appendTo("#player-side");
  let playerChoice = choiceList.indexOf(key.attr("id"));
  let computerChoice = computerSelection();
  if (playerChoice === computerChoice) {
    $("#game-status").text("DRAW");
  } else {
    if (computerChoice === (playerChoice + 1) % 3) {
      $("#game-status").text("YOU LOSE");
      playLoseSound();
      $("#computer-side div").addClass("winner-effect");
    } else {
      $("#game-status").text("YOU WIN");
      playWinSound();
      $("#player-side div").addClass("winner-effect");
      $(".score-number").text(`${++gameScore}`);
    }
  }
};

$(".choice-wrapper").click(function (event) {
  playPressedSound();
  $(".game-container").addClass("toggle");
  let choice = $(event.currentTarget);
  playerSelection(choice);
  $("#game-startover").click(function () {
    $("#player-side div").remove();
    $("#computer-side div").remove();
    $(".game-container").removeClass("toggle");
  });
});
