'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var Wizards = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария',
    'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла',
    'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
    'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  COUNT: 4
};

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < Wizards.COUNT; i++) {
    wizards.push({
      name: getRandomElement(Wizards.NAMES) + ' ' + getRandomElement(Wizards.SURNAMES),
      coatColor: getRandomElement(Wizards.COAT_COLORS),
      eyesColor: getRandomElement(Wizards.EYES_COLORS)
    });
  }
  return wizards;
};

var wizards = generateWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizards = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

createSimilarWizards();

