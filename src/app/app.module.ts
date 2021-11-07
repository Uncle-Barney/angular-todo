import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoSortComponent } from './todo-sort/todo-sort.component';
import { TodoService } from './todo.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginValidatorService } from './login-validator.service';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoTableComponent,
    TodoSortComponent,
    LoginComponent,
    TodoListComponent,
    NotfoundComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    TodoService,
    LoginValidatorService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
