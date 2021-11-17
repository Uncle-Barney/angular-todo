import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'todo', 
        children: [
            {
                path: '',
                component: TodoListComponent
            }
        ]
    },
    {
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full'
    },
    {
        path: '**', 
        component: NotfoundComponent
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }