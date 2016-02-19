'use strict';
const dbg = require('debug')('sc2bo:db');
const config = require('../../config/config.json').database;
const bluebird = require('bluebird');
const nano = require('nano');

exports = module.exports = new class Db {
  constructor() {
    this.db =  bluebird.promisifyAll(nano(config.url).use(config.name));
  }

  saveBuildOrder(buildOrder) {
    return this.db.insertAsync(buildOrder)
      .then(res => {
        dbg('Save build order', res);
      })
      .catch(err => {
        dbg(`Error saving build order`, err);
      });
  }

  getBuildOrderById(id) {
    return this.db.getAsync(id);
  }

  getBuildOrders() {
    return this.db.listAsync({
      include_docs: true,
    })
      .then(res => res.rows.map(row => row.doc))
      .catch(err => {
        dbg(`Error getting build orders`, err);
      });
  }
};
