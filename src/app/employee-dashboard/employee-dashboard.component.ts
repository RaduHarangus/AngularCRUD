import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from "../employee-dashboard.model";
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.less']
})
export class EmployeeDashboardComponent implements OnInit {

  formValues !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employees !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValues = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValues.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValues.value.firstName;
    this.employeeModelObj.lastName = this.formValues.value.lastName;
    this.employeeModelObj.email = this.formValues.value.email;
    this.employeeModelObj.mobile = this.formValues.value.mobile;
    this.employeeModelObj.salary = this.formValues.value.salary;

    this.apiService.postEmployee(this.employeeModelObj)
      .subscribe(res=> {
        this.formValues.reset();
        let closeBtn = document.getElementById('cancel');
        closeBtn?.click();
        this.getAllEmployee();
        alert('Employee added successfully!');
        },
        err=> {
        alert('Something went wrong!');
        });
  }

  getAllEmployee() {
    this.apiService.getEmployee()
      .subscribe( data => {
        this.employees = data;
      });
  }

  deleteEmployee(id: number) {
    this.apiService.deleteEmployee(id)
      .subscribe(res => {
          alert('Employee successfully deleted!');
          this.getAllEmployee();
      },
        err=> {
          alert('Something went wrong! Please try again later!');
        });
  }

  updateEmployee() {
    this.employeeModelObj.firstName = this.formValues.value.firstName;
    this.employeeModelObj.lastName = this.formValues.value.lastName;
    this.employeeModelObj.email = this.formValues.value.email;
    this.employeeModelObj.mobile = this.formValues.value.mobile;
    this.employeeModelObj.salary = this.formValues.value.salary;

    this.apiService.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res=> {
        alert('Employee successfully updated!');
        this.formValues.reset();
        let closeBtn = document.getElementById('cancel');
        closeBtn?.click();
        this.getAllEmployee();
      }, err=> {
        alert('Something went wrong! Please try again later!');
      });
  }

  onEdit(employee: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.employeeModelObj.id = employee.id;
    this.formValues.controls['firstName'].setValue(employee.firstName);
    this.formValues.controls['lastName'].setValue(employee.lastName);
    this.formValues.controls['email'].setValue(employee.email);
    this.formValues.controls['mobile'].setValue(employee.mobile);
    this.formValues.controls['salary'].setValue(employee.salary);
  }

}
