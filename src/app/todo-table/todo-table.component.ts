
import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { TodoObject } from '../models/models';
import { TodoService } from '../todo.service';



@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css'],
})

export class TodoTableComponent implements OnInit, OnChanges {

  constructor(private todoService: TodoService) { }

  @Input() filter: string = ""; 
  @Input() todos: TodoObject[] = [];
  curTitle: string = '';
  curCompletedValue: boolean | string = false;
  todoList: TodoObject[] = [];
  ngOnInit(): void {
    this.todoList =[...this.todos];
    this.filter = '0';
  }
  ngOnChanges(): void {
    this.todoList = this.filter === '0' ? [...this.todos] : [...this.todos.filter(item => item.completed === JSON.parse(this.filter))];  
    console.log(this.filter);
    
  };
  

  editTodo(item: TodoObject){
    item.isEdit = true;
    this.curTitle = item.title;
    this.curCompletedValue = item.completed;
    this.todoList.filter(element => {
      if(element.id !== item.id){
        element.isEdit = false;
      };
    });
  };

  saveEdit(item: TodoObject) {
    if(!this.todoService.validateTitle(item.title)) {
      alert('todo title must be more than five characters');
      return;
    };
    item.isEdit = false;
    this.todoService.updateTodo(item).subscribe(data => console.log(data));
    if(item.completed && this.filter !== '0'){
      this.todoList.find((element,index) => {
        if(element.id === item.id){
          this.todoList.splice(index,1);
        };
      });
    };
    
  };

  cancelEdit(item: TodoObject) {
    item.title = this.curTitle;
    item.completed = this.curCompletedValue;
    item.isEdit = false;
  };

  deleteTodo(item: TodoObject){
    const answer = window.confirm('are you sure to delete this todo ?');
    if(answer){
      this.todos.find((element,index) => {
        if(element.id === item.id){
          this.todos.splice(index,1);
          this.todoList.splice(index,1);
        };
      });
      this.todoService.deleteTodo(item.id);
    };
  };

}
