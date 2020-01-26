'use strict';

var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_COLOR = '#000';
var TEXT_PARAMS = '16px PT Mono';
var NAME_TOP_MARGIN = 5;
var TIME_TEXT_TOP_MARGIN = 16;
var CIRCUMFERENCE = 2 * Math.PI;
var STATISTIC_HEIGHT = 150;
var STATISTIC_WIDTH = 40;
var STATISTIC_MARGIN_X = 50;
var STATISTIC_START_X = 150;
var STATISTIC_START_Y = 100;
var LETTER_WIDTH = 10;
var MY_STATISTIC_COLOR = 'rgba(255, 0, 0, 1)';

var CLOUD_PARAMS = [
  {
    method: 'arc',
    arguments: [160, 140, 60, 0, CIRCUMFERENCE]
  },
  {
    method: 'arc',
    arguments: [240, 90, 80, 0, CIRCUMFERENCE]
  },
  {
    method: 'arc',
    arguments: [485, 120, 30, 0, CIRCUMFERENCE]
  },
  {
    method: 'ellipse',
    arguments: [330, 140, 190, 100, 0, 0, CIRCUMFERENCE]
  },
  {
    method: 'arc',
    arguments: [415, 100, 80, 0, CIRCUMFERENCE]
  },
  {
    method: 'ellipse',
    arguments: [380, 200, 140, 80, 0, 0, CIRCUMFERENCE]
  },
  {
    method: 'arc',
    arguments: [195, 160, 80, 0, CIRCUMFERENCE]
  },
  {
    method: 'ellipse',
    arguments: [220, 220, 120, 60, 0, 0, CIRCUMFERENCE]
  }
];

var renderRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderCloud = function (ctx, cloudParams, color, shiftX, shiftY) {
  ctx.beginPath();
  ctx.fillStyle = color;
  cloudParams.forEach(function (item) {
    var params = [];
    item.arguments.forEach(function (value, i) {
      if (i === 0 && shiftX !== 0) {
        var coordinateX = value + shiftX;
        params.push(coordinateX);
      } else if (i === 1 && shiftY !== 0) {
        var coordinateY = value + shiftY;
        params.push(coordinateY);
      } else {
        params.push(value);
      }
    });
    ctx[item.method].apply(ctx, params);
  });
  ctx.fill();
  ctx.closePath();
};

var getTextStartX = function (startX, blockWidth, letterWidth, textLength) {
  var textStartX = startX + blockWidth / 2 - letterWidth * textLength / 2;
  return textStartX;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_PARAMS, SHADOW_COLOR, 10, 10);
  renderCloud(ctx, CLOUD_PARAMS, CLOUD_COLOR, 0, 0);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_PARAMS;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 175, 47);
  ctx.fillText('Список результатов:', 185, 65);
  var maxTime = 0;
  times.forEach(function (value) {
    maxTime = maxTime < value ? value : maxTime;
  });
  var marginLeft = STATISTIC_MARGIN_X + STATISTIC_WIDTH;
  var startX = STATISTIC_START_X;
  var nameStartY = STATISTIC_START_Y + STATISTIC_HEIGHT + NAME_TOP_MARGIN;
  for (var l = 0; l < times.length; l++, startX += marginLeft) {
    var height = Math.ceil(STATISTIC_HEIGHT * times[l] / maxTime);
    var startY = STATISTIC_START_Y + STATISTIC_HEIGHT - height;
    var color = MY_STATISTIC_COLOR;
    if (names[l] !== 'Вы') {
      var saturation = Math.ceil(Math.random(0, 100) * 100);
      color = 'hsl(240deg, ' + saturation + '%, 50%)';
    }
    renderRectangle(ctx, startX, startY, STATISTIC_WIDTH, height, color);
    var nameLength = names[l].length;
    var nameStartX = getTextStartX(startX, STATISTIC_WIDTH, LETTER_WIDTH, nameLength);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[l], nameStartX, nameStartY);
    var time = Math.ceil(times[l]).toString();
    var timeLength = time.length;
    var timeStartX = getTextStartX(startX, STATISTIC_WIDTH, LETTER_WIDTH, timeLength);
    var timeStartY = startY - TIME_TEXT_TOP_MARGIN;
    ctx.fillText(time, timeStartX, timeStartY);
  }
};
