import { Component, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {
  constructor(private todoService: TodoService) {}
  @ViewChild('input') input!: ElementRef;
  isError = false;
  @Output() clickAddBtn = new EventEmitter<string>();

  addTodo() {
    if(this.todoService.validateTitle(this.input.nativeElement.value)){
      this.clickAddBtn.emit(this.input.nativeElement.value);
      this.input.nativeElement.value = '';
      this.isError = false;
    }else{
      this.isError = true;
    };
  }
}
