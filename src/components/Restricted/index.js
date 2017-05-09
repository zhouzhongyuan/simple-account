import React, { Component } from 'react';
class Restricted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }
    componentDidMount() {
        fetch('/restricted', {
            method: 'get',
            credentials: 'include',
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ isLogin: data.success });
            })
            .catch((err) => {
                this.setState({ isLogin: false });
            });
    }
    render() {
        return (
            <h1>
                {this.state.isLogin ? '恭喜你，登录成功！' : '未登录！'}
            </h1>
        );
    }
}
export default Restricted;
