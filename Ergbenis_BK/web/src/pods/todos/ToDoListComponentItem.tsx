import React from 'react';
import { Button, Input } from 'reactstrap';
import { ITodo } from '../../services/ApiService';
import ToDoEdit from './ToDoEdit';

interface IProps {
  user: string;
  text: string;
  done: boolean;
  id: string;
  getToDoToEdit: (id: string) => void;
  edit?: ITodo
  updateToDo: (editITodo: ITodo) => void;
}

interface IState {
  isEdit: boolean;
}


export default class ToDoListComponentItem extends React.Component<IProps, IState> {

  state : IState = {
    isEdit: false,

  };

  public setIsEdit(){
    this.setState({
      isEdit: true
    })

  }

  public render() {
    return (
      <div className="todo-list-item">
        <div className="todo-list-user">User: {this.props.user}</div>
        <div className="todo-list-text">Text:{this.props.text}</div>
        <div className="todo-list-done">Done?
          <Input style={{position: "absolute", marginTop: "0rem", marginLeft: "1rem"}} type="checkbox" checked={this.props.done}></Input></div>
          <div>
            <Button onClick={() =>{this.props.getToDoToEdit(this.props.id); this.setIsEdit();}}>Edit</Button>
          </div>
          {this.state.isEdit && (<ToDoEdit user={this.props.edit!.user} text={this.props.edit!.text} done={this.props.edit!.done} id={this.props.edit!.id} updateToDo={this.props.updateToDo}></ToDoEdit>)}
      </div>
    );
  }
}