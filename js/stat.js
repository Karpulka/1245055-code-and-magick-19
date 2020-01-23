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
