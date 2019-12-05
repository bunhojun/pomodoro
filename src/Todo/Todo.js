import React, { Component } from 'react';
import './Todo.css';

export class Todo extends Component {

    handleChange = (e) => {
        e.preventDefault();
        this.props.changeState(this.props.todo.id, this.props.todo.done);
    }

    handleDelete = () => {
        this.props.delTodo(this.props.todo.id);
    }

    onClickTodo = () => {
        window.location.href = `/pomodoro?${this.props.todo.id}`;
    }

    render() {
        return (
            <React.Fragment>
                <li className="todo">
                    <input type="checkbox" checked={this.props.todo.done} onChange={this.handleChange}></input>
                    <span className="link" onClick={this.onClickTodo}>{this.props.todo.content}</span>
                    <span className="delete" onClick={this.handleDelete}>&times;</span>
                </li>
            </React.Fragment>
        )
    }
}

export default Todo
