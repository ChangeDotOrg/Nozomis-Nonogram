import React, { Component } from 'react'
// import { Typography, Card, CardActions, CardContent} from '@material-ui/core'
import * as d3 from 'd3'

function generateGrid(rowLength, colLength) {
  const data = []

  let xPixelPosition = 1
  let yPixelPosition = 1
  let width = 35
  let height = 35
  let rowThird = rowLength > 3 ? Math.ceil(rowLength / 3)+1 : 2
  let colThird = colLength > 3 ? Math.ceil(colLength / 3)+1 : 2
  let totalRowLength = rowLength + rowThird
  let totalColLength = colLength + rowThird

  for (let row = 0; row < totalRowLength; row++) {
    data.push( [] )
    const sideRow = []
    
    let sideRowCounter = 0
    for (let col = 0; col < totalColLength; col++) {
        let strokeDasharray
        const random = Math.floor(Math.random() * 2 )
        let clickDisabled = true
        let group = 'display'
        if(row === 0) {
          if(col === 0) {
            group = 'topEmpty'
            strokeDasharray = `${width},${width*2}`
          }
          if(col > 0 && col < colThird) {
            group = 'topEmpty'
            strokeDasharray = `${width},${width*3}`
          }
          if(col >= colThird) strokeDasharray = `${width*2},${width}`
        }
        if(row > 0 && row < rowThird) {
          if(col === 0) {
            group = 'topEmpty'
            strokeDasharray = `0,${width*3},${width}`
          } 
          if(col > 0 && col < colThird) {
            group = 'topEmpty'
            strokeDasharray = `0,${width*4}`
          }
          if(col >= colThird) strokeDasharray = `0,${width},${width},${width},${width}`
        }
        if(row >= rowThird) {
          if(col === 0)  {
            group = 'topEmpty'
            strokeDasharray = `${width},${width},${width*2}`
          }
          if(col > 0 && col < colThird) strokeDasharray = `${width}`
          if(col >= colThird) {
            strokeDasharray = `${width},0` 
            clickDisabled = false

            if(random){
              sideRowCounter+=1
            } else {
              if(sideRowCounter){
                sideRow.push(sideRowCounter)
                sideRowCounter = 0
              }
            }
            if(col === totalColLength-1){ // Last column in row
              if(sideRowCounter){
                sideRow.push(sideRowCounter)
              }
            }
          }
        }
        
        data[row].push({
            x: xPixelPosition,
            y: yPixelPosition,
            click: 0,
            group: clickDisabled ? group : 'grid',
            selected: random ? true : false,
            width,
            height,
            strokeDasharray,
            clickDisabled,
        })

        xPixelPosition += width

      }

      xPixelPosition = 1
      yPixelPosition += height

      // Complete adding the number values to the side row
      let sideRowPushCounter = rowThird - sideRow.length
      sideRow.forEach((value)=>{
        data[row][sideRowPushCounter].value = value
        sideRowPushCounter += 1
      })
    }

    // Use values to loop through the 2d array by column instead of row to add top values
    for (let col = colThird; col < totalColLength; col++) {
      const sideCol = []
      
      let sideColCounter = 0
        for (let row = rowThird; row < totalRowLength; row++) {
          if(data[row][col].selected){
            sideColCounter+=1
          } else {
            if(sideColCounter){
              sideCol.push(sideColCounter)
              sideColCounter = 0
            }
          }
          if(row === totalRowLength-1){ // Last column in row
            if(sideColCounter){
              sideCol.push(sideColCounter)
            }
          }
      }

      let sideColPushCounter = colThird - sideCol.length
      sideCol.forEach((value)=>{
        data[sideColPushCounter][col].value = value
        sideColPushCounter += 1
      })
    }

  return data
}
 

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
      .on('click', function(d) {
        if(d.clickDisabled) return
        d.click ++
        if ((d.click)%2 === 0 ) d3.select(this).style("fill","#fff")
        if ((d.click)%2 === 1 ) d3.select(this).style("fill","#2C93E8")
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
        // else if(d.selected && d.group === 'grid'){
        //   square.append("text")
        //   .attr("x",  (d) => (d.x + d.width / 3) )
        //   .attr("y", (d) => (d.y + d.height / 2) )
        //   .attr("dy", ".35em")
        //   .text( (d) => {
        //     return '@'
        //   })
        //   .attr("class", "column-text")
        // }
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
      <div>
        <button onClick={this.showAnswers.bind(this)}>Answers</button>
        <div id="board"></div>
      </div>
    )
  }
}

export default GameBoard
