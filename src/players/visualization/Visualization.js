import React, { Component } from 'react';
import './Visualization.css';

export default class Visualization extends Component{
    constructor(props){
        super(props);

        this.state = {
            numRenders: 0
        }
    }

    componentDidMount(){
        //this.renderGraph();
    }

    renderGraph(){
        let firstPlayer = this.props.players[0].fullname;
        let cypher = ``;

        if( this.props.players.length === 1 ){
            cypher = `
            MATCH 
            (p:Player {name: '${firstPlayer}'})
                -[r:PLAYEDFOR{year:'2018'}]->
            (t:Team)
                -[r2:PLAYEDFOR{year:'2018'}]-
            (op:Player)
            OPTIONAL MATCH 
            ( op )-[r3:PLAYEDFOR{year:'2018'}]-(ot:Team) 
            RETURN *, COUNT(ot.name) as occurences`
        }
        else{
            let otherPlayers = this.props.players;

            otherPlayers.shift();

            let queryString = otherPlayers.map( player => player.fullname ).map( name => `'${name}'` );

            cypher = `
                MATCH 
                    (p:Player {name: "${firstPlayer}"})
                        -[r:PLAYEDFOR]-
                    (t:Team)
                        -[r2:PLAYEDFOR]-
                    (p3:Player)
                        -[r3:PLAYEDFOR]-
                    (t2:Team)
                        -[r4:PLAYEDFOR]-
                    (p2:Player) 
                WHERE p2.name IN [${queryString}]
                RETURN *`
        }

        var config = {
            container_id: "viz",
            server_url: "bolt://localhost:7687",
            server_user: "neo4j",
            server_password: "12345",
            hierarchical_layout: true,
            hierarchical_sort_method: "hubsize",
            labels: {
                "Player": {
                    "caption": "name",
                    "size": "pagerank",
                    "community": "type"
                },
                "Team": {
                    "caption": "name",
                    "size": "pagerank",
                    "community": "type"
                }
            },
            relationships: {
                "PLAYEDFOR": {
                    "thickness": "weight",
                    "caption": "year"
                }
            },
            initial_cypher: cypher
        };

        const viz = new window.NeoVis.default(config);
        // viz.render();
    }

    componentDidUpdate( prevProps ){
        let needsRerender = JSON.stringify(prevProps.players) !== JSON.stringify(this.props.players)

        if( needsRerender ){
            //this.renderGraph();
        }
    }

    render(){
        return (
            <div className='player-vis'>
                <h6 className='plot-heading'>Connections</h6>
                <legend><small>Drag nodes to reorder. Scrollwheel to zoom. It takes a few moments to load after adding a new player.</small></legend>
                <div id='viz' style={{
                width: "100%",
                border: "1px solid #cdcdcd",
                height: "500px"
                }}></div>                 
            </div>
        )
    }
}