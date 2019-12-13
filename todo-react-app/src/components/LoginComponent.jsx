import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            username : "root",
            password : "",
            hasLoginFailed:false,
            showSuccessMessage:false
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }



    //generic event to handle change
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    loginClicked(){ 

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then(
            (res)=>{
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,res.data.token );
                this.props.history.push(`/welcome/${this.state.username}`);
            }
        ).catch(
            ()=>{
                this.setState({
                hasLoginFailed:true,
                showSuccessMessage:false
                });
            }
        )        

    }

    render(){
        return(
            <>            
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials!</div>}
                    {this.state.showSuccessMessage && <div>Login Succeed!</div>}
                    User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success"  onClick={this.loginClicked}>Login</button>
                </div>
            </>
        )
    }
}


export default LoginComponent;