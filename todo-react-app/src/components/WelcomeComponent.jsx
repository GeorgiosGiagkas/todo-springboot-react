import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../api/HelloService.js';

class WelcomeComponent extends Component{
    constructor(params) {
        super(params);

        this.state = {
            welcomeMessage:''
        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldBeanService(this.props.match.params.name)
        .then(res=>{            
            this.handleSuccessfulResponse(res.data.message)            
        })
        .catch(error=>{
            this.handleError(error);
        });
    }
    handleSuccessfulResponse(response){
        this.setState({
            welcomeMessage:response
        });
    }

    handleError(error){
        console.log(error.response);
        let errorMessage = "";
        if(error.message){
            errorMessage+=error.message
        }
        if(error.response && error.response.data){
            errorMessage+=error.response.data;
        }
        this.setState({
            welcomeMessage:errorMessage
        })
    }

    render(){
        return(
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. Manage your Todo List <Link to="/todos">here</Link>            
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Click </button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
}


export default WelcomeComponent;