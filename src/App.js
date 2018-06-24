import React, { Component } from 'react';

import './App.css';

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
            <h1><i className="fas fa-basketball-ball"></i> NBA Player Stats/Graphs</h1>
          </header>
          { this.maybeRenderSearch() }
        </div>      
      </ApolloProvider>
    );
  }
} 

export default App;
