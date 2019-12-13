import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import HeaderComponent from './HeaderComponent';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import TodoComponent from './TodoComponent';

class TodoApp extends Component{    
    render(){
        return (
            <div className="TodoApp">
                <Router>
                <>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                        <AuthenticatedRoute path="/todos" component = {ListTodosComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>                        
                        {/* error page  */}
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </>
                </Router>
            </div>
        )
    }
}

export default TodoApp;