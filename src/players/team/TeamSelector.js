import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {teams} from '../../etc/maps';
import { client, gql } from '../../graphql';

const TEAM_QUERY = gql `
  query playersByTeam( $team: String ){
    playersByTeam( team: $team ){
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

export default class TeamSelector extends Component {
  constructor(props){
    super(props)

    this.state = {
      selectedOption: '',
      selectOptions: []
    }

    Object.keys(teams).forEach( key => {
      this.state.selectOptions.push({
        value: key,
        label: teams[key].charAt(0).toUpperCase() + teams[key].substr(1)
      })
    } )
  }

  handleChange(option){
    client.query({
      query: TEAM_QUERY,
      variables: {
        team: option.value
      }
    })
    .then(response => {
      this.props.addPlayers( response.data.playersByTeam )
    })
    .catch( error => console.log(error) )



    this.setState({
      selectedOption: ''
    })
  }

  render() {
    return (
      <Select 
        name="form-field-name"
        value={this.state.selectedOption}
        onChange={this.handleChange.bind(this)}
        options={this.state.selectOptions}
        placeholder="Add A Team"
      />
    )
  }
}
