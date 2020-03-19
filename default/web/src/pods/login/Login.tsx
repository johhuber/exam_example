import React from 'react';

import apiService, { ISession } from '../../services/ApiService';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  onLogin: (session: ISession) => void;
}

interface IState {
  email: string;
  password: string;
}

class LoginComponent extends React.Component<IProps, IState> {
  state = {
    email: '',
    password: ''
  };

  private handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    this.setState({
      ...this.state,
      email: e.target.value
    });
  }

  private handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    this.setState({
      ...this.state,
      password: e.target.value
    });
  }

  private handleQuickLogin = () => {

    apiService.login('test', 'test').then((session) => {
      this.props.onLogin(session);
    });
  }

  private login = () => {

    apiService.login(this.state.email, this.state.password).then((session) => {

      this.props.onLogin(session);
    })
  }

  public render() {
    return (
      <div className="auth">
        <div className="auth-container">
          <header className="auth-header">
            <div className="auth-logo">
              <img src="/img/login.jpg" alt="Login Logo" />
            </div>
          </header>
          <main className="auth-content">
            <form className="auth-form">
              <h1 className="text-center">Please log in</h1>
              <div className="form-group">
                <label className="">Email</label>
                <input placeholder="Please enter your email address" type="text" className="form-control" onChange={this.handleEmail} />
              </div>
              <div className="form-group">
                <label className="">Password</label>
                <div className="input-group">
                  <input placeholder="Please enter your password" type="password" className="form-control-hasAppend form-control" onChange={this.handlePassword} />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success btn-block" onClick={this.login}>Login</button>
              </div>
              <div className="form-group">
                <p className="text-center">
                  Need an account?
                  <Link to="/register">Go to register</Link>
                </p>
              </div>
            </form>
          </main>
        </div>
        <div>
          <button onClick={this.handleQuickLogin}>Quick login</button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginComponent);