import React, { useState } from 'react';
import bs from 'bootstrap/dist/css/bootstrap.module.css';
/*
* Function untuk render multiple class
* Dijadikan array dulu -> di map -> langsung di jadiin string
*/
const rc = (classes) => ((classes.split(' ')).map(classs => bs[classs])).join(' ');

const Todo = ({ todo, index, completedTodo, deleteTodo, detailsTodo }) => {
    let dis = {}, disDel = {};

    ( todo.isCompleted ) ? dis['disabled'] = 'disabled' : disDel['disabled'] = 'disabled';
    return (
        <li className={ rc('list-group-item d-flex justify-content-between align-items-center') } >
            <span 
                style={{
                    textDecoration: todo.isCompleted ? 'line-through' : '',
                    color: todo.isCompleted ? 'red' : ''
                }} > { todo.text } </span>
            <div>
                <button 
                    type="button"
                    className={ rc('btn btn-sm btn-primary') }
                    onClick={ () => completedTodo(index) }
                    {...dis}
                >Completed</button>
                <button 
                    type="button"
                    className={ rc('btn btn-sm btn-warning mx-1') }
                    onClick={ () => detailsTodo(index) }
                >Detail</button>
                <button 
                    type="button"
                    className={ rc('btn btn-sm btn-danger') }
                    onClick={ () => deleteTodo(index) }
                    {...disDel}
                >Delete</button>
            </div>
        </li>
    );
}

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        if(!value) return;
        addTodo(value);
        setValue('');
    }

    return (
        <div className={ rc('card mb-3') }>
            <div className={ rc('card-header') }>
                <h4 className={ bs['text-center'] }>Add New Todo</h4>
            </div>
            <div className={ bs['card-body'] } >
                <form onSubmit={ handleSubmit } className={ bs['mt-2'] }>
                  <div className={ rc('form-group m-0') }>
                    <input 
                        type="text"
                        className={ bs['form-control'] }
                        placeholder="Add Todo.."
                        value={ value }
                        onChange={ e => setValue(e.target.value) }
                    />
                  </div>
                </form>  
            </div>
        </div>
    );
}

const TodoDetail = ({ todo }) => {
    return (
        <div className={ rc('card text-center') }>
          <div className={ bs['card-header'] }>
            <h4>Detail Todo</h4>
          </div>
          <div className={ bs['card-body'] }>
            <h5 className={ bs['card-title'] }>{ todo.text }</h5>
            <p className={ bs['card-text'] }>With supporting text below as a natural lead-in to additional content.</p>
            <button
                type="button"
                className={ rc('btn btn-secondary') }
                // onClick={ () => unCompleted(todo) }
            >Uncompleted</button>
          </div>
          <div className={ rc('card-footer text-muted') }>
            2 days ago
          </div>
        </div>
    );
}

const App = () => {
    const [todos, setTodos] = useState([
        { id: 0, text: 'Mangan Sapi', isCompleted: false },
        { id: 1, text: 'Mangan Wedos ambek arek2', isCompleted: true },
        { id: 2, text: 'Mangan Kebo dewean', isCompleted: false },
    ]);

    if(todos.length === 0)
        console.log(0)
    const [ todo, setTodo ] = useState({ id: null, text: 'Title todo', isCompleted: false });
    
    const addTodo = text => {        
        setTodos([...todos, { id: (todos.length !== 0) ? (todos[todos.length - 1].id) + 1 : 0, text, isCompleted: false }]);
    }

    const completedTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    }

    const detailsTodo = index => setTodo(todos[index]);

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <div className={ bs['p-5'] }>
            <div className={ rc('row') }>
                <div className={ rc('col col-md-6 col-lg-6') }>
                    <div className={ rc('card') }>
                        <div className={ rc('card-header') }>
                            <h4 className={ bs['text-center'] }>Todo List</h4>
                        </div>
                        <div className={ bs['card-body'] } >
                            <ul className={ bs['list-group'] }>
                                { todos.map((todo, index) => <Todo 
                                    key={ index }
                                    index={ index } 
                                    todo={ todo } 
                                    completedTodo={ completedTodo }
                                    deleteTodo={ deleteTodo }
                                    detailsTodo={ detailsTodo }
                                />) }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={ rc('col col-md-6 col-lg-6') }>
                    <TodoForm addTodo={ addTodo } />
                    <TodoDetail todo={todo} />
                </div>
            </div>
        </div>
    );

}

export default App;
