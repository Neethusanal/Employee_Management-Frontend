import { Routes } from '@angular/router';
import { EmployeeForm } from './employee-form/employee-form'
import { EmployeeList } from './employee-list/employee-list';

export const routes: Routes = [
  {
    path: 'employees/new',
    component: EmployeeForm
  },
  {
    path: 'employees',
    component: EmployeeList
  }
];