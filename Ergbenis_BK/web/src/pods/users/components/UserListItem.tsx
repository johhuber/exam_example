import React from 'react';

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
}

export default class UserListItem extends React.Component<IProps> {
  public render() {
    return (
      <div className="user-list-item">
        <div className="user-list-email">{this.props.email}</div>
        <div className="user-list-first-name">{this.props.firstName}</div>
        <div className="user-list-last-name">{this.props.lastName}</div>
      </div>
    );
  }
}