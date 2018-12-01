'use strict';

var Wizard = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария',
    'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла',
    'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
    'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  COUNT: 4
};

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userInput = userDialog.querySelector('.setup-user-name');

var similarList = userDialog.querySelector('.setup-similar');
var similarListElement = similarList.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < Wizard.COUNT; i++) {
    wizards.push({
      name: getRandomElement(Wizard.NAMES) + ' ' + getRandomElement(Wizard.SURNAMES),
      coatColor: getRandomElement(Wizard.COAT_COLORS),
      eyesColor: getRandomElement(Wizard.EYES_COLORS)
    });
  }
  return wizards;
};

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createWizard(arr[i]));
  }

  similarListElement.appendChild(fragment);
};

var openUserDialog = function () { // пожалуй, надо переименовать, например в showSimilarWizards
  var wizards = generateWizards();
  createSimilarWizards(wizards);
  // userDialog.classList.remove('hidden');
  similarList.classList.remove('hidden');
};

openUserDialog();

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
    userDialog.classList.add('hidden');
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});


// Если фокус находится на форме ввода имени, то окно по ESC закрываться не должно.
userInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupEscPressHandler); // это ж кусок функции
});
userInput.addEventListener('blur', function () {
  document.addEventListener('keydown', popupEscPressHandler); // и опять кусок функции
});


// Изменение цвета мантии, глаз и фаербола по клику на соответствующем элементе
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var changeCoatColor = function () {
  var wizardCoatColor = getRandomElement(Wizard.COAT_COLORS);
  wizardCoat.style.fill = wizardCoatColor;
  userDialog.querySelector('input[name="coat-color"]').value = wizardCoatColor;
};

var changeEyesColor = function () {
  var wizardEyesColor = getRandomElement(Wizard.EYES_COLORS);
  wizardEyes.style.fill = wizardEyesColor;
  userDialog.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
};

var changeFireballColor = function () {
  var wizardFireballColor = getRandomElement(Wizard.FIREBALL_COLORS);
  wizardFireball.style.backgroundColor = wizardFireballColor;
  userDialog.querySelector('input[name="fireball-color"]').value = wizardFireballColor;
};

wizardCoat.addEventListener('click', function () { // так вообще можно?))
  changeCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeEyesColor();
});

wizardFireball.addEventListener('click', function () {
  changeFireballColor();
});
