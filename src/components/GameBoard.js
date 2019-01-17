import React, { Component } from 'react'
// import { Typography, Card, CardActions, CardContent} from '@material-ui/core'
import * as d3 from 'd3'
import generateGrid from '../helpers/gridFunctions'

class GameBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      answers : false
    }
  }

  componentDidMount() {
    const rowLength = 10
    const colLength = 10
    const gD = generateGrid(rowLength, colLength)
    const grid = d3.select("#board")
    .append("svg")
    .attr("width","810px")
    .attr("height","810px")

    const row = grid.selectAll(".row")
    .data(gD)
    .enter().append("g")
    .attr("class", "row")

    row.selectAll(".square")
      .data((d) => (d) )
      .enter()
      .append("rect")
      .attr("x", (d) => (d.x) )
      .attr("y", (d) => (d.y) )
      .attr("width", (d) => (d.width) )
      .attr("height", (d) => (d.height) )
      .style("stroke-dasharray", (d) => {
        if(d.strokeDasharray) return d.strokeDasharray
        return '0, 140'
      })
      .style("fill", "#fff")
      .style("stroke", "#222")
      .on('click', function(d, e) {
        if(d.clickDisabled) return
        d.click ++
        if ((d.click)%2 === 0 ) d3.select(this).style("fill","#fff")
        if ((d.click)%2 === 1 ) d3.select(this).style("fill","#2C93E8")
      })
      .on('contextmenu', function (d){
        d3.event.preventDefault()
        if(d.clickDisabled) return
        // need to select the lead element to add to not this div, parent div
        console.log(this)
        const square = d3.select(this)
        if(!d.rightClick) {
          console.log(square)
          d.rightClick = true
          square.append("text")
          .attr("x",  (d) => (d.x + d.width / 3) )
          .attr("y", (d) => (d.y + d.height / 2) )
          .attr("dy", ".35em")
          .text( (d) => {

            return 'X'
          })
          // .attr("class", "x-addon")
        }else {
          d.rightClick = false
          // square.
        }
      })

    row.selectAll(".square")
    .data((d) => {
       return d
    }).enter()
      .each(function (d){
        const square = d3.select(this)

        if(d.group === 'display'){
          square.append("text")
          .attr("x",  (d) => (d.x + d.width / 3) )
          .attr("y", (d) => (d.y + d.height / 2) )
          .attr("dy", ".35em")
          .text( (d) => {
            
            return d.value ? d.value : ''
          })
          .attr("class", "column-text")
        }
      })

    this.setState({row})
  }

  showAnswers(e){
    const {row,answers} = this.state

    row.selectAll(".square")
    .data((d) => {
      return d
    }).enter()
     .each(function (d){
       const square = d3.select(this)
       if(d.selected && d.group === 'grid'){
         square.append("text")
         .attr("x",  (d) => (d.x + d.width / 3) )
         .attr("y", (d) => (d.y + d.height / 2) )
         .attr("dy", ".35em")
         .text( (d) => {
           return '@'
         })
         .attr("class", "column-text")
       }
     })
    this.setState({answers: !answers})
  }

  render() {
    return (
      // <button onClick={this.showAnswers.bind(this)}>Answers</button>
        <div id="board"></div>
    )
  }
}

export default GameBoard
