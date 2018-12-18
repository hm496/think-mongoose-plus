# think-mongoose-plus
[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/think-mongoose-plus.svg?style=flat-square
[npm-url]: https://npmjs.org/package/think-mongoose-plus

Thinkjs's mongoose plugin.

## Install

```bash
$ npm i think-mongoose-plus --save
```

## Configuration

Change `{app_root}/src/config/extend.ts` to enable `think-mongoose-plus` plugin:

```typescript
const mongoose = require('think-mongoose-plus');

export = [
  mongoose(think.app), //  mongoose
]
```

## Simple connection

### Config

```js
// {app_root}/src/config/adapter.ts
export const mongoose = {
  type: "db1",
  common: {},
  db1: {
    url: 'mongodb://127.0.0.1/example',
    options: {},
  },
  db2: {
    url: 'mongodb://127.0.0.1/example',
    options: {},
  },
};
```

### Example

```typescript
// {app_root}/src/model/user.ts
import {Application} from "thinkjs";
// 不能使用()=>{}箭头函数  !important
export = function (app: Application) {
  const mongoose = app.think.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.think.mongooseDB('db1');

  const UserSchema = new Schema({
    userName: { type: String  },
    password: { type: String  },
  });

  return conn.model('User', UserSchema);
};

// {app_root}/src/controller/user.ts
import {think} from 'thinkjs';

export default class extends think.Controller {
  async indexAction() {
    this.body = await this.mongooseModel('user').findOne({});
  }
}
```

## Multi-mongos support

```typescript
// {app_root}/src/config/adapter.ts
export const mongoose = {
  type: "db1",
  common: {},
  db1: {
    url: 'mongodb://mongosA:27501,mongosB:27501',
    options: {
      mongos: true,
    },
  },
};
```

## License

[MIT](LICENSE)
