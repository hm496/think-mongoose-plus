import * as mongoose from 'mongoose';

declare namespace thinkMongoosePlus {
  interface ModelExtend {
    mongoose: typeof mongoose;

    mongooseDB(type?: string): mongoose.Connection;

    mongooseModel(model?: string): mongoose.Model<any>;
  }
}

declare module 'thinkjs' {
  interface Think extends thinkMongoosePlus.ModelExtend {
  }

  interface Controller extends thinkMongoosePlus.ModelExtend {
  }

  interface Context extends thinkMongoosePlus.ModelExtend {
  }

  interface Service extends thinkMongoosePlus.ModelExtend {
  }
}
