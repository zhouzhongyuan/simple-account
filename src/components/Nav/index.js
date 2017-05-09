import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import { Link, browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import './index.css';
const style = {
    container: {
        margin: '16px 32px',
        display: 'flex',
    },
};
class Nav extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
    };
    static goHome = () => {
        browserHistory.push({
            pathname: '/',
        });
    };
    // goHome() {
    //     browserHistory.push({
    //         pathname: '/',
    //     });
    // }
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        // this.goHome = this.goHome.bind(this);
    }
    logout() {
        // logout
        fetch('/logout', {
            method: 'GET',
            credentials: 'include',
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
        const navElement = (
            <Paper style={style.container}>
                    <Link
                        to={'/register'}
                        activeClassName="active"
                    >
                        <MenuItem primaryText="注册" />
                    </Link>
                    <Link
                        to={'/login'}
                        activeClassName="active"
                    >
                        <MenuItem primaryText="登录" />
                    </Link>
                    <Link>
                    <MenuItem
                        primaryText="退出"
                        onTouchTap={this.logout}
                    />
                    </Link>
                    <Link
                        to={'/my'}
                        activeClassName="active"
                    >
                        <MenuItem primaryText="我的" />
                    </Link>
            </Paper>
        );
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <AppBar
                    title="Account Demo"
                    iconElementLeft={<IconButton><ActionHome /></IconButton>}
                    onLeftIconButtonTouchTap={Nav.goHome}
                    iconClassNameLeft={null}
                    iconElementRight={navElement}
                    iconStyleRight={{ margin: 0 }}
                />
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Nav;
