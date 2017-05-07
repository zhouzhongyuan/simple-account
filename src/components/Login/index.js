import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import Form from '../Form';
function iiHOC(WrappedComponent) {
    return class PP extends WrappedComponent {
        constructor(props) {
            super(props);
            this.doLogin = this.doLogin.bind(this);
        }
        doLogin(state) {
            fetch('/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${state.name}&password=${state.password}`,
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.status) {
                        browserHistory.push({
                            pathname: '/message',
                            search: '',
                            state: { msg: '登录成功' },
                        });
                    }
                });
        }
        render() {
            return (
                <WrappedComponent
                    submitText="登录"
                    handleSubmit={this.doLogin}
                />
            );
        }
    };
}
export default iiHOC(Form);
