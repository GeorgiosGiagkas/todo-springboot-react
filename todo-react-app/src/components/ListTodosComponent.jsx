import React, {Component} from 'react';
import TodoDataService from '../api/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

class ListTodosComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            todos:[],
            message:null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.addTodoClicked= this.addTodoClicked.bind(this);
    }

    deleteTodoClicked(id){
        const username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
        .then(res=>{
            this.setState({
                message:`Delete to do item with id ${id} was successful`
            });
            this.refreshTodos();
        })
    }
    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked(){
        this.props.history.push(`/todos/-1`);
    }
    componentDidMount(){
       this.refreshTodos();
    }

    refreshTodos(){
        const username = AuthenticationService.getLoggedInUserName();
            TodoDataService.retrieveAllTodos(username).then(res=>{            
                    this.setState({
                        todos:res.data
                    })
                })
    }

    render(){
        return(
            <>
                <h1>List todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">                
                    <table className="table">
                        <thead>
                            <tr>                        
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>                                
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    (todo)=>{
                                        return(
                                            <tr key={todo.id}>                                            
                                                <td>{todo.description}</td>
                                                <td>{todo.targetDate}</td>
                                                <td>{todo.done.toString()}</td>                                                
                                                <td><button onClick={()=>{this.updateTodoClicked(todo.id)}} className="btn btn-success">Update</button></td>
                                                <td><button onClick={()=>{this.deleteTodoClicked(todo.id)}} className="btn btn-danger">Delete</button></td>
                                            </tr>
                                        )
                                    }
                                )
                            }                        
                        </tbody>
                    </table>
                    <div className="row">
                        <button onClick={this.addTodoClicked} className="btn btn-success">Add</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ListTodosComponent;