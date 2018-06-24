import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';

export default class Autocomplete extends Component{
    state = {
        input: ''
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    handleSelection = (value) => {
        this.props.addPlayers( value );

        this.setState({
            input: ''
        })
    } 

    shouldRender = ( item, value ) => {
        if( value.length < 3){
            return false;
        }

        return item.fullname.toLowerCase().includes(value.toLowerCase());
    }    

    renderItem = ( item, isHighlighted ) => {
        return <div className="search-result" highlighted={isHighlighted} key={item.fullname + item.team}>{item.fullname} 
                    <span className="icon-wrapper"><img src={ require(`../../img/${this.props.teams[item.team]}.gif`) } /></span>
                </div>
    }    

    render(){
        return (
            <ReactAutocomplete 
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
        )
    }
}