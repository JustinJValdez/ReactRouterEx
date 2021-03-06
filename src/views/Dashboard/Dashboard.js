import React, {Component} from 'react';
import axios from 'axios';
import './Dashboard_styles.css';
import Todo from './Components/Todo/Todo'
import {Link} from 'react-router-dom'
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            todos: []
        }
        this.complete = this.complete.bind(this)
        this.delete = this.delete.bind(this)

    }

    componentDidMount(){
        axios.get(`/api/todo`)
            .then((response)=>{
                this.setState({
                    todos: response.data
                })
            })
    }

    complete(id){
        const body = {
            id,
            shouldComplete: true,
        }
        axios.put(`/api/todo`, body)
            .then((response)=>{
                this.setState({
                    todos: response.data,
                })
            })
    }

    delete(id){
        axios.delete(`/api/todo/${id}`)
        .then((response)=>{
            this.setState({
                todos: response.data,
            })
        })
    }

    render(){
        let todos = this.state.todos.map((todo)=>{
            return <Todo key={todo.id} id={todo.id} Delete={this.delete} IsComplete={todo.isCompleted} Complete={this.complete} text={todo.todo}/>
        })
        return(
            <div>
            <h1>Dashboard</h1>
                <Link to={`/create`}>
                    <button className="Create-button">
                        Create Todo
                    </button>
                </Link>
                {todos}
            </div>
        )
    }
}
export default Dashboard