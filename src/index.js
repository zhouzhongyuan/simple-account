import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Login, NotFound, Nav, Register, Restricted, Message, Home } from './components';
injectTapEventPlugin();
const App = () => (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Nav} >
                <IndexRedirect to="/home" />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/my" component={Restricted} />
                <Route path="/message" component={Message} />
                <Route path="/home" component={Home} />
            </Route>
            <Route path="*" component={NotFound} />
        </Router>
    </MuiThemeProvider>
);
ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
