import { browserHistory } from 'react-router';
import React from 'react';
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
                    if (data.success) {
                        browserHistory.push({
                            pathname: '/message',
                            search: '',
                            state: {
                                result: data.success,
                                message: data.message,
                            },
                        });
                    } else {
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
                    submitText="登录"
                    handleSubmit={this.doLogin}
                />
            );
        }
    };
}
export default iiHOC(Form);
