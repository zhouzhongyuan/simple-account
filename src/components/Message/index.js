import React from 'react';
import PropTypes from 'prop-types';
function Message(props) {
    return (
        <div>
            <h1>
                是否成功: {props.location.state.result ? '是' : '否'}。
            </h1>
            <div>
                {props.location.state.message}
            </div>
        </div>
    );
}
Message.propTypes = {
    location: PropTypes.object,
};
export default Message;
