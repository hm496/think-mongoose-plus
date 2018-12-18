const mongooseExtend = require('./lib/mongoose.js');

/**
 * extends to think, controller, context, service
 */
module.exports = app => {
  return {
    controller: {
      mongoose: mongooseExtend.mongoose,
      mongooseModel: mongooseExtend.mongooseModel(app),
      mongooseDB: mongooseExtend.mongooseDB(app),
    },
    service: {
      mongoose: mongooseExtend.mongoose,
      mongooseModel: mongooseExtend.mongooseModel(app),
      mongooseDB: mongooseExtend.mongooseDB(app),
    },
    context: {
      mongoose: mongooseExtend.mongoose,
      mongooseModel: mongooseExtend.mongooseModel(app),
      mongooseDB: mongooseExtend.mongooseDB(app),
    },
    think: {
      mongoose: mongooseExtend.mongoose,
      mongooseModel: mongooseExtend.mongooseModel(app),
      mongooseDB: mongooseExtend.mongooseDB(app),
    }
  };
};
