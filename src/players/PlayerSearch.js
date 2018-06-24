import React, { Component } from 'react';

import { client, gql } from '../graphql';
import { teams } from "../etc/maps";

import Autocomplete from './autocomplete/Autocomplete';
import TeamSelector from './team/TeamSelector';
import PlayerDisplayList from './PlayerDisplayList';
import PlayerGraph from './PlayerGraph';
import PlayerVisualization from './visualization/Visualization';

const PLAYER_QUERY = gql`
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
`;

export default class PlayerSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
      players: [],
      playerData : []
    }

    this.teams = teams;
    this.playerData = [];
  }

  addPlayers = (players) =>{
      if( ! Array.isArray(players) ){
        players = [players];
      }

      this.refreshPlayerData([...this.state.players, ...players])      
  }

  refreshPlayerData = (players) => {
      client.query({
        query: PLAYER_QUERY,
        variables: {
          ids: players
        }
      })
      .then(({data}) => {
        this.playerData = [...data.playersById];

        this.setState({ 
          playerData: [...data.playersById],
          players: players
        })
      })  
  }

  removePlayer = (id) => {
    let newPlayersArray = [...this.state.players].filter( pId => pId !== id );

    this.refreshPlayerData(newPlayersArray)
  }

  render() {
    return (
      <div>
        <p class='legend'><small>Enter a player's name below to search. Adding a player after generating a plot will reset the plot data and filters.</small></p>
        <Autocomplete teams={ this.teams } players={ this.props.players } addPlayers={ this.addPlayers }/>
        <TeamSelector addPlayers={ this.addPlayers }/>

        <div class='selected-players'>
          <PlayerDisplayList players={[...this.state.playerData]} removePlayer={this.removePlayer}/>
        </div>        

        <div className='graph-container'>
          <PlayerGraph players={ this.state.playerData } /> 
          <PlayerVisualization players={ this.state.playerData }/>
        </div>
      </div>
    ) 
  }
}
