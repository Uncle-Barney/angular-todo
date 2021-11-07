import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-sort',
  templateUrl: './todo-sort.component.html',
  styleUrls: ['./todo-sort.component.css']
})
export class TodoSortComponent  {
  constructor() { }
  @Output() changeStatusFilter =  new EventEmitter<string>();
  @ViewChild('sortTodo') sortResult!: ElementRef;
  changeStatus(): void {
    this.changeStatusFilter.emit(this.sortResult.nativeElement.value);
  }

}
