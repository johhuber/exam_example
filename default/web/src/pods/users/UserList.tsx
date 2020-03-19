import React from 'react';
import apiService, { IUser, ISession, ITodo } from '../../services/ApiService';
import UserListItem from './components/UserListItem';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'reactstrap';

interface IProps extends RouteComponentProps {
  session: ISession;
}

interface IState {
  users: IUser[];
}

class UserListComponent extends React.Component<IProps, IState> {
  state = {
    users: Array<IUser>()
  };

  public componentDidMount() {
    // prevent users to enter if there is no session
    if (this.props.session == null) {
      this.props.history.push('/');
    }
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
            {this.state.users.map((user) =>
              <UserListItem email={user.email} firstName={user.firstName} lastName={user.lastName} />
            )
            }
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(UserListComponent);