'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router;

router = (0, _players2.default)(_router2.default);
router = (0, _main2.default)(router);

exports.default = router;
//# sourceMappingURL=index.js.map