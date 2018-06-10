import db from '../db'

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

const PlayerType = new GraphQLObjectType({
  name: "Player",
  description: "An NBA Player",
  fields : () => ({
    _id: {
        type: GraphQLString,
        description: "ObjectId"
    },
    fullname : {
        type : GraphQLNonNull(GraphQLString),
        description: "The player's full name."
    },
    year : {
        type: GraphQLString,
        description: "The year of this statline."
    },
    team : {
        type: GraphQLString,
        desription: "The team the player played for."
    },
    gp: {
        type: GraphQLString,
        description: "Number of games played."
    },
    pos: {
      type: GraphQLString,
      description: "Player's primary position."
    },
    age: {
      type: GraphQLString,
      description: "Player's age."
    },
    mpg: {
      type: GraphQLString,
      description: "Average minutes per game."
    },
    min_per: {
      type: GraphQLString,
      description: "Minutes % - amount of team's minutes used while the player was on the floor."
    },
    usg_per: {
      type: GraphQLString,
      description: "Player's usage percentage."
    },
    tor : {
        type: GraphQLString,
        description: "Turnover rate"
    },
    fta : {
        type: GraphQLString,
        description: "Free throw attempts"
    },
    ft_per : {
        type : GraphQLString,
        description: "Free throw percentages"
    },
    two_pa : {
        type : GraphQLString,
        description: "Two point attempts."
    },
    two_per : {
        type : GraphQLString,
        description: "Two point percentage"
    },
    three_pa: {
        type: GraphQLString,
        description: "Three point attempts",
    },
    three_per : {
        type: GraphQLString,
        description: "Three point percentage."
    },
    efg_per: {
        type: GraphQLString,
        description: "Effective field goal percentage."
    },
    ts_per : {
        type: GraphQLString,
        description: "True shooting percentage."
    },
    ppg: {
        type: GraphQLString,
        description: "Points per game."
    },
    rpg: {
        type: GraphQLString,
        description: "Rebounds per game."
    },
    trb_per: {
        type: GraphQLString,
        description: "Total rebound percentage."
    },
    apg: {
        type: GraphQLString,
        description: "Assists per game."
    },
    ast_per: {
        type: GraphQLString,
        description: "Assist percentage."
    },
    spg: {
        type: GraphQLString,
        description: "Steals per game."
    },
    bpg: {
        type: GraphQLString,
        description: "Blocks per game."
    },
    topg: {
        type: GraphQLString,
        description: "Turnovers per game."
    },
    vi: {
        type: GraphQLString,
        description: "Versatility index."
    },
    ortg: {
        type: GraphQLString,
        description: "Offensive rating."
    },
    drtg: {
        type: GraphQLString,
        description: "Defensive rating."
    }
  })
})

const QueryType = new GraphQLObjectType({
    name: 'RootSchema',
    fields: () => ({
        players: {
            type: GraphQLList(PlayerType),
            resolve: () => db.players.all()
        },
        player: {
            type: PlayerType,
            args : {
                id : {
                    description: "The id of the player",
                    type: GraphQLString
                }
            },
            resolve : (root, { id }) => db.players.one(id)
        },

        playersById : {
            type: GraphQLList(PlayerType),
            args: {
                ids: {
                    description: "Array of player ids",
                    type: GraphQLList(GraphQLString)
                }
            },
            resolve: (root, { ids }) => db.players.byIds(ids)
        },

        playersByTeam: {
            type: GraphQLList(PlayerType),
            args: {
                team : {
                    description: "The team code to fetch",
                    type: GraphQLString
                }
            },
            resolve: (root, {team}) => db.players.byTeam(team)
        }
    })
})

const PlayersSchema = new GraphQLSchema({
    query: QueryType,
    types: [PlayerType]
})

export default PlayersSchema;