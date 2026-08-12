import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      joiningDate: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      role: ['EMPLOYEE', Validators.required]
    });

  }

  onSubmit() {

    if (this.employeeForm.valid) {

      console.log(this.employeeForm.value);

    }

  }
}