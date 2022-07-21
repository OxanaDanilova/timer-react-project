import React, { Component } from "react";
import "./Timer.scss";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerID: null,
      startTime: null,
      minutes: null,
      seconds: null,
      hunderthSeconds: null,
      passedTime: null,
    };
  }

  tick = () => {
    const now = Date.now();
    const passedTime = now - this.state.startTime;
    const minutes = passedTime / 60000;
    const seconds = (passedTime % 60000) / 1000;
    const hunderthSeconds = (passedTime % 1000) / 10;
    this.setState({
      minutes: minutes,
      seconds: seconds,
      hunderthSeconds: hunderthSeconds,
      passedTime: passedTime,
    });
  };

  startTimer = () => {
    if (this.timerID) return;
    this.setState({
      startTime: Date.now() - this.state.passedTime,
      timerID: setInterval(this.tick, 1),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timerID);
  };
  resetTimer = () => {
    this.stopTimer();
    this.setState({
      minutes: null,
      seconds: null,
      hunderthSeconds: null,
      timerID: null,
      passedTime: null,
    });
  };

  render() {
    return (
      <>
        <h1>React Chronometer</h1>
        <section className="timerBox">
          <div className="timePanel">
            <p>
              {Math.floor(this.state.minutes).toString().trim().length === 1
                ? `0${Math.floor(this.state.minutes)}`
                : Math.floor(this.state.minutes)}
              :
              {Math.floor(this.state.seconds).toString().trim().length === 1
                ? `0${Math.floor(this.state.seconds)}`
                : Math.floor(this.state.seconds)}
              :
              {Math.floor(this.state.hunderthSeconds).toString().trim()
                .length === 1
                ? `0${Math.floor(this.state.hunderthSeconds)}`
                : Math.floor(this.state.hunderthSeconds)}
            </p>
          </div>
          <div className="buttons-panel">
            <button onClick={this.startTimer}>Start</button>
            <button onClick={this.stopTimer}>Stop</button>
            <button onClick={this.resetTimer}>Reset</button>
          </div>
        </section>
        <figure>
          <div id="timer-center"></div>
          <div
            id="minutes-arrow"
            style={{ transform: `rotate(${this.state.minutes * 6}deg)` }}
          ></div>
          <div
            id="seconds-arrow"
            style={{ transform: `rotate(${this.state.seconds * 6}deg)` }}
          ></div>
          <div id="timer-top"></div>
          <div id="timer-right"></div>
          <div id="timer-bottom"></div>
          <div id="timer-left"></div>
          <button id="timer-start-btn" onClick={this.startTimer}>
            Start
          </button>
          <button id="timer-stop-btn" onClick={this.stopTimer}>
            Stop
          </button>
          <button id="timer-reset-btn" onClick={this.resetTimer}>
            Reset
          </button>
        </figure>
      </>
    );
  }
}
