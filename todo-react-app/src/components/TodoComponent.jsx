import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form,Field, ErrorMessage} from 'formik';
import AuthenticationService from './AuthenticationService.js';
import TodoDataService from '../api/TodoDataService.js';

class TodoComponent extends Component{

    constructor(params) {
        super(params)
        this.state={
            id:this.props.match.params.id,
            description:"",
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate= this.validate.bind(this);
    }

    componentDidMount(){
        if(Number(this.state.id)===-1){
            return
        }
        const username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username,this.state.id)
        .then(
            res=>{
                this.setState({
                    description:res.data.description,
                    targetDate:res.data.targetDate
                })
            }
        )
    }

    onSubmit(values){
        const username = AuthenticationService.getLoggedInUserName();

        if(this.state.id===-1){
            TodoDataService.createTodo(username,{   
                id:this.state.id,         
                description:values.description,
                targetDate:values.targetDate
            }).then(res=>{
                this.props.history.push("/todos");
            })
        }
        else{
            TodoDataService.updateTodo(username,this.state.id,{
                id:this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(res=>{
                this.props.history.push("/todos");
            })
        }
    }

    validate(values){
        let errors={}
        if(!values.description){
            errors.description = "Description field is empty. Please add description."
        }
        else if(values.description.length<5){
            errors.description = "Description must be at least 5 characters!"
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Date is invalid";
        }

        return errors;
    }

    render(){
        //descrupturing
        const {description,targetDate}=this.state;

        return(
            <div>
                <h1>To do</h1>
                <div className="container">
                    <Formik initialValues={{description,targetDate}} 
                    onSubmit={this.onSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validate={this.validate}
                    enableReinitialize={true}                    
                    >
                    {
                        (props)=>(
                            <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <ErrorMessage name="targetDate" component ="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label >Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </Form>
                        )
                    }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent;