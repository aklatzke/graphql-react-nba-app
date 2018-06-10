'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let collection = _connection2.default.collection('players');

let methods = {
    all: () => collection.find({}),

    one: id => collection.find({ _id: _connection2.default.ObjectId(id) }),

    byIds: ids => {
        ids = ids.map(item => _connection2.default.ObjectId(item));

        return collection.find({
            _id: {
                $in: ids
            }
        });
    },

    byTeam: team => collection.find({ team: team })
};

exports.default = methods;
//# sourceMappingURL=player.js.map