import { Injectable, NotImplementedException } from '@nestjs/common';
import * as uuid from 'uuid';
import * as fs from 'fs';

export interface IDb {
    users: IUser[];
    sessions: ISession[];
    todos: ITodo[];
}

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
}

export interface ISession {
    token: string;
    userId: string;
}

export interface ITodo {
    id: string;
    user: string;
    text: string;
    done: false;
}

@Injectable()
export default class DbRepository {

    private db: IDb;
    private fileName: string;

    public async initializeDatabase(file: string): Promise<void> {

        this.fileName = file;
        const str = fs.readFileSync(this.fileName, 'UTF8');
        this.db = JSON.parse(str) as IDb;
    }

    public async save(): Promise<void> {
        if (this.fileName === null) {
            throw new Error('Database has not been loaded before');
        }

        fs.writeFileSync(this.fileName, JSON.stringify(this.db), 'UTF8');
    }

    async addUser(email: string, firstName: string, lastName: string, passwordHash: string): Promise<IUser> {
        const user = {
            id: uuid.v4().toString(),
            email,
            firstName,
            lastName,
            passwordHash,
        };

        this.db.users.push(user);

        await this.save();

        return user;
    }

    async addSession(user: IUser): Promise<ISession> {
        const session = {
            token: uuid.v4().toString(),
            userId: user.id,
        };

        this.db.sessions.push(session);

        await this.save();

        return session;
    }

    async findUserByEmail(email: string): Promise<IUser | undefined> {
        return this.db.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    async findSessionByToken(token: string): Promise<ISession | undefined> {
        return this.db.sessions.find(session => session.token === token);
    }

    async findUserById(id: string): Promise<IUser | undefined> {
        return this.db.users.find(user => user.id === id);
    }

    async findUsers(): Promise<IUser[]> {
        return this.db.users;
    }

    async deleteSession(token: string): Promise<void> {
        this.db.sessions = this.db.sessions.filter(session => session.token !== token);

        return await this.save();
    }

    async addTodo(userId: string, text: string): Promise<ITodo> {

        const todo: ITodo = {
            user: userId,
            text,
            done: false,
            id: uuid.v4().toString(),
        };

        this.db.todos.push(todo);

        await this.save();
        return todo;
    }

    async findTodos(): Promise<ITodo[]> {

        throw new Error('not implemented');
    }

    async findTodosByUser(userId: string): Promise<ITodo[]> {

        throw new Error('not implemented');
    }

    async findTodoById(id: string): Promise<ITodo> {

        throw new Error('not implemented');
    }

    async deleteTodo(id: string): Promise<void> {

        throw new Error('not implemented');
    }

    async updateTodo(todo: ITodo): Promise<void> {

        await this.deleteTodo(todo.id);
        this.db.todos.push(todo);
    }
}
