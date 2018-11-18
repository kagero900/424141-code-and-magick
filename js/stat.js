'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;

var INITIAL_X = 155;
var INITIAL_Y = 240;
var barHeight = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var INDENT = BAR_WIDTH + BAR_GAP;

var FONT_GAP = 25;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var textLines = [
  'Ура вы победили!',
  'Список результатов:'
];

var renderWinText = function (ctx, font, text, x, y, color) {
  ctx.fillStyle = color; // not DRY?
  ctx.font = font;
  for (var i = 0; i < text.length; i++) {
    ctx.fillText(text[i], x, y * (i + 1)); // явная лажа
  }
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderWinText(ctx, '16px PT Mono', textLines, INITIAL_X, FONT_GAP, '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var color = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')'; // кроме 0!!! ток хз как
    var time = Math.round(times[i]);

    /* names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = color; */
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = color;
    }
    ctx.fillRect(INITIAL_X + INDENT * i, INITIAL_Y, BAR_WIDTH, -(barHeight * times[i] / maxTime));
    ctx.fillStyle = '#000';
    ctx.fillText(time, INITIAL_X + INDENT * i, INITIAL_Y - barHeight * times[i] / maxTime - FONT_GAP / 2);
    ctx.fillText(names[i], INITIAL_X + INDENT * i, INITIAL_Y + FONT_GAP);
  }
};
