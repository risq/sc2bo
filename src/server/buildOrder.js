'use strict';
const dbg = require('debug')('sc2bo:buildOrder');
const config = require('../../config/config.json').database;

exports = module.exports = class BuildOrder {
  constructor(data) {
    this.title = data.title;
    this.playerRace = data.playerRace;
    this.opponentRace = data.opponentRace;
    this.strategy = data.strategy;
    this.description = data.description;
    this.steps = data.steps;
  }
};
