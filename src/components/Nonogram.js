import React, { Component } from 'react'
import { Card,  CardContent } from '@material-ui/core'
import GameBoard from './GameBoard'

class Nonogram extends Component {
  render() {

    const styles = {
      card: {
        maxWidth: '100%',
        minHeight: '92%',
        maxHeight: '92%',
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        marginBottom: 16,
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    }
    return (
      <Card style={styles.card}>
        <CardContent>
          {/* <Typography style={styles.title} color="textSecondary">
            Word of the Day
          </Typography> */}
          <GameBoard />
        </CardContent>
      </Card>
    )
  }
}

export default Nonogram
