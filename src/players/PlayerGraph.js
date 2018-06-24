import React, { Component } from 'react';
import { stats } from "../etc/maps";
import Plot from 'react-plotly.js';

import ButtonGroup from './graph/ButtonGroup';

export default class PlayerGraph extends Component {
  constructor(props){
    super(props);
    
    this.state = {};
    this.state.playerNames = this.props.players.map( player => player.fullname )
    this.state.playerPpg = this.props.players.map( player => player.ppg )
    this.state.stats = Object.keys(stats);
    this.state.label = "Points";
    this.state.graphType = "bar";
    this.state.activeStats = [];
    this.state.plot = {  }

    let simpleStats = ["apg", "bpg", "spg", "rpg", "ppg", "two_pa", "three_pa"]

    this.state.statsGroups = {
      per : this.state.stats.filter(stat => stat.includes("per")),
      simple: this.state.stats.filter(stat => simpleStats.includes(stat)),
      advanced: this.state.stats.filter(stat => (!stat.includes("per")) && (!simpleStats.includes(stat)))
    }
    
    this.passableToggleStat = this.toggleStat.bind(this);
    this.passableChangeGraphType = this.changeGraphType.bind(this);
  }

  componentWillReceiveProps(){
    window.setTimeout(() => this.renderGraph(), 100);
  }
 
  renderGraph(updatedStats = false){
    updatedStats = updatedStats ? updatedStats : this.state.activeStats;
    console.log(this.props.players);
    let newStats = this.props.players.map(player => ({
      x: updatedStats.map(stat => stats[stat]),
      y: updatedStats.map(stat => player[stat]),
      name: player.fullname,
      type: this.state.graphType
    }))

    this.setState({
      activeStats: updatedStats,
      label: "Comparison",
      plot: {
        data: newStats,
        layout: {
          width: 500,
          height: 450
        }
      }
    });
  }

  componentDidMount(){
    this.renderGraph();
  } 

  toggleStat(stat){
    if( this.state.activeStats.includes(stat) ){
      let idx = this.state.activeStats.indexOf(stat);
      this.state.activeStats.splice(idx, 1);
    }
    else{
      this.state.activeStats.push(stat);
    }

    this.renderGraph(this.state.activeStats);
  }

  changeGraphType(type){
    let data = this.state.plot.data;

    data = data.map(item => {
      item.type = type;
      return item;
    })

    this.setState({
      graphType: type,
      plot: {
        data : data
      }
    })
  }

  renderStatButtons(){
    return this.state.stats.map( stat => this.state.activeStats.includes(stat) ? <button className="stat-button active" onClick={ () => this.toggleStat(stat) }>{ stats[stat] }</button> : <button className="stat-button" onClick={ () => this.toggleStat(stat) }>{ stats[stat] }</button> )
  }

  render() {
    return ( 
      <div className='players-graph'>
        <h6 className='plot-heading'>Stats</h6>
        <legend><small>Select items to add from the menus below.</small></legend>
        <div class='stats-buttons'>
          <ButtonGroup 
            label="Graph Types"
            key="graph-types" 
            action={this.passableChangeGraphType} 
            buttons={ ["bar", "line+marker"] }
            labelMap={{ "bar" : "Bar", "line+marker": "Line Plot" }}
          ></ButtonGroup>        
          <ButtonGroup key='percentage-stats' label="Percentages" labelMap={stats} action={this.passableToggleStat} buttons={ this.state.statsGroups.per }></ButtonGroup>
          <ButtonGroup key='simple-stats' label="Simple Stats" labelMap={stats} action={this.passableToggleStat} buttons={ this.state.statsGroups.simple }></ButtonGroup>
          <ButtonGroup key='advanced-stats' label="Advanced Stats" labelMap={stats} action={this.passableToggleStat} buttons={ this.state.statsGroups.advanced }></ButtonGroup>
        </div>        
        { this.state.plot.data ? <Plot key='graph' data={ this.state.plot.data } layout={ this.state.plot.layout }></Plot> : '' }
      </div>
    )
  }
}
