'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PlayerType = new _graphql.GraphQLObjectType({
    name: "Player",
    description: "An NBA Player",
    fields: () => ({
        _id: {
            type: _graphql.GraphQLString,
            description: "ObjectId"
        },
        fullname: {
            type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString),
            description: "The player's full name."
        },
        year: {
            type: _graphql.GraphQLString,
            description: "The year of this statline."
        },
        team: {
            type: _graphql.GraphQLString,
            desription: "The team the player played for."
        },
        gp: {
            type: _graphql.GraphQLString,
            description: "Number of games played."
        },
        pos: {
            type: _graphql.GraphQLString,
            description: "Player's primary position."
        },
        age: {
            type: _graphql.GraphQLString,
            description: "Player's age."
        },
        mpg: {
            type: _graphql.GraphQLString,
            description: "Average minutes per game."
        },
        min_per: {
            type: _graphql.GraphQLString,
            description: "Minutes % - amount of team's minutes used while the player was on the floor."
        },
        usg_per: {
            type: _graphql.GraphQLString,
            description: "Player's usage percentage."
        },
        tor: {
            type: _graphql.GraphQLString,
            description: "Turnover rate"
        },
        fta: {
            type: _graphql.GraphQLString,
            description: "Free throw attempts"
        },
        ft_per: {
            type: _graphql.GraphQLString,
            description: "Free throw percentages"
        },
        two_pa: {
            type: _graphql.GraphQLString,
            description: "Two point attempts."
        },
        two_per: {
            type: _graphql.GraphQLString,
            description: "Two point percentage"
        },
        three_pa: {
            type: _graphql.GraphQLString,
            description: "Three point attempts"
        },
        three_per: {
            type: _graphql.GraphQLString,
            description: "Three point percentage."
        },
        efg_per: {
            type: _graphql.GraphQLString,
            description: "Effective field goal percentage."
        },
        ts_per: {
            type: _graphql.GraphQLString,
            description: "True shooting percentage."
        },
        ppg: {
            type: _graphql.GraphQLString,
            description: "Points per game."
        },
        rpg: {
            type: _graphql.GraphQLString,
            description: "Rebounds per game."
        },
        trb_per: {
            type: _graphql.GraphQLString,
            description: "Total rebound percentage."
        },
        apg: {
            type: _graphql.GraphQLString,
            description: "Assists per game."
        },
        ast_per: {
            type: _graphql.GraphQLString,
            description: "Assist percentage."
        },
        spg: {
            type: _graphql.GraphQLString,
            description: "Steals per game."
        },
        bpg: {
            type: _graphql.GraphQLString,
            description: "Blocks per game."
        },
        topg: {
            type: _graphql.GraphQLString,
            description: "Turnovers per game."
        },
        vi: {
            type: _graphql.GraphQLString,
            description: "Versatility index."
        },
        ortg: {
            type: _graphql.GraphQLString,
            description: "Offensive rating."
        },
        drtg: {
            type: _graphql.GraphQLString,
            description: "Defensive rating."
        }
    })
});

const QueryType = new _graphql.GraphQLObjectType({
    name: 'RootSchema',
    fields: () => ({
        players: {
            type: (0, _graphql.GraphQLList)(PlayerType),
            resolve: () => _db2.default.players.all()
        },
        player: {
            type: PlayerType,
            args: {
                id: {
                    description: "The id of the player",
                    type: _graphql.GraphQLString
                }
            },
            resolve: (root, { id }) => _db2.default.players.one(id)
        },

        playersById: {
            type: (0, _graphql.GraphQLList)(PlayerType),
            args: {
                ids: {
                    description: "Array of player ids",
                    type: (0, _graphql.GraphQLList)(_graphql.GraphQLString)
                }
            },
            resolve: (root, { ids }) => _db2.default.players.byIds(ids)
        },

        playersByTeam: {
            type: (0, _graphql.GraphQLList)(PlayerType),
            args: {
                team: {
                    description: "The team code to fetch",
                    type: _graphql.GraphQLString
                }
            },
            resolve: (root, { team }) => _db2.default.players.byTeam(team)
        }
    })
});

const PlayersSchema = new _graphql.GraphQLSchema({
    query: QueryType,
    types: [PlayerType]
});

exports.default = PlayersSchema;
//# sourceMappingURL=players.js.map