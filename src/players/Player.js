import React, { Component } from 'react';
import ImageFallback from 'react-image-fallback';

export default class Player extends Component {
  constructor(props){
    super(props);
    let nameParts = this.props.player.fullname.split(" ");
    this.firstName = nameParts.shift().toLowerCase();
    this.lastName = [...nameParts].join("-").toLowerCase();
  }
  
  render() { 
    return ( 
      <li className="player-card" onClick={ () => this.props.remove(this.props.player.fullname) }>
        <div class='background-overlay'></div>
        <span>{this.props.player.fullname}</span>
        <ImageFallback src= {`../img/players/${this.firstName}_${this.lastName}.png`} fallbackImage={ "../img/etc/default.png" } />
      </li> 
    )
  }
}
