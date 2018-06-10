'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _thenMongo = require('then-mongo');

var _thenMongo2 = _interopRequireDefault(_thenMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let db = (0, _thenMongo2.default)(process.env.MONGODB_URI || 'nba');

exports.default = db;
//# sourceMappingURL=connection.js.map