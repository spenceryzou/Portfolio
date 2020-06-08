import React, {Component} from 'react';
import config from '../config.js';
import { schemeBrBG } from 'd3';

const firebase = require('firebase');
const d3 = require('d3');

export class Graph extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions,
            nodes: [],
            links: []
        }
    }
    
    componentDidMount = async () => {
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('lists').child('GraphViz')
        await ref.on('value', snapshot => {
          const movie = snapshot.val()
          let nodes = [];
          let links = [];
          for(let index in movie){
              let actors = this.processActors(movie[index].Actors)
              let entry = {
                name: (movie[index].Title),
                group: 1,
                actors: actors,
                poster: (movie[index].Poster),
                imdbID: (movie[index].imdbID)
              }
              
              actors.forEach(actor => {
                let duplicate = false;
                nodes.forEach(node => {
                    if(node.name === actor)
                        duplicate = true;
                })
                if(!duplicate)
                    nodes.push({
                        name: actor,
                        group: 2
                    });
            })
            nodes.push(entry)
            for(let i = 0; i < nodes.length; i++){
                if(nodes[i].group === 2){
                    for(let j = 0; j < nodes.length; j++){
                        let hasActor = false;
                        if(nodes[j].group === 1){
                            nodes[j].actors.forEach(actor => {
                                if(actor === nodes[i].name)
                                    hasActor = true;
                            })
                        }
                        if(hasActor){
                            links.push({
                                source: i,
                                target: j,
                                value: 1
                            })
                        }
                    }
                }
            }
          }
        //   const promises =
        //     entries.map(async (entry) => {
        //     const response = await instance.get(`/?apikey=${apikey}&i=${entry}`)
        //     return response.data;
        //     })
        // const results = await Promise.all(promises)
        // console.log(results)
        this.setState({links: links})
        this.setState({nodes: nodes})
        console.log(this.state.links)
        console.log(this.state.nodes)
        const elem = document.getElementById("mysvg");
        elem.appendChild(this.chart(nodes, links));
        })
        
    }
    processActors(actors){
        let actorList = [];
        while(actors.indexOf(",") !== -1){
            let index = actors.indexOf(",");
            actorList.push(actors.substring(0, index));
            actors = actors.substring(index + 2);
        }
        if(actors !== "")
            actorList.push(actors);
        return actorList;
    }
    
    drag = (simulation) => {
        function dragStarted(d){
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d){
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d){
            if(!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
    }

    chart = (nodes, links) => {
        const width = 1920;
        const height = 1080;

        const obj_links = links.map((i) => Object.create(i));
        const obj_nodes = nodes.map((i) => Object.create(i));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index;}).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
        })

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
    
        const color = (node) => {
            if(node.group === 1){
                return `url(#${node.imdbID})`;
            } else{
                return d3.color("steelblue");
            }
        }
        const radius = (node) => {
            if(node.group === 1)
                return 100;
            return 50;
        }
    
        const group = svg.selectAll("g").append("g")
            .selectAll("circle")
            .data(obj_nodes)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .enter().append("g")
            .attr("class", "node")

        const node = group
            .append("circle")
            .attr("cx", 500)
            .attr("cy", 500)
            .attr("r", radius)
            .style("fill", color)
            .call(this.drag(simulation));
        
        var defs = svg.append("svg:defs");
        for(var i = 0; i < nodes.length; i++){
            if(nodes[i].group === 1){
                console.log(nodes[i].poster)
                console.log(nodes[i].imdbID)
                defs.append("svg:pattern")
                    .attr("id", nodes[i].imdbID)
                    .attr("width", 1)
                    .attr("height", 1)
                    .append("svg:image")
                    .attr("xlink:href", nodes[i].poster)
                    .attr("width", 400)
                    .attr("height", 400)
                    .attr("x", -100)
                    .attr("y", -30);
            }
        }
        node.append("title")
                .text(function(d){ return d.name; })
                
        return svg.node();
    }


    render() {
        return(
            <div>
                <div class="content">
                    <div id="mysvg">
                    </div>
                </div>
            </div>
        );
    }
}

export default Graph;
