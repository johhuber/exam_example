import React from 'react';

import RegisterComponent from './register/Register';
import LoginComponent from './login/Login';
import UserListComponent from './users/UserList';

import apiService, { ISession } from '../services/ApiService';
import { Switch, Route, RouteComponentProps, withRouter, Redirect } from 'react-router';
import TodoListComponent from './todos/TodoListComponent';

interface IState {
  session: ISession | undefined;
}

class Content extends React.Component<RouteComponentProps, IState> {
  state: IState = {
    session: undefined
  };

  private onRegister = () => {

    this.props.history.push("/login");
  }

  private onLogin = (session: ISession) => {
    this.setState({
      session
    });
    this.props.history.push("/todos");
  }

  public render() {

    return (<>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/register">
          <RegisterComponent onRegister={this.onRegister}></RegisterComponent>
        </Route>
        <Route path="/login">
          <LoginComponent onLogin={this.onLogin} ></LoginComponent>
        </Route>
        <Route path="/users">
          <UserListComponent session={this.state.session!} />
        </Route>
        <Route path="/todos">
          <TodoListComponent session={this.state.session!} />
        </Route>
      </Switch>
    </>);
  }
}

export default withRouter(Content);