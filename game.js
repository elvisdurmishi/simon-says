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

  console.log(userChosenButton);

  userClickedPattern.push(userChosenButton);

  $(this).addClass('pressed');
  setTimeout(() => {
    $(this).removeClass('pressed');
  }, 300);
  if (!checkAnswer(pressed)) {
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

//Touch input to start
$('.game-start').on('tap', function () {
  $('#level-title').css('font-size', '2rem');
  if (!started) {
    nextSequence();
    $('#lvl-' + level).addClass('green');
    started = true;
  }
  $('.game-start').css('display', 'none');
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

$('#btn-1').addClass('.disabled');

function nextSequence() {
  pressed = 0;
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  $('#lvl-' + level).addClass('green');
  var randomNumber = Math.floor(Math.random() * 9) + 1;
  var randomChosenNumber = buttonNumbers[randomNumber - 1];
  console.log(randomChosenNumber);
  gamePattern.push(randomChosenNumber);

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
var counter = 0;
function checkAnswer(answer) {
  answer = answer - 1;
  if (answer === 0) {
    counter = 0;
  }
  if (gamePattern[answer] === userClickedPattern[answer]) {
    counter++;
  } else return false;
  if (counter === gamePattern.length) {
    nextSequence();
    return true;
  }
  return true;
}

// function checkAnswer(answer) {
//   var counter = 0;
//   for (var i = 0; i < gamePattern.length; i++) {
//     if (gamePattern[i] === userClickedPattern[i]) {
//       if (userClickedPattern.length === gamePattern.length) {
//         counter++;
//       }
//     } else if (userClickedPattern[answer - 1] === gamePattern[answer - 1]) {
//       return false;
//     }
//   }
//   if (counter === gamePattern.length) {
//     nextSequence();
//     return true;
//   }
//   if (answer < gamePattern.length) {
//     return true;
//   } else return false;
// }

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $('#level-title').css('font-size', '1.5rem');
}
