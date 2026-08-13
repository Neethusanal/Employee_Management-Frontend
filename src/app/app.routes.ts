import { Routes } from '@angular/router';
import { Login } from './login/login';
import { EmployeeForm } from './employee-form/employee-form';
import { EmployeeList } from './employee-list/employee-list';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'employees',
    component: EmployeeList,
    canActivate: [authGuard]
  },
  {
    path: 'employees/new',
    component: EmployeeForm,
    canActivate: [authGuard]
  },
  {
    path: 'employees/edit/:employeeId',
    component: EmployeeForm,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];