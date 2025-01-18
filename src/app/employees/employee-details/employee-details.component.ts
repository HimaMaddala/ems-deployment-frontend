import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../../auth/services/auth.service';
import { Employee } from '../employees.module';
import { MarkAttendanceComponent } from '../../components/mark-attendance/mark-attendance.component';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { HolidayCalendarComponent } from '../holiday-calendar/holiday-calendar.component';

@Component({
  selector: 'app-employee-details',
  imports: [MarkAttendanceComponent,HolidayCalendarComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any | null = null; 
  empId:string|null = null;
  isAttendanceMarked: boolean = false;

  constructor(
    private employeeService :EmployeeService,
    private authService:AuthService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.empId = this.authService.currentUser.userId;
      this.loadEmployeeDetails()
      this.loadEmployeAttendanceStatus()
  }

  setTodayDate() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2); 
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  async loadEmployeeDetails(){
    try{
      const userId = this.authService.currentUser.userId;
      if(this.authService.currentUser.userId){
        const res = await this.employeeService.getEmployeeById(userId);
        this.employee = res.data;
      }
    }catch(e){
      console.log(e);
    }
  }


  async loadEmployeAttendanceStatus() {
    try {
      const todaysDate = this.setTodayDate();
      if (this.empId) {
        const res: any = await this.employeeService.isEmployeeMarkedAttendance(this.empId, todaysDate);
        console.log('Attendance Status API Response:', res);
        this.isAttendanceMarked = !!res.data;
      }
    } catch (e) {
      console.error('Error loading attendance status:', e);
    }
  }
  
}
