import React, { Component } from 'react';
import './ButtonGroup.css'

export default class ButtonGroup extends Component {
  constructor(props){
    super(props);

    this.state = {
      expanded : false,
      active : []
    }
  }

  componentDidMount(){
  }

  toggle(item){
    if(! this.state.active.includes(item) ){
      this.setState({
        active: [...this.state.active, item]
      })
    }
    else{
      this.state.active.splice(this.state.active.indexOf(item), 1);
      this.setState({
        active: this.state.active
      })
    }

    this.props.action(item); 
  }   

  maybeRenderButtons(){
    if( this.state.expanded ){
      return this.props.buttons.map( item => {
        if( this.state.active.includes(item) ){
          return <button class='stat-button active' onClick={ () => this.toggle(item) }>{ this.props.labelMap[item] }</button>
        }
        else{
          return <button class='stat-button' onClick={ () => this.toggle(item) }>{ this.props.labelMap[item] }</button>
        }
      } )
    } 
  }

  toggleExpand(){
    return this.setState({
      expanded: ! this.state.expanded
    })
  }

  render() {
    return (
      <div className={ this.state.expanded ? "expanded expander" : "expander" }>
        <div className='expand-button'>
          <button onClick={ () => this.toggleExpand() }>{ this.props.label }</button>
        </div>

        { this.maybeRenderButtons() }
      </div>
    )
  }
}
