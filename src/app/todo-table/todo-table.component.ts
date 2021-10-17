
import { Component, OnInit, Input} from '@angular/core';

export interface TodoObject {
  id: number
  title: string,
  isDone: boolean,
  isEdit: boolean
}

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css'],

})

export class TodoTableComponent implements OnInit  {

  constructor() { }
  ngOnInit(): void {
  }

  @Input() todoList: TodoObject[] = [];
  curTitle: string = '';
  curStateChecked: boolean = false;

  editTodo(item: TodoObject) {
    item.isEdit = true;
    this.curTitle = item.title;
    this.curStateChecked = item.isDone;
    this.todoList.filter(element => {
      if(element.id !== item.id){
        element.isEdit = false;
      }
    } );
  };

  saveEdit(item: TodoObject) {
    if(item.title.length <= 5) {
      alert('todo title must be more than five characters');
      return
    }
    item.isEdit = false;
  };

  cancelEdit(item: TodoObject) {
    item.title = this.curTitle;
    item.isDone = this.curStateChecked;
    item.isEdit = false;
  };
  deleteTodo(item: TodoObject){
    const answer = window.confirm('are you sure to delete this todo ?');
    if(answer){
      this.todoList.find((element,index) => {
        if(element.id === item.id){
          this.todoList.splice(index,1);
        }
      });
    };
  };

}
