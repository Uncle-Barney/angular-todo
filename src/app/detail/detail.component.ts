import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }
  id!: string | null;
  name!: string | null;
  async ngOnInit()  {
    // let id = this.route.snapshot.params.get.id;
    // const resp = await this.todoService.getTodoDetail(id);
    // console.log(resp);
    this.route.queryParamMap.subscribe((paramMap: ParamMap) =>{
      this.id = paramMap.get('id');
      this.name = paramMap.get('name');
    });
    const resp = await this.todoService.getTodoDetail(JSON.parse(this.id!));
    console.log(resp);
  };

}
