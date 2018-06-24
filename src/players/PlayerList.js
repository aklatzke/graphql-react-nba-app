import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Player from './player';
import PlayerDisplayList from './PlayerDisplayList';
 
const PLAYER_QUERY = gql `
  query playersById( $ids: [String] ){
    playersById( ids: $ids ){
      _id,
      fullname,
      year,
      team,
      gp,
      pos,
      age,
      mpg,
      min_per,
      usg_per,
      tor,
      fta,
      ft_per,
      two_pa,
      two_per,
      three_pa,
      three_per,
      efg_per,
      ts_per,
      ppg,
      rpg,
      trb_per,
      apg,
      ast_per,
      spg,
      bpg,
      topg,
      vi,
      ortg,
      drtg
    }
  }
`

export default class PlayerList extends Component {
  constructor(props){
    super(props)

    console.log(props);
  }

  render() {
    return (
      <div className="playerlist">
        <Query query={PLAYER_QUERY} variables={{ ids: this.props.players  }}>
          {
            ({ loading, error, data }) => {
              if( loading ){
                return "Adding player..."
              }
              else{
                if( ! error ){
                  this.props.setPlayerData( data.playersById )
                  return null;
                }
                else{
                  console.log(error)
                }
              }
            }
          }
        </Query>        
      </div>
    )
  }
}
