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

var CLOUD_PARAMS = [
  {
    method: 'arc',
    params: [
      170,
      150,
      60,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'arc',
    params: [
      250,
      100,
      80,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'arc',
    params: [
      495,
      130,
      30,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'ellipse',
    params: [
      340,
      150,
      190,
      100,
      0,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'arc',
    params: [
      425,
      110,
      80,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'ellipse',
    params: [
      390,
      210,
      140,
      80,
      0,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'arc',
    params: [
      205,
      170,
      80,
      0,
      CIRCUMFERENCE
    ]
  },
  {
    method: 'ellipse',
    params: [
      230,
      230,
      120,
      60,
      0,
      0,
      CIRCUMFERENCE
    ]
  }
];

var renderRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  ctx.beginPath();
  ctx.fillStyle = SHADOW_COLOR;
  for (var i = 0; i < CLOUD_PARAMS.length; i++) {
    ctx[CLOUD_PARAMS[i].method].apply(ctx, CLOUD_PARAMS[i].params);
  }
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = CLOUD_COLOR;
  for (var j = 0; j < CLOUD_PARAMS.length; j++) {
    CLOUD_PARAMS[j].params[0] -= 10;
    CLOUD_PARAMS[j].params[1] -= 10;
    ctx[CLOUD_PARAMS[j].method].apply(ctx, CLOUD_PARAMS[j].params);
  }
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_PARAMS;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 175, 47);
  ctx.fillText('Список результатов:', 185, 65);
  var maxTime = 0;
  for (var k = 0; k < times.length; k++) {
    maxTime = maxTime < times[k] ? times[k] : maxTime;
  }
  var marginLeft = STATISTIC_MARGIN_X + STATISTIC_WIDTH;
  var startX = STATISTIC_START_X;
  var nameStartY = STATISTIC_START_Y + STATISTIC_HEIGHT + NAME_TOP_MARGIN;
  for (var l = 0; l < times.length; l++, startX += marginLeft) {
    var height = Math.ceil(STATISTIC_HEIGHT * times[l] / maxTime);
    var startY = STATISTIC_START_Y + STATISTIC_HEIGHT - height;
    var color = 'rgba(255, 0, 0, 1)';
    if (names[l] !== 'Вы') {
      var saturation = Math.ceil(Math.random(0, 100) * 100);
      color = 'hsl(240deg, ' + saturation + '%, 50%)';
    }
    renderRectangle(ctx, startX, startY, STATISTIC_WIDTH, height, color);
    var nameLength = names[l].length;
    var nameStartX = startX + STATISTIC_WIDTH / 2 - LETTER_WIDTH * nameLength / 2;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[l], nameStartX, nameStartY);
    var time = Math.ceil(times[l]).toString();
    var timeLength = time.length;
    var timeStartX = startX + STATISTIC_WIDTH / 2 - LETTER_WIDTH * timeLength / 2;
    var timeStartY = startY - TIME_TEXT_TOP_MARGIN;
    ctx.fillText(time, timeStartX, timeStartY);
  }
};
