import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    static defaultProps = {
        submitText: '',
        handleSubmit: function() {},
    }
    static propTypes = {
        submitText: PropTypes.sting,
        handleSubmit: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(e, v) {
        this.setState({ name: v });
    }
    handlePasswordChange(e, v) {
        this.setState({ password: v });
    }
    handleSubmit() {
        this.props.handleSubmit(this.state);
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
                            label={this.props.submitText}
                            primary
                            onTouchTap={this.handleSubmit}
                            fullWidth
                        />
                    </div>
                </Card>
            </div>
        );
    }
}
export default Login;
