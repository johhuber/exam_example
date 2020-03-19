import React from 'react';
import ApiService from '../../services/ApiService';
import { Link } from 'react-router-dom';

interface IProps {
  onRegister: () => void;
}

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default class RegisterComponent extends React.Component<IProps, IState> {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  private register = () => {

    ApiService.registerUser(this.state.email, this.state.firstName, this.state.lastName, this.state.password).then(() => {

      alert('User has been registered');
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      });

      this.props.onRegister();
    });
  }

  private handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  private handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      firstName: e.target.value
    })
  }

  private handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      lastName: e.target.value
    })
  }

  private handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  public render() {

    const state = this.state;

    return (
      <div className="register">
        <div className="register-container">
          <header className="register-header">
            
          </header>
          <main className="register-content">
            <form className="register-form">
              <h1 className="text-center">Register an account</h1>
              <div className="form-group">
                <label className="">Email</label>
                <input placeholder="Please enter your email address" type="text" className="form-control" value={state.email} onChange={this.handleEmail} />
              </div>
              <div className="form-group">
                <label className="">First Name</label>
                <input placeholder="Please enter your first name" type="text" className="form-control" value={state.firstName} onChange={this.handleFirstName} />
              </div>
              <div className="form-group">
                <label className="">Last Name</label>
                <input placeholder="Please enter your last name" type="text" className="form-control" value={state.lastName} onChange={this.handleLastName} />
              </div>
              <div className="form-group">
                <label className="">Password</label>
                <div className="input-group">
                  <input placeholder="Please enter your password" type="password" className="form-control" value={state.password} onChange={this.handlePassword} />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success btn-block" onClick={this.register}>Register</button>
              </div>
              <div className="form-group">
                <p className="text-center">
                  Already a user?
                  <Link to="/login">Login Here!</Link>
                </p>
              </div>
            </form>
          </main>
        </div>
      </div>
    );
  }
}