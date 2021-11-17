import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoObject} from './models/models';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

   userLogin(username: string, password: string) {
    const resp = this.http.post<any>('https://615dec0412571a00172079a1.mockapi.io/api/v1/login',{username: username, password: password});
    return resp;
  };

   getTodoList(): Observable<TodoObject[]>{
    return this.http.get<TodoObject[]>('https://jsonplaceholder.typicode.com/todos');
  };

   createTodo(title: string): Observable<TodoObject>{
    return this.http.post<TodoObject>('https://jsonplaceholder.typicode.com/todos',{"title": title, "completed": false});
  };

  validateTitle(title: string) {
    return title && title.length > 5 ? true : false;
  };

   updateTodo(todo: TodoObject): Observable<TodoObject> {
    return this.http.put<TodoObject>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo);
  };

   deleteTodo(id: number): Observable<TodoObject> {
    return this.http.delete<TodoObject>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  };

   getTodoDetail(id: number): Observable<TodoObject> {
    return this.http.get<TodoObject>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  };
}
