import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  constructor() {}
  applyCss: boolean = true;
  inputValue: string = '';
  isError = false;
  @Output() clickAddBtn = new EventEmitter<string>();
  ngOnInit(): void {}
  checkInput(todo: string) {
    return this.isError = todo.length > 5 ? false : true;
  }
  addTodo() {
    if(!this.checkInput(this.inputValue)){
      this.clickAddBtn.emit(this.inputValue);
      this.inputValue = '';
    };
  }
}
