import { Component, OnInit } from '@angular/core';
import { TodoObject } from '../models/models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService){}
  todoList: TodoObject[] = [];
  todoId: number = 1;
  statusFilter: string = '';


  ngOnInit() {
    this.todoService.getTodoList()
    .subscribe(data =>{
      this.todoList = data.splice(1,5);
    });
    
  };
  
  async pushTodo(title: string) {
    this.todoService.createTodo(title)
    .subscribe(data => {
      this.todoList = [...[data], ...this.todoList]; 
    });
    
  };

  getStatusFilter(status: string) {
      this.statusFilter = status;
  };
}
