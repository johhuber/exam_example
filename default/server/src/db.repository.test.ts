import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import DbRepository, { IDb } from './db.repository';
import * as fs from 'fs';
import * as path from 'path';

describe('DbRepository', () => {

    let db: DbRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [DbRepository],
        }).compile();

        db = app.get<DbRepository>(DbRepository);
    });

    const initDb = async (data: IDb) => {

        const file = path.join(__dirname, '..', 'db.repository.test.json');
        fs.writeFileSync(file, JSON.stringify(data), 'UTF8');

        await db.initializeDatabase(file);
    };

    it('should be able to find todos', async () => {

        await initDb({
            users: [],
            sessions: [],
            todos: [
                { id: 'id1', user: 'user1', text: 'text1', done: false },
                { id: 'id2', user: 'user2', text: 'text2', done: false },
                { id: 'id3', user: 'user3', text: 'text3', done: false },
            ],
        });

        const todos = await db.findTodos();
        expect(todos).toHaveLength(3);
    });

    it('should be able to find todos by user', async () => {

        await initDb({
            users: [],
            sessions: [],
            todos: [
                { id: 'id1', user: 'user1', text: 'text1', done: false },
                { id: 'id2', user: 'user2', text: 'text2', done: false },
                { id: 'id3', user: 'user3', text: 'text3', done: false },
            ],
        });

        const todos = await db.findTodosByUser('user1');
        expect(todos).toHaveLength(1);
        expect(todos[0].id).toBe('id1');
    });

    it('should be able to find todos by id', async () => {

        await initDb({
            users: [],
            sessions: [],
            todos: [
                { id: 'id1', user: 'user1', text: 'text1', done: false },
                { id: 'id2', user: 'user2', text: 'text2', done: false },
                { id: 'id3', user: 'user3', text: 'text3', done: false },
            ],
        });

        const todo = await db.findTodoById('id2');
        expect(todo).toBeDefined();
        expect(todo.text).toBe('text2');
    });

    it('should be able to delete a todo', async () => {

        await initDb({
            users: [],
            sessions: [],
            todos: [
                { id: 'id1', user: 'user1', text: 'text1', done: false },
                { id: 'id2', user: 'user2', text: 'text2', done: false },
                { id: 'id3', user: 'user3', text: 'text3', done: false },
            ],
        });

        await db.deleteTodo('id2');
        const todos = await db.findTodos();
        expect(todos).toHaveLength(2);
        expect(todos[1].text).toBe('text3');
    });
});
