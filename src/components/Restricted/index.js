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
            .then((res) => {
                this.setState({ isLogin: res.access });
            })
            .catch((err) => {
                this.setState({ isLogin: false });
            });
    }
    render() {
        return (
            <h1>
                登录了吗？{this.state.isLogin ? '是' : '否'}
            </h1>
        );
    }
}
export default Restricted;
