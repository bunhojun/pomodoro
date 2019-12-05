import React, { Component } from 'react';
import './Login.css';
import fire from '../config';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    login = (e) => {
        e.preventDefault(); //ボタンの動作を制御
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(err => { 
            alert(err); //ログイン失敗メッセージをアラート表示
        });
    }

    signUp = (e) => {
        e.preventDefault(); //ボタンの動作を制御
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(err => {
            alert(err); //ユーザー登録失敗メッセージをアラート表示
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Pomodoro</h1>
                <div className="wrapper" id="login-wrapper">
                    <form>
                        <h2>Login or Signup</h2>
                        <input type="email" name="email" id="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
                        <input type="password" name="password" id="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
                        <button type="submit" id="login" onClick={this.login}>login</button>
                        <button type="submit" id="signup" onClick={this.signUp}>signup</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Login
