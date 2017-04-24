import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }
    handleNameChange(e, v) {
        this.setState({ name: v });
    }
    handlePasswordChange(e, v) {
        this.setState({ password: v });
    }
    doLogin(e) {
        console.log(this.state.name, this.state.password);
        fetch('/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${this.state.name}&password=${this.state.password}`,
        })
            .then(response => response.blob())
            .then((myBlob) => {
                console.log(myBlob);
                const objectURL = URL.createObjectURL(myBlob);
            });
    }
    render() {
        return (
            <Card>
                <div>
                    <TextField
                        hintText="用户名"
                        type="text"
                        onChange={this.handleNameChange}
                        value={this.state.name}
                    /><br />
                    <TextField
                        hintText="密码"
                        type="password"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                    />
                    <br />
                    <RaisedButton
                        label="登录"
                        primary
                        onTouchTap={this.doLogin}
                    />
                </div>
            </Card>
        );
    }
}
export default Login;
