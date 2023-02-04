/* global Chart */

var $getStartedButton = document.querySelector('#get-started');
var $getStartedContainer = document.querySelector('#get-started-container');
var $whatsMySignButton = document.querySelector('#whats-my-sign');
var $birthdayForm = document.querySelector('#birthday-form');
var $dayOfMonthInput = document.querySelector('#day-of-month');
var $horoscopeContainer = document.querySelector('#horoscope-container');
var $signButtons = document.querySelectorAll('.sign-button');
var $iKnowMySignButton = document.querySelector('#i-know-my-sign');
var $logoNavBar = document.querySelector('#logo');
var signs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

$logoNavBar.addEventListener('click', function () {
  viewSwap('unsure-page');
  clearTheDom();
});

$getStartedButton.addEventListener('click', function () {
  $getStartedContainer.classList.add('hidden');
  $getStartedButton.classList.add('hidden');
  viewSwap('unsure-page');
});

$whatsMySignButton.addEventListener('click', function () {
  viewSwap('birthday-form');
});

$iKnowMySignButton.addEventListener('click', function () {
  viewSwap('sign-selection');
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
  data.signLink = './images/' + desiredSign + '.png';
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
    data.compatSign = data.targetScope.compatibility;
    data.compatSignLink = './images/' + data.compatSign + '.png';
    // return signObject;
    renderHoroscope();
  });
  xhr.send();
}

function renderHoroscope() {

  var $invisibleSpan = document.createElement('span');
  var $dateRow = document.createElement('div');
  var $dateCol = document.createElement('div');
  var $dateRange = document.createElement('span');
  var $titleRow = document.createElement('div');
  var $titleCol = document.createElement('div');
  var $titleSpan = document.createElement('span');
  var $titleImg = document.createElement('img');
  var $descriptionRow = document.createElement('div');
  var $descriptionCol = document.createElement('div');
  var $descriptionP = document.createElement('p');
  var $smallInfoRow = document.createElement('div');
  var $compatibilityCol = document.createElement('button');
  var $compatibilitySign = document.createElement('span');
  var $compatibilitySignImg = document.createElement('img');
  var $moodCol = document.createElement('div');
  var $moodP = document.createElement('p');
  var $colorCol = document.createElement('div');
  var $colorP = document.createElement('p');
  var $numberCol = document.createElement('div');
  var $numberP = document.createElement('p');

  var $chooseNewSignButtonCol = document.createElement('div');
  var $chooseNewSignButton = document.createElement('button');

  var $yesterdayButton = document.createElement('button');
  var $tomorrowButton = document.createElement('button');
  var $todayButton = document.createElement('button');

  var $selectedDateSpan = document.createElement('span');

  const $dataButton = document.createElement('button');
  const $dataCol = document.createElement('div');

  $horoscopeContainer.appendChild($invisibleSpan);

  $dateRow.setAttribute('class', 'row');
  $invisibleSpan.setAttribute('class', 'mb-5 invisible-span');
  $invisibleSpan.appendChild($dateRow);

  $dateCol.setAttribute('class', 'col justify-content-between d-flex mb-1');
  $dateRow.appendChild($dateCol);

  $dateRange.textContent = data.targetScope.date_range;
  $dateRange.setAttribute('class', 'blue-bubble');
  $dateCol.appendChild($dateRange);

  $titleRow.setAttribute('class', 'row pink-bubble justify-content-center align-items-center');
  $invisibleSpan.appendChild($titleRow);

  if (data.compatTrigger === null) {
    $selectedDateSpan.setAttribute('class', 'blue-bubble');
    $selectedDateSpan.textContent = data.targetScope.current_date;
    $dateCol.appendChild($selectedDateSpan);
  }

  $titleCol.setAttribute('class', 'col');
  $titleRow.appendChild($titleCol);

  if (data.compatTrigger === 'go') {
    $titleSpan.textContent = data.compatSign;
    $titleImg.setAttribute('src', data.compatSignLink);
  } else {
    $titleSpan.textContent = data.userSign;
    $titleImg.setAttribute('src', data.signLink);
  }

  $titleSpan.setAttribute('class', 'scope-title justify-content-center align-items-center d-flex');
  $titleCol.appendChild($titleSpan);

  $titleImg.setAttribute('class', 'scope-sign');
  $titleSpan.appendChild($titleImg);

  $descriptionRow.setAttribute('class', 'row');
  $invisibleSpan.appendChild($descriptionRow);

  $descriptionCol.setAttribute('class', 'col pink-bubble my-1');
  $descriptionRow.appendChild($descriptionCol);

  $descriptionP.textContent = data.targetScope.description;
  $descriptionCol.appendChild($descriptionP);

  $smallInfoRow.setAttribute('class', 'row row-cols-auto justify-content-center');
  $invisibleSpan.appendChild($smallInfoRow);

  $compatibilityCol.addEventListener('click', function () {
    data.compatTrigger = 'go';
    compatSignData(data.compatSign);
    $compatibilityCol.classList.add('hidden');
  });

  $dataButton.addEventListener('click', () => {
    viewSwap('data-page');
  });

  $compatibilityCol.setAttribute('class', 'col padding-left-0 blue-bubble change-btn btn justify-content-center align-items-center d-flex');

  if (data.compatTrigger === null) {
    $smallInfoRow.appendChild($compatibilityCol);
  }

  $compatibilitySign.textContent = 'Compatibility: ' + data.targetScope.compatibility;
  $compatibilitySign.setAttribute('class', 'justify-content-center align-items-center d-flex');
  $compatibilityCol.appendChild($compatibilitySign);

  $compatibilitySignImg.setAttribute('src', data.compatSignLink);
  $compatibilitySignImg.setAttribute('class', 'compat-sign');
  $compatibilitySign.appendChild($compatibilitySignImg);

  $moodCol.setAttribute('class', 'col pink-bubble justify-content-center align-items-center d-flex margin-right-12');
  $smallInfoRow.appendChild($moodCol);

  $moodP.textContent = 'Mood: ' + data.targetScope.mood;
  $moodCol.appendChild($moodP);

  $colorCol.setAttribute('class', 'col pink-bubble justify-content-center align-items-center d-flex margin-right-12');
  $smallInfoRow.appendChild($colorCol);

  $colorP.textContent = 'Color: ' + data.targetScope.color;
  $colorCol.appendChild($colorP);

  $numberCol.setAttribute('class', 'col pink-bubble justify-content-center align-items-center d-flex');
  $smallInfoRow.appendChild($numberCol);

  $numberP.textContent = 'Lucky Number: ' + data.targetScope.lucky_number;
  $numberCol.appendChild($numberP);

  $dataCol.setAttribute('class', 'justify-content-center align-items-center d-flex');
  $dataButton.textContent = 'Fun Data 🍆';
  $dataButton.setAttribute('class', 'blue-bubble change-btn btn');
  $dataCol.appendChild($dataButton);
  $smallInfoRow.appendChild($dataCol);

  $chooseNewSignButtonCol.setAttribute('class', 'col-12 d-flex justify-content-evenly mb-5');

  if (data.compatTrigger === null) {
    $invisibleSpan.appendChild($chooseNewSignButtonCol);
  }
  $chooseNewSignButton.setAttribute('class', 'blue-bubble change-btn btn justify-content-center align-items-center d-flex mt-5 ');
  $chooseNewSignButton.setAttribute('id', 'choose-new-sign');
  $chooseNewSignButton.textContent = 'Choose New Sign';
  $chooseNewSignButton.addEventListener('click', function () {
    clearTheDom();
    viewSwap('sign-selection');
    data.day = 'today';
  })
  ;
  $yesterdayButton.textContent = 'Look into the Past...';
  $yesterdayButton.setAttribute('class', 'blue-bubble change-btn btn justify-content-center align-items-center d-flex mt-5');

  $yesterdayButton.addEventListener('click', function () {

    for (var i = 0; i < $invisibleSpan.children.length; i++) {

      $invisibleSpan.remove($invisibleSpan.children);
    }
    data.day = 'yesterday';
    clearTheDom();
    getYesterTomorrowData('yesterday');

  });

  $tomorrowButton.textContent = 'Look into the Future...';
  $tomorrowButton.setAttribute('class', 'blue-bubble change-btn btn justify-content-center align-items-center d-flex mt-5');

  $todayButton.textContent = 'Back to the Present';
  $todayButton.setAttribute('class', 'blue-bubble change-btn btn justify-content-center align-items-center d-flex mt-5');

  $tomorrowButton.addEventListener('click', function () {

    for (var i = 0; i < $invisibleSpan.children.length; i++) {

      $invisibleSpan.remove($invisibleSpan.children);
    }
    data.day = 'tomorrow';
    clearTheDom();
    getYesterTomorrowData('tomorrow');
  });

  if (data.day === 'yesterday') {
    $chooseNewSignButtonCol.appendChild($todayButton);
    $chooseNewSignButtonCol.appendChild($chooseNewSignButton);
    $chooseNewSignButtonCol.appendChild($tomorrowButton);
  } if (data.day === 'today') {
    $chooseNewSignButtonCol.appendChild($yesterdayButton);
    $chooseNewSignButtonCol.appendChild($chooseNewSignButton);
    $chooseNewSignButtonCol.appendChild($tomorrowButton);
  } else if (data.day === 'tomorrow') {
    $chooseNewSignButtonCol.appendChild($yesterdayButton);
    $chooseNewSignButtonCol.appendChild($chooseNewSignButton);
    $chooseNewSignButtonCol.appendChild($todayButton);
  }

  $todayButton.addEventListener('click', function () {

    for (var i = 0; i < $invisibleSpan.children.length; i++) {

      $invisibleSpan.remove($invisibleSpan.children);
    }
    data.day = 'today';
    getYesterTomorrowData('today');
  });

  data.compatTrigger = null;
}

function getYesterTomorrowData(input) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://aztro.sameerkumar.website?sign=' + data.userSign + '&day=' + input);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var signObject = xhr.response;
    data.targetScope = signObject;
    data.compatSign = data.targetScope.compatibility;
    data.compatSignLink = './images/' + data.compatSign + '.png';
    renderHoroscope();
  });
  xhr.send();

}

function getKnownSignData(input) {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://aztro.sameerkumar.website?sign=' + input + '&day=today');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var signObject = xhr.response;
    data.targetScope = signObject;
    data.compatSign = data.targetScope.compatibility;
    data.compatSignLink = './images/' + data.compatSign + '.png';
    renderHoroscope();
  });
  xhr.send();

}

for (var i = 0; i < $signButtons.length; i++) {
  $signButtons[i].onclick = function (event) {
    event.preventDefault();
    var firedButton = this.value;
    data.userSign = firedButton;
    data.signLink = './images/' + firedButton + '.png';
    getKnownSignData(firedButton);
    viewSwap('horoscope-page');
  };
}

function compatSignData(input) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://aztro.sameerkumar.website?sign=' + input + '&day=' + data.day);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var signObject = xhr.response;
    data.targetScope = signObject;
    renderHoroscope();
  });
  xhr.send();

}

function clearTheDom() {
  var $allTheInvisibleSpans = document.querySelectorAll('.invisible-span');
  for (var elem of $allTheInvisibleSpans) {
    elem.parentNode.removeChild(elem);
  }
}

const clearTheTableDom = () => {
  var $allTheTableRows = document.querySelectorAll('#data-row');
  for (var elem of $allTheTableRows) {
    elem.parentNode.removeChild(elem);
  }
};

var luckyNumbers = {};
var signColors = {};
var signMoods = {};
var signCompats = {};

function getNerdyData(input) {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://aztro.sameerkumar.website?sign=' + input + '&day=today');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var signObject = xhr.response;

    luckyNumbers[input] = parseInt(signObject.lucky_number);
    signColors[input] = signObject.color;
    signMoods[input] = signObject.mood;
    signCompats[input] = signObject.compatibility;
    if (Object.keys(luckyNumbers).length === 12) { chartCreator(); dynamicDataColors(); generateMoodTable(); }

  });
  xhr.send();

}

function runAllTheHoroscopesForData() {
  var signs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
  for (var i = 0; i < signs.length; i++) {
    getNerdyData(signs[i]);

  }
}

runAllTheHoroscopesForData();

function chartCreator() {
  var data = {
    labels: signs,
    datasets: [{
      label: 'Lucky Number',
      data: [luckyNumbers.Aquarius, luckyNumbers.Pisces, luckyNumbers.Aries, luckyNumbers.Taurus, luckyNumbers.Gemini, luckyNumbers.Cancer, luckyNumbers.Leo, luckyNumbers.Virgo, luckyNumbers.Libra, luckyNumbers.Scorpio, luckyNumbers.Sagittarius, luckyNumbers.Capricorn],
      borderWidth: 1,
      backgroundColor: 'pink',
      borderColor: 'black',
      color: 'white'
    }]
  };
  var config = {
    data,
    type: 'line',
    options: {
      animations: {
        tension: {
          duration: 1500,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  Chart.defaults.font.size = 16;
  Chart.defaults.color = 'white';

  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

function dynamicDataColors() {
  for (var key in signColors) {
    colorsBoxesDom(key, signColors[key]);
  }
}

function colorsBoxesDom(sign, color) {
  var $colorBoxCol = document.createElement('div');
  var $colorTooltipSpan = document.createElement('span');
  var $colorsContainer = document.querySelector('.data-colors-container');
  var boxColId = sign + '-color';
  var tooltipId = sign + '-tooltip';
  $colorTooltipSpan.setAttribute('class', 'color-tooltip');
  $colorTooltipSpan.setAttribute('id', tooltipId);
  $colorTooltipSpan.textContent = sign + ': ' + color;
  if (color.includes(' ')) {
    color = color.split(' ').join('').toLowerCase();
  }
  $colorBoxCol.style.backgroundColor = color;
  $colorBoxCol.setAttribute('class', `col data-colors p-1 m-1 ${color}`);
  $colorBoxCol.setAttribute('id', boxColId);
  $colorsContainer.appendChild($colorBoxCol);
  $colorBoxCol.appendChild($colorTooltipSpan);
}

function tableDataDomGenerator(sign, data) {
  var $tableRow = document.createElement('tr');
  var $tableHead = document.createElement('th');
  var $tableData = document.createElement('td');
  var $tableBodySelector = document.querySelector('.table-group-divider');
  var tableDataId = sign + '-data';

  $tableBodySelector.appendChild($tableRow);
  $tableHead.setAttribute('scope', 'row');
  $tableHead.textContent = sign;
  $tableRow.appendChild($tableHead);
  $tableRow.setAttribute('id', 'data-row');
  $tableData.setAttribute('id', tableDataId);
  $tableData.textContent = data;
  $tableRow.appendChild($tableData);
}

var $moodsBurger = document.querySelector('.moods-burger');
var $compatibilityBurger = document.querySelector('.compatibility-burger');
var $luckyNumbersBurger = document.querySelector('.lucky-numbers-burger');
var $colorsBurger = document.querySelector('.colors-burger');

$moodsBurger.addEventListener('click', function () {
  clearTheTableDom();
  generateMoodTable();
});

$compatibilityBurger.addEventListener('click', function () {
  clearTheTableDom();
  generateCompatTable();
});

$luckyNumbersBurger.addEventListener('click', function () {
  clearTheTableDom();
  generateLuckyNumberTable();
});

$colorsBurger.addEventListener('click', function () {
  clearTheTableDom();
  generateColorsTable();
});

function generateMoodTable() {
  for (var key in signMoods) {
    tableDataDomGenerator(key, signMoods[key]);
  }
}

function generateCompatTable() {
  for (var key in signCompats) {
    tableDataDomGenerator(key, signCompats[key]);
  }
}

function generateLuckyNumberTable() {
  for (var key in luckyNumbers) {
    tableDataDomGenerator(key, luckyNumbers[key]);
  }
}

function generateColorsTable() {
  for (var key in signColors) {
    tableDataDomGenerator(key, signColors[key]);
  }
}
