import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginValidatorService } from '../login-validator.service';
import { UsersInfo } from '../models/models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  constructor(private loginValidator: LoginValidatorService, 
              private fb: FormBuilder, private todoService: TodoService, 
              private router: Router) {
    this.loginForm = this.fb.group({
      account: this.fb.control('',[Validators.required, Validators.minLength(10)]),
      password: this.fb.control('',[Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
    this.registerForm = this.fb.group({
      userName: this.fb.control('',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      email: this.fb.control('',[Validators.required, this.loginValidator.emailValidator]),
      password: this.fb.control('',[Validators.required, Validators.minLength(8), Validators.maxLength(16) ]),
      confirmPassword: this.fb.control('',[Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    })
   };

  loginStatus: boolean = true;
  userInfo!: UsersInfo;
  users: UsersInfo[] = [];
  isSuccess: boolean = false;
  todoLink: string = 'todo-list'
  @Output() loginToggle = new EventEmitter<boolean>();

  ngOnInit(): void {
  };
  
  submitlogin(){
    console.log(this.loginForm);
  };

  submitRegister() {
    // validate confirmpassword
    if(!this.registerForm.controls.password.invalid && this.registerForm.value.confirmPassword !== this.registerForm.value.password ){
      this.registerForm.controls.confirmPassword.setErrors({confirmPasswordValid: true});
    }else {
      this.registerForm.controls.confirmPassword.setErrors(null);
    };
    
    if(!this.registerForm.invalid){
      this.userInfo = {
        id: Math.floor(Math.random()*1000 + 10),
        userName: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword
      };
      this.isSuccess = true;
    };
  };

  changeForm() {
    this.loginStatus = !this.loginStatus;
  };

  async submitLogin() {
    const account = this.loginForm.controls.account;
    const password = this.loginForm.controls.password;
    if(this.loginForm.untouched){
      alert('account and password is required !');
      return;
    };

    if(!this.userInfo && this.loginForm.touched){
      alert('account has not been registered yet, create one!');
      return;
    };

    if(account.value === this.userInfo.userName || account.value === this.userInfo.email){
      account.setErrors(null);
      if(password.value === this.userInfo.password){
        password.setErrors(null);
      }else{
        password.setErrors({passwordValid: true});
      };
    }else {
      account.setErrors({accountValid: true});
    };

    const checkToken = await this.todoService.userLogin(account.value,password.value);
    if(this.loginForm.valid && checkToken){
      this.router.navigateByUrl('/todo');
    };
  };

}
