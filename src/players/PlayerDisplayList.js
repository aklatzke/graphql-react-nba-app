import React, { Component } from 'react';
import Player from './Player';
import PlayerGraph from './PlayerGraph';
import CourtBackground from '../img/etc/court.jpg';

export default class PlayerDisplayList extends Component {
  constructor(props){
    super(props);
    this.state = {};

    this.state.players = this.props.players;
    this.removePlayer = this.removePlayer.bind(this);
  }

  renderPlayers(){
    return this.props.players.map( player => <Player key={ player._id } player={ player } remove={ this.removePlayer }></Player> );
  }   

  renderGraph(){
    return <PlayerGraph key="player-graph" players={ this.props.players }></PlayerGraph>    
  }

  removePlayer(name){
    let adjusted = this.props.players.filter( player => player.fullname !== name );

    this.setState({
      players: adjusted
    })
  }
     
  render() {
    return (
      <div>
        <ul className="playerdisplaylist" style={{ backgroundImage: "url(" + CourtBackground + ")" }}>
          { this.renderPlayers() }
        </ul>
        <div key='graph-container'>
          { this.renderGraph() }
        </div>
      </div>
    )
  }
}
