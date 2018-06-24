import React, { Component } from 'react';
import Player from './Player';
import CourtBackground from '../img/etc/court.jpg';
 
export default class PlayerDisplayList extends Component {
  constructor(props){
    super(props); 

    this.state = { 
      players: this.props.players || []
    }

    this.removePlayer = this.removePlayer.bind(this);
  }

  componentDidUpdate(prevProps){
    if( this.state.players.length !== this.props.players.length ){
      this.setState({
        players: this.props.players
      })
    }
  }

  renderPlayers(){
    return this.state.players.map( player => <Player key={ player._id } player={ player } remove={ this.removePlayer }></Player> );
  }   

  removePlayer = (id) => {
    this.props.removePlayer( id )
  }
     
  render() {
    return (
      <div>
        <ul className="playerdisplaylist" style={{ backgroundImage: "url(" + CourtBackground + ")" }}>
          { this.renderPlayers() }
        </ul>
      </div>
    )
  }
}
