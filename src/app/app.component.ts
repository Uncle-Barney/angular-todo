import { Component } from '@angular/core';
import { TodoObject } from './todo-table/todo-table.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoList: TodoObject[] = [{id: 1, title: 'do something', isDone: false, isEdit: false},
                            {id: 2, title: 'do nothing', isDone: false, isEdit: false},
                            {id: 3, title: 'do everything', isDone: false, isEdit: false},
                            {id: 4, title: 'don\'t do anything', isDone: false, isEdit: false},
                            {id: 5, title: 'people make it complicated', isDone: false, isEdit: false}];
  todoId: number = 1;
  pushTodo(todo: string): void {
    this.todoId += this.todoList.length; 
    this.todoList.unshift({id: this.todoId, title: todo, isDone: false, isEdit: false});   
    
  }
  
}
