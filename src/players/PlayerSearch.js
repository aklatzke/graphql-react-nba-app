import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

import PlayerList from './PlayerList';
import TeamSelector from './team/TeamSelector';

import { teams } from "../etc/maps";
import PlayerDisplayList from './PlayerDisplayList';

export default class PlayerSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
      players: [],
      playerData : []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.shouldRender = this.shouldRender.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.teams = teams;

    this.addPlayers = this.addPlayers.bind(this);
    this.setPlayerData = this.setPlayerData.bind(this);
  }

  addPlayers(players){
    this.setState({
      playerData: [...this.state.playerData, ...players]
    })
  }

  setPlayerData( playerData ){
    this.setState({
      playerData: playerData
    })
  }

  handleChange(event){
    this.setState({
      input: event.target.value
    })
  }

  renderItem( item, isHighlighted ){
    return <div className="search-result" key={item.fullname}>{item.fullname} 
            <span className="icon-wrapper"><img src={ require(`../img/${this.teams[item.team]}.gif`) } /></span>
           </div>
  }

  handleSelection(value){
    this.setState({
      players: [...this.state.players, value],
      input: ''
    })
  }

  shouldRender( item, value ){
    if( value.length < 3){
      return false;
    }

    return item.fullname.toLowerCase().includes(value.toLowerCase());
  }

  maybeRenderPlayers(){
    if( this.state.players.length && (this.state.players.length !== this.state.playerData.length)){
      return <PlayerList setPlayerData={this.setPlayerData} players={this.state.players}></PlayerList>
    }

    return ''; 
  }

  maybeRenderPlayerDisplay(){
    if( this.state.playerData.length ){
      return <PlayerDisplayList players={this.state.playerData} />
    }
  }

  render() {
    return (
      <div>
        <p class='legend'><small>Enter a player's name below to search. Adding a player after generating a plot will reset the plot data and filters.</small></p>
        <Autocomplete 
          getItemValue={ (item) => item._id }
          items={this.props.players}
          renderItem={ this.renderItem }
          shouldItemRender={this.shouldRender}
          value={this.state.input}
          onChange={this.handleChange}
          onSelect={this.handleSelection} 
          inputProps={{
            className : "search-input",
            placeholder : "Search for a player"
          }}
          wrapperStyle={{ 
            position: "relative",
            display: "inline-block" 
          }}
          renderMenu={ (items, value, style) => <div className="search-menu" style={{...this.menuStyle }} children={items}></div> }
        />
        <TeamSelector addPlayers={ this.addPlayers }/>

        <div class='selected-players'>
          { this.maybeRenderPlayers() }
          { this.maybeRenderPlayerDisplay() }
        </div>        
      </div>
    ) 
  }
}
