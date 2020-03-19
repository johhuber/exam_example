import { UserResponseDto } from './dtos/UserResponseDto';
import { AuthGuard } from './auth.guard';
import { SessionResponseDto } from './dtos/SessionResponseDto';
import { LoginRequestDto } from './dtos/LoginRequestDto';
import { RegisterUserRequestDto } from './dtos/RegisterUserRequestDto';
import { Controller, Get, Req, Body, Post, UseGuards, Delete, UnauthorizedException, Put, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import DbRepository, { IUser, ITodo } from './db.repository';
import * as bcrypt from 'bcrypt';
import { AddTodoRequestDto } from './dtos/AddTodoRequestDto';

@Controller()
export class AppController {

  constructor(private readonly dbRepository: DbRepository) { }
  @Post('/register')
  public async registerUser(@Body() dto: RegisterUserRequestDto) {

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.dbRepository.addUser(dto.email, dto.firstName, dto.lastName, hashedPassword);

    return await mapToUserResponseDto(user);
  }

  @Post('/login')
  public async login(@Body() dto: LoginRequestDto): Promise<SessionResponseDto> {

    const user = await this.dbRepository.findUserByEmail(dto.email);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(dto.password, user.passwordHash);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    const session = await this.dbRepository.addSession(user);

    return new SessionResponseDto(session.token, mapToUserResponseDto(user));
  }

  @Get('/users')
  @UseGuards(AuthGuard)
  public async getUsers(): Promise<UserResponseDto[]> {

    const users = await this.dbRepository.findUsers();
    return users.map(mapToUserResponseDto);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard)
  public async logout(@Req() req: IAuthorizedRequest): Promise<void> {

    return await this.dbRepository.deleteSession(req.token);
  }

  @Get('/todos')
  @UseGuards(AuthGuard)
  public async getTodos(@Req() req: IAuthorizedRequest): Promise<ITodo[]> {

    // TODO: only get todos for the current user?
    const todos = await this.dbRepository.findTodos();
    return todos;
  }

  @Post('/todos')
  @UseGuards(AuthGuard)
  public async postTodos(@Req() req: IAuthorizedRequest, @Body() dto: AddTodoRequestDto): Promise<ITodo> {

    const user = req.user.id;
    const todo = await this.dbRepository.addTodo(user, dto.text);

    return todo;
  }

  @Put('/update')
  @UseGuards(AuthGuard)
  public async updateTodo(@Body() dto: ITodo): Promise<ITodo> {
    console.log(dto.id);
    const todo = await this.dbRepository.findTodoById(dto.id);
    if (todo == null) {
      throw new NotFoundException();
    }

    todo.text = dto.text;
    todo.done = dto.done;
    await this.dbRepository.updateTodo(todo);
    return todo;
  }

  @Delete('/todos/:id')
  @UseGuards(AuthGuard)
  public async deleteTodo(id: string): Promise<void> {

    await this.dbRepository.deleteTodo(id);
  }
}

const mapToUserResponseDto = (user: IUser): UserResponseDto => {
  return new UserResponseDto(user.id, user.email, user.firstName, user.lastName);
};

interface IAuthorizedRequest extends Request {
  user: IUser;
  token: string;
}
