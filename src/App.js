import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Player from './players/Player';
import PlayerSearch from './players/PlayerSearch';

import { ApolloProvider } from 'react-apollo';
import { client, gql } from './graphql';

import {
  unregister
} from './registerServiceWorker';

unregister();

class App extends Component { 
  constructor(){
    super();

    this.state = {
      players: []
    }
  }

  componentDidMount(){
    client.query({
      query: gql`
        {
          players{
            _id,
            fullname,
            team
          }
        }
      `
    })
    .then( result => this.setState({
      players: result.data.players
    }) )
  }

  maybeRenderSearch(){
    return this.state.players.length ? <PlayerSearch players={this.state.players}/> : '';
  }
 
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Players</h1>
          </header>
          { this.maybeRenderSearch() }
        </div>      
      </ApolloProvider>
    );
  }
} 

export default App;
