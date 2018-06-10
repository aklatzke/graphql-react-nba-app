"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require("../db/");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let { players } = _db2.default;

exports.default = routes => {
    routes.get("/api/players", (req, res) => {
        players.all().then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err.message);
        });
    });

    return routes;
};
//# sourceMappingURL=players.js.map