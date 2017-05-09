import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Form from '../Form';
function ppHOC(WrappedComponent) {
    return class PP extends Component {
        constructor(props) {
            super(props);
            this.doRegister = this.doRegister.bind(this);
        }
        doRegister(state) {
            fetch('/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${state.name}&password=${state.password}`,
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.success) {
                        browserHistory.push({
                            pathname: '/message',
                            search: '',
                            state: {
                                result: data.success,
                                message: data.message,
                            },
                        });
                    }
                });
        }
        render() {
            return (
                <WrappedComponent
                    submitText="注册"
                    handleSubmit={this.doRegister}
                />
            );
        }
    };
}
export default ppHOC(Form);
