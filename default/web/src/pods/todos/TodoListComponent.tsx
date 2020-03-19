import React from 'react';

import apiService, { ISession, ITodo } from '../../services/ApiService';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  session: ISession;
}

interface IState {
}

class TodoListComponent extends React.Component<IProps, IState> {
  state = {
  };

  public componentDidMount() {
    // prevent users to enter if there is no session
    if (this.props.session == null) {
      this.props.history.push('/');
    }

    // apiService.getTodos(this.props.session.token).then(todos => {

    // });
  }

  public render() {
    return (
      <div className="list">
        <div className="list-container">
          <header className="list-header">
            <div className="list-logo">
              <img src="/img/list.jpg" alt="list Image" />
            </div>
          </header>
          <main className="list-content">

          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(TodoListComponent);