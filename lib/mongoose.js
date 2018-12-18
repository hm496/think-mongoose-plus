'use strict';

const assert = require('assert');
const path = require('path');
const mongoose = require('mongoose');
const awaitFirst = require('await-first');
const helper = require('think-helper');

let count = 0;
const cacheConn = {};
const cacheModel = {};

module.exports = {
  mongoose: require('mongoose'),
  // 获取mongoose client实例
  mongooseDB: app => {
    const configAll = app.think.config('mongoose');
    if (configAll.common) {
      mongoose.Promise = configAll.common.customPromise ? configAll.common.customPromise : Promise;
    }
    return function (type) {
      let config = helper.parseAdapterConfig(configAll, type);
      if (cacheConn[config.type]) {
        return cacheConn[config.type];
      }
      cacheConn[config.type] = createOneClient(config, app);
      return cacheConn[config.type];
    }
  },
  // 获取mongoose Model实例
  mongooseModel: app => {
    return function (model) {
      if (cacheModel[model]) {
        return cacheModel[model];
      } else if (app.models && typeof app.models[model] === "function") {
        cacheModel[model] = app.models[model](app)
        return cacheModel[model];
      }
    }
  }
};

function createOneClient (config, app) {
  const { url, options } = config;

  assert(url, '[think-mongoose-plus] url is required on config');

  // Notice we MUST add an option arg called `useNewUrlParser` and set to `true`
  // in default, otherwises there'll be a warning since v4.X of mongodb.
  // Ref: https://github.com/eggjs/egg/issues/3081
  if (!options.hasOwnProperty('useNewUrlParser')) {
    options.useNewUrlParser = true;
  }
  think.logger.info('[think-mongoose-plus] connecting %s', url);

  const db = mongoose.createConnection(url, options);

  /* istanbul ignore next */
  db.on('error', err => {
    err.message = `[think-mongoose-plus] ${err.message}`;
    think.logger.error(err);
  });

  /* istanbul ignore next */
  db.on('disconnected', () => {
    think.logger.error(`[think-mongoose-plus] ${url} disconnected`);
  });

  db.on('connected', () => {
    think.logger.info(`[think-mongoose-plus] ${url} connected successfully`);
  });

  /* istanbul ignore next */
  db.on('reconnected', () => {
    think.logger.info(`[think-mongoose-plus] ${url} reconnected successfully`);
  });

  think.beforeStartServer(async function () {
    think.logger.info('[think-mongoose-plus] starting...');
    await awaitFirst(db, ['connected', 'error']);
    const index = count++;
    think.logger.info(`[think-mongoose-plus] instance[${index}] start successfully`);
  });

  return db;
}
