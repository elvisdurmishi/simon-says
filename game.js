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
  if (!checkAnswer(userClickedPattern.length - 1)) {
    $('#level-title').text('Game Over, press any key to Restart');
    for (var i = 1; i < 10; i++) {
      $('#btn-' + i).addClass('game-over');
      if (i < 6) {
        $('#circle-' + i).addClass('game-over');
      }
    }
    setTimeout(() => {
      for (var i = 1; i < 10; i++) {
        $('#btn-' + i).removeClass('game-over');
        if (i < 6) {
          $('#circle-' + i).removeClass('game-over');
          $('#lvl-' + i).removeClass('green');
        }
      }
    }, 500);
    startOver();
  }
});

var started = false;
var level = 0;

$(document).keypress(function () {
  $('#level-title').css('font-size', '2rem');
  if (!started) {
    nextSequence();
    $('#lvl-' + level).addClass('green');
    started = true;
  }
  $('.game-start').css('display', 'none');
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  $('#lvl-' + level).addClass('green');
  var randomNumber = Math.floor(Math.random() * 9) + 1;
  var randomChosenNumber = buttonNumbers[randomNumber - 1];
  console.log(randomChosenNumber);
  gamePattern.push(randomChosenNumber);
  console.log(gamePattern.length);

  var totalSeconds = 0;
  var i = 0;
  setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    if (i < gamePattern.length) {
      var value = gamePattern[i].slice(4, 5);
      $('#scr-' + value)
        .toggleClass('blue')
        .delay(800)
        .queue(function () {
          $(this).removeClass('blue').dequeue();
        });
    }
    i++;
  }
}

$(function () {
  setInterval(function () {
    $('.start').fadeOut(500).fadeIn(500);
  }, 2000);
});

function checkAnswer() {
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
        return true;
      }
      return true;
    }
  }
  return false;
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $('#level-title').css('font-size', '1.5rem');
}
