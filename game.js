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

var pressed = 0;

//Keyboard input to start
$('.click').click(function () {
  ++pressed;
  var userChosenButton = $(this).attr('id');
  userClickedPattern.push(userChosenButton);

  $(this).addClass('pressed');
  setTimeout(() => {
    $(this).removeClass('pressed');
  }, 300);
  if (!checkAnswer(pressed)) {
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();
    $('#level-title').text('Game Over, press any key to Restart');
    for (var i = 1; i < 10; i++) {
      $('#btn-' + i).addClass('game-over');
      if (i < 6) {
        $('#circle-' + i).removeClass('green');
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
  } else {
    playSound(userChosenButton.slice(4, 5));
  }
});

// //Touch input to start
// $('.game-start').on('tap', function () {
//   $('#level-title').css('font-size', '2rem');
//   if (!started) {
//     nextSequence();
//     $('#lvl-' + level).addClass('green');
//     started = true;
//   }
//   $('.game-start').css('display', 'none');
// });

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

$('#btn-1').addClass('.disabled');

function nextSequence() {
  pressed = 0;
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  $('#lvl-' + level).addClass('green');
  var randomNumber = Math.floor(Math.random() * 9) + 1;
  var randomChosenNumber = buttonNumbers[randomNumber - 1];
  gamePattern.push(randomChosenNumber);

  var i = 0;
  setInterval(setTime, 500);
  function setTime() {
    if (i < gamePattern.length) {
      var value = gamePattern[i].slice(4, 5);
      $('#scr-' + value)
        .toggleClass('blue')
        .delay(400)
        .queue(function () {
          $(this).removeClass('blue').dequeue();
        });
      playSound(value);
    }
    i++;
  }
  var j = 0;
  setInterval(setWaitTime, 500);
  function setWaitTime() {
    if (j < gamePattern.length) {
      for (var z = 1; z < 10; z++) {
        $('#btn-' + z)
          .toggleClass('block-input')
          .delay(400)
          .queue(function () {
            $(this).removeClass('block-input').dequeue();
          });
      }
    }
    j++;
  }
}

function dequeAnswers(length) {
  for (var i = 0; i < length; i++) {
    $('#circle-' + i).removeClass('green');
  }
}

function returnInterval(interval) {
  return interval;
}

$(function () {
  setInterval(function () {
    $('.start').fadeOut(500).fadeIn(500);
  }, 2000);
});
var counter = 0;
function checkAnswer(answer) {
  answer = answer - 1;
  if (answer === 0) {
    counter = 0;
  }
  if (gamePattern[answer] === userClickedPattern[answer]) {
    counter++;
    $('#circle-' + counter).addClass('green');
  } else return false;
  if (counter === gamePattern.length) {
    nextSequence();
    setTimeout(dequeAnswers, 300, gamePattern.length);
    return true;
  }
  return true;
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $('#level-title').css('font-size', '1.5rem');
}

function playSound(number) {
  var audio = new Audio('./sounds/sound-' + number + '.mp3');
  audio.play();
}
