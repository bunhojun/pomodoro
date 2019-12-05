import React, { Component } from 'react';
import './PomodoroForm.css';

export class PomodoroForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }
    
    handleAdd = () => {
        if(this.state.content !== '') {
            this.props.addTodo(this.state.content);
            this.setState({content:''});
        }else {
            //todoが未記入の時
            alert('fill out the form');
        }

    }

    handleChange = (e) => {
        this.setState({content:e.target.value});
    }

    render() {
        return (
            <div>
                <input id="pomodoro-input" onChange={this.handleChange} value={this.state.content}></input>
                <button id="add-task" onClick={this.handleAdd}>add</button>
            </div>
        )
    }
}

export default PomodoroForm;