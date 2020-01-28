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
var CLOUD_SHAPE = [
  ['arc', 160, 140, 60],
  ['arc', 240, 90, 80],
  ['arc', 485, 120, 30],
  ['ellipse', 330, 140, 190, 100],
  ['arc', 415, 100, 80],
  ['ellipse', 380, 200, 140, 80],
  ['arc', 195, 160, 80],
  ['ellipse', 220, 220, 120, 60]
];
var TOP_TEXTS = [
  {
    text: 'Ура вы победили!',
    x: 175,
    y: 47
  },
  {
    text: 'Список результатов:',
    x: 185,
    y: 65
  }
];
var MY_NAME_FOR_STATISTIC = 'Вы';

function Coord(x, y) {
  return {x: x, y: y};
}

var ctxCallBuilder = {
  'arc': function (ctx, center, radius) {
    ctx.arc(center.x, center.y, radius, 0, CIRCUMFERENCE);
  },
  'ellipse': function (ctx, center, radiusX, radiusY) {
    ctx.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, CIRCUMFERENCE);
  },
  'fillRect': function (ctx, coordinates, width, height) {
    ctx.fillRect(coordinates.x, coordinates.y, width, height);
  }
};

var renderFigure = function (ctx, params, color, shift) {
  if (!shift) {
    shift = new Coord(0, 0);
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  params.forEach(function (args) {
    var center = new Coord(args[1] + shift.x, args[2] + shift.y);
    ctxCallBuilder[args[0]](ctx, center, args[3], args[4]);
  });
  ctx.closePath();
  ctx.fill();
};

var getRectColor = function (name) {
  var color = MY_STATISTIC_COLOR;
  if (name !== MY_NAME_FOR_STATISTIC) {
    var saturation = Math.ceil(Math.random(0, 100) * 100);
    color = 'hsl(240deg, ' + saturation + '%, 50%)';
  }
  return color;
};

var getTextStartX = function (startX, blockWidth, letterWidth, textLength) {
  var textStartX = startX + blockWidth / 2 - letterWidth * textLength / 2;
  return textStartX;
};

var renderText = function (ctx, text, coordinates) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_PARAMS;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, coordinates.x, coordinates.y);
};

window.renderStatistics = function (ctx, names, times) {
  renderFigure(ctx, CLOUD_SHAPE, SHADOW_COLOR, new Coord(10, 10));
  renderFigure(ctx, CLOUD_SHAPE, CLOUD_COLOR, new Coord(0, 0));

  TOP_TEXTS.forEach(function (item) {
    renderText(ctx, item.text, new Coord(item.x, item.y));
  });

  var maxTime = Math.max.apply(null, times);

  var marginLeft = STATISTIC_MARGIN_X + STATISTIC_WIDTH;
  var startX = STATISTIC_START_X;
  var nameStartY = STATISTIC_START_Y + STATISTIC_HEIGHT + NAME_TOP_MARGIN;

  for (var l = 0; l < times.length; l++, startX += marginLeft) {
    var height = Math.ceil(STATISTIC_HEIGHT * times[l] / maxTime);
    var startY = STATISTIC_START_Y + STATISTIC_HEIGHT - height;
    var color = getRectColor(names[l]);
    var rectangle = [['fillRect', startX, startY, STATISTIC_WIDTH, height]];
    renderFigure(ctx, rectangle, color);

    var nameLength = names[l].length;
    var nameStartX = getTextStartX(startX, STATISTIC_WIDTH, LETTER_WIDTH, nameLength);
    renderText(ctx, names[l], new Coord(nameStartX, nameStartY));

    var time = Math.ceil(times[l]).toString();
    var timeLength = time.length;
    var timeStartX = getTextStartX(startX, STATISTIC_WIDTH, LETTER_WIDTH, timeLength);
    var timeStartY = startY - TIME_TEXT_TOP_MARGIN;
    renderText(ctx, time, new Coord(timeStartX, timeStartY));
  }
};
