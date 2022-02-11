import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res=> {
        const user = res.find((a:any) => {
          return (a.email === this.loginForm.value.email) && (a.password === this.loginForm.value.password);
        });
          if (user) {
            this.loginForm.reset();
            alert('Login successful!');
            this.router.navigate(['dashboard']);
          } else {
            alert('User not found!');
          }
      },
        err => {
          alert('Login unsuccessful! Please try again!');
        });
  }

}
