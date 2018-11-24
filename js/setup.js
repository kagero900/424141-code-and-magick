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
  COUNT: 4
};

var userDialog = document.querySelector('.setup');
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

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }

  similarListElement.appendChild(fragment);
};

var removeClass = function (element, className) {
  element.classList.remove(className);
};

var openUserDialog = function () {
  var wizards = generateWizards();
  createSimilarWizards(wizards);
  removeClass(userDialog, 'hidden');
  removeClass(similarList, 'hidden');
};

openUserDialog();
