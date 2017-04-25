import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
const style = {
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        boxSizing: 'content-box',
        maxWidth: 256,
        flex: 1,
        padding: 40,
    },
    input: {
        marginBottom: 20,
    },
};
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
    doLogin() {
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
            });
    }
    render() {
        return (
            <div
                style={style.container}
            >
                <Card
                    style={style.card}
                >
                    <div>
                        <TextField
                            hintText="用户名"
                            type="text"
                            onChange={this.handleNameChange}
                            value={this.state.name}
                            style={style.input}
                        /><br />
                        <TextField
                            hintText="密码"
                            type="password"
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                            style={style.input}
                        />
                        <br />
                        <RaisedButton
                            label="登录"
                            primary
                            onTouchTap={this.doLogin}
                            fullWidth
                        />
                    </div>
                </Card>
            </div>
        );
    }
}
export default Login;
