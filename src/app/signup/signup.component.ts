import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  signUp() {
    this.apiService.postSignupData(this.signupForm.value)
      .subscribe(res => {
        alert("Signup successfully!");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
        err=> {
        alert("Something went wrong!");
        })
  }

}
