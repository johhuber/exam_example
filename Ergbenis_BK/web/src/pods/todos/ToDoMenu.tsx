import React from 'react';

import { ISession, ITodo } from '../../services/ApiService';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router';

import { Button, Form } from 'reactstrap';

import TodoListComponent from './TodoListComponent';
import ToDoAdd from './ToDoAdd';

interface IProps extends RouteComponentProps {
  session: ISession;

}

interface IState {
  todos: ITodo[];

}

class ToDoMenu extends React.Component<IProps, IState> {
  state : IState = {

    todos: Array<ITodo>()
  };

  public componentDidMount() {
    // prevent users to enter if there is no session
    if (this.props.session == null) {
      this.props.history.push('/');
    }


  }

  private onView =() =>{

      console.log("/view test")
    this.props.history.push("/todos/view");
  }

  private onAdd =() =>{

    console.log("/view add")
  this.props.history.push("/todos/add");
}

  public render() {
    return (
      <div>
        <Switch>
        <Route path="/todos/view">
          <TodoListComponent session={this.props.session!} />
        </Route>
        <Route path="/todos/add">
          <ToDoAdd session={this.props.session!} />
        </Route>
        </Switch>
      <div className="list">
        <div className="list-container">
          <header className="list-header">

          </header>
          <main className="list-content">
            <Form className="todo-form">
              <div style={{margin: "10px"}}>
            <Button className="btn btn-info btn-block" onClick={()=> this.onView()}>Übersicht</Button>
            </div>
            <div style={{margin: "10px"}}>
            <Button className="btn btn-info btn-block" onClick={()=> this.onAdd()}>ToDo Hinzufügen</Button>
            </div>
            </Form>
          </main>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(ToDoMenu);