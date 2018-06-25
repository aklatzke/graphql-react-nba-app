import React, { Component } from 'react';
import './Visualization.css';
import vis from 'vis';

import {teams} from '../../etc/maps';

let teamColors = {
    hawks: "#C2343E",
    celtics: "#5C9C5A",
    nets: "#171617",
    hornets: "#0A174C",
    bulls: "#BA1815",
    cavaliers: "#7B191B",
    mavericks: "#1D2B78",
    nuggets: "#426BBB",
    pistons: "#C0323D",
    warriors: "#F1BC2E",
    rockets: "#BA1815",
    pacers: "#161928",
    clippers: "#BE333D",
    lakers: "#403773",
    grizzlies: "#9DBCE1",
    heat: "#BA1815",
    bucks: "#1D372C",
    timberwolves: "#B7BDC1",
    pelicans: "#C62F3E",
    knicks: "#CD5529",
    thunder: "#446DBD",
    sixers: "#1C286D",
    suns: "#403773",
    trailblazers: "#171617",
    kings: "#403773",
    spurs: "#BABEC2",
    raptors: "#B53442",
    jazz: "#21462B",
    wizards: "#0A1B36"
}

let neo4jClient = window.neo4j.v1.driver("bolt://localhost", window.neo4j.v1.auth.basic('neo4j', '12345'));
let neo4jSession = neo4jClient.session();

export default class Visualization extends Component{
    state = {
        isFullscreen: false
    }

    renderGraph(){
        let firstPlayer = this.props.players[0].fullname;
        let dataReceived = [];
        if( this.props.players.length === 1){
            neo4jSession.run(`
                MATCH 
                    (p:Player {name: '${firstPlayer}'})
                        -[r:PLAYEDFOR]->
                    (t:Team)
                RETURN *`
            )
            .subscribe({
                onNext : (record) => {
                    dataReceived.push(record);
                },

                onCompleted: () => {
                    this.renderVis( dataReceived )
                }
            })
        }
        else{
            let queryString = this.props.players.map(item => `"${item.fullname}"`).join(",");

            neo4jSession.run(`
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
            )
            .subscribe({
                onNext : (record) => {
                    dataReceived.push( record );
                },

                onCompleted: () => {
                    this.renderVis( dataReceived )
                }
            })            
        }
    }

    renderVis = (data) => {
        let usedIds = [];
        let usedRelationships = [];
        let nodes = [];
        let edges = [];
        let edgesHash = {};
        let playerNames = this.props.players.map( item => item.fullname );

        data.forEach( record => {
            record._fields.forEach( item => {
                if (item.labels && !usedIds.includes(item.identity.low) ) {
                    if (item.labels.includes("Player")  ) {
                        nodes.push({
                            id: item.identity.low,
                            label: item.properties.name,
                            shape: "circularImage", 
                            image: `../../img/players/${item.properties.name.toLowerCase().split(" ").join("_")}.png`,
                            brokenImage: `../../img/etc/default.png`,
                            group: teams[item.properties.team],
                            size: playerNames.includes( item.properties.name ) ? 60 : 20,
                            shadow: true,
                            title: "Team: " + teams[item.properties.team] + "<br />Position: " + item.properties.pos
                        })
                    }
                    else{ 
                        nodes.push({
                            id: item.identity.low,
                            label: item.properties.name.charAt(0).toUpperCase() + item.properties.name.substring(1),
                            shape: "circularImage",
                            image: `../../img/${item.properties.name.replace(/ /g, "_")}.gif`,
                            size: 60,
                            shadow: true,
                            font: {
                                size: 22
                            },
                            group: item.properties.nickname.toLowerCase(),
                            color: teamColors[item.properties.nickname.toLowerCase()]
                        })
                    }

                    usedIds.push(item.identity.low);
                }

                if( item.type ){
                    if (!usedRelationships.includes(item.properties.years + item.start.low + item.end.low) ){
                        usedRelationships.push(item.properties.years + item.start.low + item.end.low);

                        let itemKey = "" + item.start.low + item.end.low;

                        edges.push({
                            from: item.start.low,
                            to: item.end.low,
                            label: item.properties.years,
                            font: {
                                align: 'middle'
                            }
                        })
                    }
                }
            } )
        } )

        // create a network
        var container = document.getElementById('viz');
        var data = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(edges)
        };

        let groupColors = {}
        Object.keys(teamColors).forEach( key => {
            groupColors[key] = { color: teamColors[key] }
        } )

        const options = {
            nodes: {
                size: 20,
                font: {
                    size: 16
                },
                borderWidth: 0
            },
            edges: {
                shadow: true,
                width: 2,
                color: { inherit: "both" }
            },
            groups: {
                ...groupColors
            },
            interaction: {
                tooltipDelay: 200
            },
            "physics": {
                "repulsion": {
                    "centralGravity": 0,
                    "springLength": 80,
                    "springConstant": 0.035,
                    "nodeDistance": 500,
                    "damping": .2
                },
                "minVelocity": 0.75,
                "solver": "repulsion",
                "timestep": 0.51
            }
        }
        var network = new vis.Network(container, data, options);    
    }

    componentDidUpdate( prevProps ){
        let needsRerender = JSON.stringify(prevProps.players) !== JSON.stringify(this.props.players)

        if( needsRerender ){
            window.setTimeout(this.renderGraph.bind(this), 500);
        }
    }

    getVizStyle = () => {
        if( this.state.isFullscreen ){
            return {
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: "999999999",
                backgroundColor: "#f5f5f5"
            }
        }
        else{
            return {
                width: "100%",
                border: 0,
                height: "500px",
                backgroundColor: "#f5f5f5"
            }
        }
    }

    toggleVizStyle = () => {
        this.setState({ isFullscreen : ! this.state.isFullscreen })
    } 

    render(){
        return (
            <div className='player-vis'>
                <div className='viz-container' style={this.getVizStyle()}>
                    <h6>Connections Visualization</h6>
                    <i className="fas fa-expand fullscreen-btn" onClick={this.toggleVizStyle}></i>
                    <div id='viz' style={{ height: "100%", width: "100%" }}></div>                                 
                </div>
            </div>
        )
    }
}