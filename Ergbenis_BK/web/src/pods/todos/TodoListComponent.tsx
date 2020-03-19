import React from 'react';

import apiService, { ISession, ITodo,  } from '../../services/ApiService';
import { withRouter, RouteComponentProps } from 'react-router';
import ToDoListComponentItem from './ToDoListComponentItem';
import { Interface } from 'readline';
import { isTSModuleBlock } from '@babel/types';

interface IProps extends RouteComponentProps {
  session: ISession;
}

interface IState {
  todos: ITodo[];
  toDoEdit?: ITodo;
}

class TodoListComponent extends React.Component<IProps, IState> {
  state : IState = {
    todos: Array<ITodo>(),


  };

  public componentDidMount() {
    // prevent users to enter if there is no session
    if (this.props.session == null) {
      this.props.history.push('/');
    }

    apiService.getTodos(this.props.session.token).then(todos => {
      this.setState({
          todos: todos,
      })

     });
  }
  public getToDoToEdit = (id: string)=>{
    for (let i =0; i<this.state.todos.length; i++){
      if (this.state.todos[i].id === id){
        this.setState({
            toDoEdit: this.state.todos[i]
        });
      }
    }



  }
  public updateToDo= (editITodo: ITodo)=>{
    apiService.updateTodo(this.props.session.token, editITodo);
  }

  public render() {
    return (
      <div className="list">
        <div className="list-container">
          <header className="list-header">

          </header>
          <main className="list-content">
            <div id="listitem">
              <h1>ToDo List</h1>
          {this.state.todos.map((todos)=>
            <div>
              <ToDoListComponentItem key={todos.id} user={todos.user} text={todos.text} done={todos.done} id={todos.id} getToDoToEdit={this.getToDoToEdit} edit={this.state.toDoEdit} updateToDo={this.updateToDo}></ToDoListComponentItem>
      </div>
          )
          }
          </div>


          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(TodoListComponent);