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
    const rowLength = 11
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

    const gridSquares = row.selectAll(".square")

    gridSquares
      .data((d) => (d) )
      .enter()
        .each(function(d){
          const square = d3.select(this)

           d.rect = square.append("rect")
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
            if ((d.click)%3 === 0 ) {
              if(!d.gridText) return
              d3.select(this).style("fill", "#fff")
              d.gridText.text( () => '')
            }
            if ((d.click)%3 === 1 ) d3.select(this).style("fill","#2C93E8")
            if((d.click)%3 === 2) {
              d3.select(this).style("fill", "#fff")
              if(!d.gridText) return
              d.gridText.text( () => 'X')
            }
          })

          if(d.group === 'display'){
            d.displayText = square.append("text")
            .attr("x",  (d) => (d.x + d.width / 3) )
            .attr("y", (d) => (d.y + d.height / 2) )
            .attr("dy", ".35em")
            .text( (d) => {
              return d.value ? d.value : ''
            })
            .attr("class", "column-text")
          } 
          else if(d.group === 'grid'){
            d.gridText = square.append("text")
            .attr("x",  (d) => (d.x + d.width / 3) )
            .attr("y", (d) => (d.y + d.height / 2) )
            .attr("dy", ".35em")
            .text( () => '')
            .attr("class", "column-text")
            .on('click', function(d){
              d.click++
              d.gridText.text( d => '')
            })
          }
        })

    this.setState({gridSquares})
  }

  showAnswers(e){
    const {gridSquares,answers} = this.state

    gridSquares
    .data(d => d)
    .enter()
    .each(function (d){
      if(d.group !== 'grid') return
      if(!d.mustBeFilled){
        d.rect.style("fill", "#fff")
        d.gridText.text(()=> '')
        d.click = 0
      } else if(d.mustBeFilled){
        d.rect.style("fill","#2C93E8")
        d.gridText.text(()=> '')
        d.click = 1
      }

    })

  }

  checkIfCompleted(){

    const {gridSquares, answers} = this.state

    let result = true

    gridSquares
      .data(d=> d)
      .enter()
      .each(function (d){
        if(d.group === 'grid'){
          if(!d.mustBeFilled && (d.click)%3 === 1) result = false
          else if(d.mustBeFilled && (d.click)%3 === 0 || d.mustBeFilled && (d.click)%3 === 2) result = false
        }
      })
      if(!result) alert('Not Completed yet continue tying.')
      else alert('Completed yay!')
      return result
  }

  render() {
    return (
      <div>
        <button onClick={this.showAnswers.bind(this)}>Cheat</button>
        <button onClick={this.checkIfCompleted.bind(this)}>Check For Completion</button>
          <div id="board"></div>
      </div>
    )
  }
}

export default GameBoard
