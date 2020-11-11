import * as React from 'react'
import { connect } from 'react-redux'
import List from './List'
import {
    handleAddTodo,
    handleToggle,
    handleDeleteTodo
} from '../actions/todos'



class Todos extends React.Component {
    addItem = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAddTodo(
            this.input.value,
            () => this.input.value = ''
        ))
    }

    removeItem = (todo) => {
        this.props.dispatch(handleDeleteTodo(todo))
    }

    toggleItem = (id) => {
        this.props.dispatch(handleToggle(id))
    }

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <input 
                type="text"
                placeholder='Add Todo'
                ref={(input) => this.input = input}
                />
                <button className='submitBtn' onClick={this.addItem}>Add Todo</button>
                <List 
                items={this.props.todos}
                remove={this.removeItem}
                toggle={this.toggleItem}
                />    
            </div>
        )
    }
}

export default connect((state) => ({
    todos: state.todos
}))(Todos)