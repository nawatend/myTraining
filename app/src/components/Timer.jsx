import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { msToTime, msToMinutes } from '../utils/msToTime'
class Timer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            start: 0,
            displayTime: "00:00:00",
            isOn: false,
        }
    }

    startTimer = () => {
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true
        })
        this.timer = setInterval(() => {
            this.setState({
                time: Date.now() - this.state.start,
                displayTime: msToTime(Date.now() - this.state.start),
            })

            this.props.handleTimer(this.state.time)
        }, 1);
    }
    stopTimer = () => {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer = () => {
        this.setState({ time: 0, displayTime: "00:00:00" })
    }
    render() {
        let start = (this.state.time === 0) ?
            <Button variant="outlined" className="timer__button timer__start" onClick={this.startTimer}>start</Button> :
            null
        let stop = (this.state.isOn) ?
            <Button variant="outlined" className="timer__button timer__stop" onClick={this.stopTimer}>stop</Button> :
            null
        let reset = (this.state.time !== 0 && !this.state.isOn) ?
            <Button variant="outlined" className="timer__button timer__reset" onClick={this.resetTimer}>reset</Button> :
            null
        let resume = (this.state.time !== 0 && !this.state.isOn) ?
            <Button variant="outlined" className="timer__button timer__resume" onClick={this.startTimer}>resume</Button> :
            null
        return (
            <div className="timer">
                <h2>{this.state.displayTime}</h2>
                {start}
                {resume}
                {stop}
                {reset}
            </div>
        )
    }
}
export default Timer