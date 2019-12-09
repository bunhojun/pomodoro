import React, { Component } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Select from 'react-select'; 
import './Pomodoro.css';
import fire from '../config';

//タイマーに表示する文章を作成する
const renderTime = value => {
    if (value === 0) {
      return <div className="timer">The session is over</div>;
    }

    const minute = (Math.floor(value / 60) < 10) ? '0' + Math.floor(value / 60) : Math.floor(value / 60);
    const second = (Math.floor(value % 60) < 10) ? '0' + Math.floor(value % 60) : Math.floor(value % 60);
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{minute + ':' + second}</div>
        <div className="text">minutes</div>
      </div>
    );
  };

const options = [
    {value: 0.2, label: '0.2'},
    {value: 5, label: '5'},
    {value: 15, label: '15'},
    {value: 25, label: '25'}
]



export class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.id = window.location.search.split('?')[1];
        this.db = fire.firestore().collection('todos').doc(this.id);
        this.state = {
            duration: 25,
            isPlaying: false,
            isDisabled: false,
            startButtonColor: 'violet',
            visibility: 'hidden',
            content: ''
        }
    }

    componentDidMount = () => {
        this.db.get().then(doc => this.setState({content: doc.data().content}));
    }
    
    handleChange = (selectedOption) => {
        this.setState({duration: selectedOption.value});
    }

    startPomodoro = () => {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                this.setState({isPlaying:true, isDisabled:true, startButtonColor:'gray', visibility: 'hidden'});
            });
        }
        
    }

    onSessionEnd = () => {
        //this.props.notify(this.state.content);
        if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            const notification = new Notification("The session is over! Let's take a break");
        }
        this.setState({visibility: 'visible'});
    }

    //完了の時
    sendDone = (e) => {
        e.preventDefault();
        this.props.sendResult(this.id, true);
    }

    //未完の時
    sendNotYet = (e) => {
        e.preventDefault();
        this.props.sendResult(this.id, false);
    }

    render() {
        return (
            <React.Fragment>
                <div id="select-zone">
                    <Select 
                        value={this.state.duration}
                        onChange={this.handleChange}
                        options={options}
                        isDisabled={this.state.isDisabled}>
                    </Select>
                </div>
                <div id="timer-zone">
                    <CountdownCircleTimer 
                        isPlaying={this.state.isPlaying} 
                        durationSeconds={this.state.duration * 60}
                        colors={[
                            ['#004777', .33],
                            ['#F7B801', .33],
                            ['#A30000']
                        ]}
                        renderTime={renderTime}
                        onComplete={this.onSessionEnd}
                    ></CountdownCircleTimer>
                </div>
                <div id="content">todo: {this.state.content}</div>
                <button disabled={this.state.isDisabled} style={{backgroundColor: this.state.startButtonColor}} id="start" onClick={this.startPomodoro}>start pomodoro</button>
                <div id="send-zone" style={{visibility : this.state.visibility}}>
                    <p>How did it go ?</p>
                    <button onClick={this.sendDone} id="done-btn">done</button>
                    <button onClick={this.sendNotYet} id="not-yet-btn">not yet</button>
                </div>
            </React.Fragment>

        )
    }
}

export default Pomodoro;
