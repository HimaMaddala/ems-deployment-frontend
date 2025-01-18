import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employeedetails-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './employeedetails-form.component.html',
  styleUrl: './employeedetails-form.component.css'
})
export class EmployeedetailsFormComponent implements OnInit {

  employeeId: string = ''
  employee: any = {
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    dateOfJoining: '',
    status: '',
    role: 'employee',
    dateOfBirth: '',
    empId: ''
  }

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    this.employeeId = this.authService.currentUser.userId
    this.loadEmployee()
  }

  async loadEmployee() {
    try {
      if (this.employeeId) {
        const res: any = await this.employeeService.getEmployeeById(this.employeeId)
        this.employee = res.data
      }
    } catch (e) {
      console.log(e);
    }
  }

  async onSubmit() {
    try {

      if (this.employeeId) {
        const res: any = await this.employeeService.updateEmployee(this.employeeId, this.employee);
        if (res.data) {
          this.toastr.success("Employee updated successfully")
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
