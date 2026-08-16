import {
  Component,
  OnInit,
  inject,
  signal,
  computed
} from '@angular/core';

import { Router } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  // =========================
  // SERVICES
  // =========================

  constructor(
    private auth: Auth
  ) {}

  private employeeService = inject(EmployeeService);
  private router = inject(Router);


  // =========================
  // EMPLOYEES
  // =========================

  employees = signal<Employee[]>([]);


  // =========================
  // SEARCH
  // =========================

  searchTerm = signal('');


  // =========================
  // FILTERS
  // =========================

  departmentFilter = signal('');

  statusFilter = signal('');

  roleFilter = signal('');


  // =========================
  // DEPARTMENT OPTIONS
  // =========================

  departments = computed(() => {

    const values = this.employees()
      .map(employee => employee.department)
      .filter(Boolean);

    return [...new Set(values)];

  });


  // =========================
  // SEARCH + FILTER
  // =========================

  filteredEmployees = computed(() => {

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    const department = this.departmentFilter();

    const status = this.statusFilter();

    const role = this.roleFilter();


    return this.employees().filter(employee => {

      // SEARCH
      const matchesSearch =
        !search ||
        employee.name?.toLowerCase().includes(search) ||
        employee.email?.toLowerCase().includes(search);


      // DEPARTMENT
      const matchesDepartment =
        !department ||
        employee.department === department;


      // STATUS
      const matchesStatus =
        !status ||
        employee.status === status;


      // ROLE
      const matchesRole =
        !role ||
        employee.role === role;


      // ALL CONDITIONS MUST MATCH
      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesRole
      );

    });

  });


  // =========================
  // INIT
  // =========================

  ngOnInit() {

    this.loadEmployees();

  }


  // =========================
  // SEARCH
  // =========================

  onSearch(event: Event) {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);

  }


  // =========================
  // CLEAR SEARCH
  // =========================

  clearSearch() {

    this.searchTerm.set('');

  }


  // =========================
  // DEPARTMENT FILTER
  // =========================

  onDepartmentFilter(event: Event) {

    const select =
      event.target as HTMLSelectElement;

    this.departmentFilter.set(select.value);

  }


  // =========================
  // STATUS FILTER
  // =========================

  onStatusFilter(event: Event) {

    const select =
      event.target as HTMLSelectElement;

    this.statusFilter.set(select.value);

  }


  // =========================
  // ROLE FILTER
  // =========================

  onRoleFilter(event: Event) {

    const select =
      event.target as HTMLSelectElement;

    this.roleFilter.set(select.value);

  }


  // =========================
  // CLEAR ALL FILTERS
  // =========================

  clearFilters() {

    this.searchTerm.set('');

    this.departmentFilter.set('');

    this.statusFilter.set('');

    this.roleFilter.set('');

  }


  // =========================
  // GET ALL EMPLOYEES
  // =========================

  loadEmployees() {

    this.employeeService.getEmployees().subscribe({

      next: (data) => {

        this.employees.set(data);

        console.log(
          'Backend response:',
          data
        );

      },

      error: (error) => {

        console.error(
          'Backend connection failed:',
          error
        );

      }

    });

  }


  // =========================
  // ADD
  // =========================

  addEmployee() {

    this.router.navigate([
      '/employees/new'
    ]);

  }


  // =========================
  // EDIT
  // =========================

  editEmployee(employee: Employee) {

    this.router.navigate([
      '/employees/edit',
      employee.employeeId
    ]);

  }


  // =========================
  // DELETE
  // =========================

  deleteEmployee(employeeId?: string) {

    if (!employeeId) {

      console.error(
        'Employee ID is missing'
      );

      return;

    }


    const confirmed = confirm(
      'Are you sure you want to delete this employee?'
    );


    if (!confirmed) {

      return;

    }


    this.employeeService
      .deleteEmployee(employeeId)
      .subscribe({

        next: () => {

          console.log(
            'Employee deleted:',
            employeeId
          );

          this.loadEmployees();

        },

        error: (error) => {

          console.error(
            'Error deleting employee:',
            error
          );

        }

      });

  }


  // =========================
  // LOGOUT
  // =========================

  // logout() {

  //   this.auth.logout();

  //   this.router.navigate(
  //     ['/login'],
  //     { replaceUrl: true }
  //   );

  }
  logout(): void {

  localStorage.removeItem('loggedIn');

  this.router.navigate(['/login']);
}

}