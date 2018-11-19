'use strict';

var INITIAL_X = 155; // вроде они не совсем к бару относятся... просто начало отрисовки и бара, и текстов
var INITIAL_Y = 240;
// var barHeight = 150;
// var BAR_WIDTH = 40;
// var BAR_GAP = 50;
// var INDENT = BAR_WIDTH + BAR_GAP;

var Bar = {
  WIDTH: 40,
  MAX_HEIGHT: 150,
  OFFSET: 90
};

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var Text = {
  FONT: '16px PT Mono',
  COLOR: '#000',
  GAP: 25
};

var renderCloud = function (ctx) {
  ctx.fillStyle = Cloud.SHADOW_COLOR;
  ctx.fillRect(Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, Cloud.WIDTH, Cloud.HEIGHT);
  ctx.fillStyle = Cloud.COLOR;
  ctx.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInRange = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var renderText = function (ctx, options) {
  ctx.fillStyle = Text.COLOR;
  ctx.font = Text.FONT;
  ctx.fillText(options.text, options.x, options.y);
};

/* var renderBar = function (ctx) {
  //
};*/

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx);

  var winnerMessage = {
    text: 'Ура вы победили!',
    x: 155,
    y: 30
  };

  var resultMessage = {
    text: 'Список результатов:',
    x: 155,
    y: 55
  };

  renderText(ctx, winnerMessage);
  renderText(ctx, resultMessage);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barColor = 'hsl(240, ' + getRandomInRange(0, 100) + '%, 50%)';
    var time = Math.round(times[i]);
    var step = Bar.MAX_HEIGHT / maxTime;

    var heroesNames = {
      text: names[i],
      x: INITIAL_X + Bar.OFFSET * i, // в трёх местах одна и та же запись! как блин это в функцию запихнуть
      y: INITIAL_Y + Text.GAP
    };

    var heroesTimes = {
      text: time,
      x: INITIAL_X + Bar.OFFSET * i,
      y: INITIAL_Y - step * times[i] - Text.GAP / 2
    };

    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : barColor;
    // ctx.fillRect(INITIAL_X + Bar.OFFSET * i, INITIAL_Y, Bar.WIDTH, -(step * times[i]));

    renderText(ctx, heroesTimes);
    renderText(ctx, heroesNames);
  }
};
