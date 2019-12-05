import React, { Component } from 'react';
import './Home.css';
import Todo from '../Todo/Todo';
import PomodoroForm from '../PomodoroForm/PomodoroForm';
import fire from '../config';
 

export class Home extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = {
            todos: []
        }
        this.db = fire.firestore().collection('todos');
    }

    componentDidMount = () => {
        //ユーザーが記入したtodoを取得
        this.db.where('uid', '==', this.user.uid).onSnapshot(snap => {
            if(!snap.empty) {
                const todoArr = [];
                snap.forEach(doc => {
                    todoArr.unshift({
                        id: doc.id,
                        content: doc.data().content,
                        done: doc.data().done
                    });
                });
                this.setState({todos:todoArr});
            }
        })
    }
    
    addTodo = (todo) => {
        this.db.doc().set(
            {
                content: todo,
                uid: this.user.uid,
                done: false
            }
        )
    }

    delTodo = (todoId) => {
        this.db.doc(todoId).delete();
    }

    //todoの完了のstateを更新
    changeState = (todoId, done) => {
        this.db.doc(todoId).update({done: !done});
    }

    render() {
        return (
            <React.Fragment>
                    <PomodoroForm addTodo={this.addTodo}></PomodoroForm>
                    <ul id="todo-wrapper">{
                        this.state.todos.map(todo => {
                            return(
                                <Todo todo={todo} key={todo.id} delTodo={this.delTodo} changeState={this.changeState}></Todo> 
                            )
                        })
                    }
                    </ul>  
            </React.Fragment>
        )
    }
}

export default Home
