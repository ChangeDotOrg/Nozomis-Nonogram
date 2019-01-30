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
        d.click++
        if ((d.click)%3 === 0 ) d.text.text( () => '')
        if ((d.click)%3 === 1 ) d3.select(this).style("fill","#2C93E8")
        if((d.click)%3 === 2) {
          d3.select(this).style("fill", "#fff")
          d.text.text( () => 'X')
        }
      })

    row.selectAll(".square")
    .data((d) => (d))
    .enter()
      .each(function (d){
        const square = d3.select(this)
        d.text = square
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
        else if(d.group === 'grid'){
          d.text = square.append("text")
          d.text
          .attr("x",  (d) => (d.x + d.width / 3) )
          .attr("y", (d) => (d.y + d.height / 2) )
          .attr("dy", ".35em")
          .text( () => '')
          .attr("class", "column-text")
          .on('click', function(d){
            d.click++
            d.text.text( d => '')
          })
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
