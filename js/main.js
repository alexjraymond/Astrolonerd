var $getStartedButton = document.querySelector('#get-started');
var $getStartedContainer = document.querySelector('#get-started-container');
var $whatsMySignButton = document.querySelector('#whats-my-sign');
var $birthdayForm = document.querySelector('#birthday-form');
var $dayOfMonthInput = document.querySelector('#day-of-month');
var $horoscopeContainer = document.querySelector('#horoscope-container');

$getStartedButton.addEventListener('click', function () {
  $getStartedContainer.classList.add('hidden');
  $getStartedButton.classList.add('hidden');
  viewSwap('unsure-page');
});

$whatsMySignButton.addEventListener('click', function () {
  viewSwap('birthday-form');
});

var $rowsToSwap = document.querySelectorAll('.view');

function viewSwap(view) {

  data.view = view;
  for (var i = 0; i < $rowsToSwap.length; i++) {
    var $viewValue = $rowsToSwap[i].getAttribute('data-view');
    if ($viewValue === view) {
      $rowsToSwap[i].classList.remove('hidden');
    } else { $rowsToSwap[i].classList.add('hidden'); }

  }
}

function findSign() {
  var days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
  var signs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
  var month = data.userBirthdayMonth;
  var day = data.userBirthDay;
  if (month === 0 && day <= 20) {
    month = 11;
  } else if (day < days[month]) {
    month--;
  }
  var desiredSign = signs[month];
  data.userSign = desiredSign;
  return desiredSign;

}

$birthdayForm.addEventListener('submit', function (event) {
  event.preventDefault();
  for (var i = 0; i < $birthdayForm.months.length; i++) {
    if ($birthdayForm.months[i].checked) {
      data.userBirthdayMonth = $birthdayForm.months[i].value;
      data.userBirthDay = $dayOfMonthInput.value;
    }
  }

  getSignData();
  viewSwap('horoscope-page');
});

function getSignData() {
  var signInput = findSign(data);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://aztro.sameerkumar.website?sign=' + signInput + '&day=today');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var signObject = xhr.response;
    data.targetScope = signObject;
    // return signObject;
    renderHoroscope();
  });
  xhr.send();
}

function renderHoroscope() {

  var $dateRow = document.createElement('div');
  var $dateCol = document.createElement('div');
  var $dateRange = document.createElement('p');
  var $titleRow = document.createElement('div');
  var $titleCol = document.createElement('div');
  var $titleH1 = document.createElement('h1');
  var $titleImageCol = document.createElement('div');
  var $titleImg = document.createElement('image');
  var $descriptionRow = document.createElement('div');
  var $descriptionCol = document.createElement('div');
  var $descriptionP = document.createElement('p');
  var $smallInfoRow = document.createElement('div');
  var $compatibilityCol = document.createElement('div');
  var $compatibilitySign = document.createElement('p');
  var $compatibilitySignImg = document.createElement('image');
  var $moodCol = document.createElement('div');
  var $moodP = document.createElement('p');
  var $colorCol = document.createElement('div');
  var $colorP = document.createElement('p');
  var $numberCol = document.createElement('div');
  var $numberP = document.createElement('p');

  $dateRow.setAttribute('class', 'row');
  $horoscopeContainer.appendChild($dateRow);

  $dateCol.setAttribute('class', 'col');
  $dateRow.appendChild($dateCol);

  $dateRange.textContent = data.targetScope.date_range;
  $dateCol.appendChild($dateRange);

  $titleRow.setAttribute('class', 'row');
  $horoscopeContainer.appendChild($titleRow);

  $titleCol.setAttribute('class', 'col');
  $titleRow.appendChild($titleCol);

  $titleH1.textContent = data.userSign;
  $titleCol.appendChild($titleH1);

  $titleImageCol.setAttribute('class', 'col');
  $titleRow.appendChild($titleImageCol);

  $titleImg.setAttribute('src', 'images/022-gypsy.png');
  $titleImageCol.appendChild($titleImg);

  $descriptionRow.setAttribute('class', 'row');
  $horoscopeContainer.appendChild($descriptionRow);

  $descriptionCol.setAttribute('class', 'col');
  $descriptionRow.appendChild($descriptionCol);

  $descriptionP.textContent = data.targetScope.description;
  $descriptionCol.appendChild($descriptionP);

  $smallInfoRow.setAttribute('class', 'row');
  $horoscopeContainer.appendChild($smallInfoRow);

  $compatibilityCol.setAttribute('class', 'col');
  $smallInfoRow.appendChild($compatibilityCol);

  $compatibilitySign.textContent = 'Compatibility: ' + data.targetScope.compatibility;
  $compatibilityCol.appendChild($compatibilitySign);

  $compatibilitySignImg.setAttribute('src', 'images/022-gypsy.png');
  $compatibilityCol.appendChild($compatibilitySignImg);

  $moodCol.setAttribute('class', 'col');
  $smallInfoRow.appendChild($moodCol);

  $moodP.textContent = 'Mood: ' + data.targetScope.mood;
  $moodCol.appendChild($moodP);

  $colorCol.setAttribute('class', 'col');
  $smallInfoRow.appendChild($colorCol);

  $colorP.textContent = 'Color: ' + data.targetScope.color;
  $colorCol.appendChild($colorP);

  $numberCol.setAttribute('class', 'col');
  $smallInfoRow.appendChild($numberCol);

  $numberP.textContent = 'Lucky Number: ' + data.targetScope.lucky_number;
  $numberCol.appendChild($numberP);

}
