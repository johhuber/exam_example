import React from 'react';
import { Button, Label, Input } from 'reactstrap';
import apiService, { ISession } from '../../services/ApiService';
import { withRouter, RouteComponentProps } from 'react-router';


interface IProps extends RouteComponentProps {
  session: ISession;
}

interface IState {
text: string;
done: boolean;
}

class ToDoAdd extends React.Component<IProps, IState> {
  state = {
      text:'',
    done: false
  };


  public componentDidMount() {
    // prevent users to enter if there is no session
    if (this.props.session == null) {
      this.props.history.push('/');
    }
  }

  public setInputText=(ev: React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({
        text: ev.target.value
    });
  }

  public setInputDone(){
      let bool = this.state.done;
    this.setState({
        done: !bool,
    });
  }

  public inputToDo= () => {
    console.log(this.props.session);


    apiService.createTodo(this.props.session.token, this.state.text);
  }

  public render() {
    return (
      <div className="list">
        <div className="list-container">
          <header className="list-header">

          </header>
          <main className="list-content">
            <div className="add-form">

          <Label>To Do</Label>
          <div>
          <Input type="text" placeholder="ToDo eintragen" onChange={this.setInputText}/>
          </div>
          {/*<div>
          <Input style={{position:"absolute", margin:"0rem"}} type="checkbox"/>
          </div>*/}
          <div>
            <Button className=" btn btn-info btn-block" onClick={this.inputToDo}>Hinzufügen</Button>
          </div>
          </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(ToDoAdd);