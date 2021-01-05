function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 9) + 1;
  console.log(randomNumber);
  var randomChosenNumber = buttonNumbers[randomNumber - 1];
  console.log(randomChosenNumber);
  gamePattern.push(randomChosenNumber);

  $('#scr-' + randomNumber)
    .toggleClass('blue')
    .delay(800)
    .queue(function () {
      $(this).removeClass('blue').dequeue();
    });

  //   var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
  //   audio.play();
}

$(function () {
  setInterval(function () {
    $('.start').fadeOut(500).fadeIn(500);
  }, 2000);
});

var buttonNumbers = [
  'btn-1',
  'btn-2',
  'btn-3',
  'btn-4',
  'btn-5',
  'btn-6',
  'btn-7',
  'btn-8',
  'btn-9',
];

var gamePattern = [];

var userClickedPattern = [];

$('.click').click(function () {
  var userChosenButton = $(this).attr('id');

  console.log(userChosenButton);

  userClickedPattern.push(userChosenButton);

  $(this).addClass('pressed');
  setTimeout(() => {
    $(this).removeClass('pressed');
  }, 300);
});

var keyPressed = false;

$(document).keypress(function () {
  $('.game-start').css('display', 'none');
  keyPressed = true;
});

if (keyPressed === true) {
  nextSequence();
}
