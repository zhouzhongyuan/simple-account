import React, { Component } from 'react';
class Message extends Component {
    render() {
        return (
            <h1>
                {this.props.location.state.msg}
            </h1>
        );
    }
}
export default Message;
