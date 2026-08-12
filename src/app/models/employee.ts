export interface Employee {
  employeeId?: string;
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  role: 'ADMIN' | 'EMPLOYEE';
}