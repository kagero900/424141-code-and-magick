'use strict';

var Bar = {
  INITIAL_X: 155,
  INITIAL_Y: 240,
  WIDTH: 40,
  MAX_HEIGHT: 150,
  OFFSET: 90,
  MIN_SATURATE: 0,
  MAX_SATURATE: 100
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

var renderBar = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barColor = 'hsl(240, ' + getRandomInRange(Bar.MIN_SATURATE, Bar.MAX_SATURATE) + '%, 50%)';
    var time = Math.round(times[i]);
    var barHeight = Bar.MAX_HEIGHT * times[i] / maxTime;
    var coordX = Bar.INITIAL_X + Bar.OFFSET * i;

    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : barColor;
    ctx.fillRect(coordX, Bar.INITIAL_Y, Bar.WIDTH, -barHeight);

    var namesOptions = {
      text: names[i],
      x: coordX,
      y: Bar.INITIAL_Y + Text.GAP
    };

    var timesOptions = {
      text: time,
      x: coordX,
      y: Bar.INITIAL_Y - barHeight - Text.GAP / 2
    };

    renderText(ctx, timesOptions);
    renderText(ctx, namesOptions);
  }
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx);

  var winnerMessage = {
    text: 'Ура вы победили!',
    x: Bar.INITIAL_X,
    y: Cloud.Y + Text.GAP
  };

  var resultMessage = {
    text: 'Список результатов:',
    x: Bar.INITIAL_X,
    y: winnerMessage.y + Text.GAP
  };

  renderText(ctx, winnerMessage);
  renderText(ctx, resultMessage);

  renderBar(ctx, names, times);
};


