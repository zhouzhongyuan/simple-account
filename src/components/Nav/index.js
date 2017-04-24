import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
const style = {
    container: {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
    },
    menu: {
        display: 'flex',
        backgroundColor: 'transparent',
    },
};
class Nav extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        // 保存当前路由
        // logout
        fetch('/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.blob())
            .then((myBlob) => {
                console.log(myBlob);
            });
        // redirect to
    }
    render() {
        const navElement = (
            <div>
                <Paper style={style.container}>
                    <Menu listStyle={style.menu}>
                        <Link to={'/register'} activeClassName="active"><MenuItem primaryText="注册" /></Link>
                        <Link to={'/login'} activeClassName="active"><MenuItem primaryText="登录" /></Link>
                        <MenuItem
                            primaryText="退出"
                            onTouchTap={this.logout}
                        />
                        <Link to={'/restricted'} activeClassName=""><MenuItem primaryText="我的" /></Link>
                    </Menu>
                </Paper>
            </div>
        );
        return (
            <div>
                <AppBar
                    title="Account Demo"
                    iconElementRight={navElement}
                />
                {this.props.children}
            </div>
        );
    }
}
export default Nav;