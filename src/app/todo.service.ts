import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoObject} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  async userLogin(username: string, password: string) {
    const resp = await  this.http.post<any>('https://615dec0412571a00172079a1.mockapi.io/api/v1/login',{username: username, password: password}).toPromise();
    if(!resp.token){
      return false;
    };
    localStorage.setItem('access-token',resp.token);
    return true;
  };

  async getTodoList(): Promise<TodoObject[]>{
    return await this.http.get<TodoObject[]>('https://jsonplaceholder.typicode.com/todos').toPromise();
  };

  async createTodo(title: string): Promise<TodoObject>{
    return await this.http.post<TodoObject>('https://jsonplaceholder.typicode.com/todos',{"title": title, "completed": true}).toPromise();
  };

  validateTitle(title: string) {
    return title && title.length > 5 ? true : false;
  };

  async updateTodo(todo: TodoObject): Promise<TodoObject> {
    return await this.http.put<TodoObject>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo).toPromise();
  };

  async deleteTodo(id: number): Promise<TodoObject> {
    return await this.http.delete<TodoObject>(`https://jsonplaceholder.typicode.com/todos/${id}`).toPromise();
  };

  async getTodoDetail(id: number): Promise<TodoObject> {
    return await this.http.get<TodoObject>(`https://jsonplaceholder.typicode.com/todos/${id}`).toPromise();
  };
}
