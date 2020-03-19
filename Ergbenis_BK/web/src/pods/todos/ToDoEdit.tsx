import React from 'react';
import { Button, Input } from 'reactstrap';
import ApiService, { ITodo } from '../../services/ApiService';

interface IProps {
  user: string;
  text: string;
  done: boolean;
  id: string;
  updateToDo: (editITodo: ITodo) => void;
}

interface IState {
  text: string;
  done: false;
  editItodo?: ITodo
  }




export default class ToDoEdit extends React.Component<IProps> {

  state : IState = {
    text:'',
  done: false
};

  public setInputText=(ev: React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({
        text: ev.target.value
    });
  }

  public setInputDone=() =>{
      let bool = this.state.done;
    this.setState({
        done: !bool,
    });
  }

  public createItodo (){
    const todo: ITodo ={
      user: this.props.user,
      text: this.state.text,
      done: this.state.done,
      id: this.props.id

    }


    this.props.updateToDo(todo);


  }


  public render() {
    return (
      <div className="todo-list-item">

        <div className="todo-list-text">Text:
        <Input type="text" defaultValue={this.props.text} onChange={this.setInputText}>  </Input>
        </div>
        <div className="todo-list-done">Done?
          <Input style={{position: "absolute", marginTop: "0rem", marginLeft: "1rem"}} type="checkbox" onChange={this.setInputDone}></Input></div>
          <div>
          <Button onClick={() => {this.createItodo()}}>Edit</Button>
          </div>

      </div>
    );
  }
}