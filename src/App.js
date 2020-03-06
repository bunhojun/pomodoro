import React, { Component } from 'react';
import fire from './config';
import Login from './Login/Login';
import Home from './Home/Home';
import Pomodoro from './Pomodoro/Pomodoro';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    
  }

  componentDidMount = () => {
    this.authListener();
  }
  
  //ユーザーのログインのstateを見る
  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({user});
      }else {
        this.setState({user: null});
      }
    });
  }

  signout = (e) => {
    e.preventDefault();
    fire.auth().signOut();
  }

  //完了したかどうかをデータベースに送る
  sendResult = (todoId, done) => {
    fire.firestore().collection('todos').doc(todoId).update({done: done})
    .then(() => {window.location.href = '/'});
  }

  render() {
    return (
      <div>
        {(this.state.user) ? 
        (
          <Router>
            <div className="header">
              <h3>Pomodoro</h3>
              <button onClick={this.signout} id="signout">signout</button>
            </div>
            <div className="wrapper" id="pomodoro-wrapper">
            <Switch>
              <Route exact path="/" render={() => (<Home user={this.state.user}></Home>)}></Route>
              <Route path="/pomodoro" render={() => (<Pomodoro notify={this.notify} sendResult={this.sendResult}></Pomodoro>)}></Route>
            </Switch>
            </div>
          </Router>
        ) : (
          <Login></Login>
        )}
      </div>
    )
  }
}

export default App
