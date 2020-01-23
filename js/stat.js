'use strict';

// var CLOUD_WIDTH = 420;
// var CLOUD_HEIGHT = 270;
// var CLOUD_START_X = 100;
// var CLOUD_START_Y = 10;
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

var cloudParams = [
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

var renderCloud = function(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times, renderParams = cloudParams) {
  // renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ccc'); // проверка размера облака
  ctx.beginPath();
  ctx.fillStyle = SHADOW_COLOR;
  for (var i = 0; i < renderParams.length; i++) {
    ctx[renderParams[i].method].apply(ctx, renderParams[i].params);
  }
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = CLOUD_COLOR;
  for (var i = 0; i < renderParams.length; i++) {
    renderParams[i].params[0] -= 10;
    renderParams[i].params[1] -= 10;
    ctx[renderParams[i].method].apply(ctx, renderParams[i].params);
  }
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_PARAMS;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 175, 47);
  ctx.fillText('Список результатов:', 185, 65);
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    maxTime = maxTime < times[i] ? times[i] : maxTime;
  }
  var marginLeft = STATISTIC_MARGIN_X + STATISTIC_WIDTH;
  var startX = STATISTIC_START_X;
  var nameStartY = STATISTIC_START_Y + STATISTIC_HEIGHT + NAME_TOP_MARGIN;
  for (var i = 0; i < times.length; i++, startX += marginLeft) {
    var height = Math.ceil(STATISTIC_HEIGHT * times[i] / maxTime);
    var startY = STATISTIC_START_Y + STATISTIC_HEIGHT - height;
    if (names[i] === 'Вы') {
      var color = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.ceil(Math.random(0, 100) * 100);
      var color = 'hsl(240deg, ' + saturation + '%, 50%)';
    }
    renderCloud(ctx, startX, startY, STATISTIC_WIDTH, height, color);

  }
};
