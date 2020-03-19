import axios from 'axios';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ISession {
  token: string;
  user: IUser;
}

export interface ITodo {
  id: string;
  user: string;
  text: string;
  done: false;
}

export default {
  async login(email: string, password: string): Promise<ISession> {
    const response = await axios.post<ISession>('http://localhost:4000/login', { email, password });

    return response.data;
  },

  async registerUser(email: string, firstName: string, lastName: string, password: string): Promise<IUser> {
    const response = await axios.post<IUser>('http://localhost:4000/register', { email, password, firstName, lastName });

    return response.data;
  },

  async getUsers(sessionToken: string): Promise<IUser[]> {
    const response = await axios.get<IUser[]>('http://localhost:4000/users', { headers: { 'x-auth-token': sessionToken } });

    return response.data;
  },

  async logout(sessionToken: string): Promise<void> {
    const response = await axios.delete('http://localhost:4000/logout', { headers: { 'x-auth-token': sessionToken } });

    return response.data;
  },

  async getTodos(sessionToken: string): Promise<ITodo[]> {

    console.log(sessionToken);
    const response = await axios.get<ITodo[]>('http://localhost:4000/todos', { headers: { 'x-auth-token': sessionToken } });
    return response.data;
  },

  async deleteTodo(sessionToken: string, id: string): Promise<void> {

    await axios.delete(`http://localhost:4000/todos/${id}`, { headers: { 'x-auth-token': sessionToken } });
  },

  async updateTodo(sessionToken: string, todo: ITodo): Promise<void> {

    await axios.put(`http://localhost:4000/update`, todo, { headers: { 'x-auth-token': sessionToken } });
  },

  async createTodo(sessionToken: string, text: string): Promise<ITodo> {

    const response = await axios.post<ITodo>(`http://localhost:4000/todos`, { text }, { headers: { 'x-auth-token': sessionToken } });
    return response.data;
  }
}