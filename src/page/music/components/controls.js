import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './controls.css'


class Controls extends Component {
  render() {
    return (
      <div className={style.controls}>
        1
      </div>
    )
  }

  componentDidMount() {

  }
  componentWillReceiveProps() {

  }
}

const mapStateToProps = state => {
  return {
    audio: state.player.playing,
    player: state.player,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer(player) {
      dispatch({ type: 'setPlayer', player })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)