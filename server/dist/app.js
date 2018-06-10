'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _players = require('./schemas/players');

var _players2 = _interopRequireDefault(_players);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_db2.default;

const app = (0, _express2.default)();
app.disable('x-powered-by');

// View engine setup
app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use("/graphql", (0, _expressGraphql2.default)({
  schema: _players2.default,
  graphiql: true
}));

app.use((0, _morgan2.default)('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_routes2.default);
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    message: err.message
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map