import React, {Component} from 'react';
class Message extends Component {
    render() {
        return (
            <div>
                <h1>
                    是否成功: {this.props.location.state.result? '是':'否'}。
                </h1>
                <div>
                    {this.props.location.state.message}
                </div>
            </div>
        );
    }
}
export default Message;
