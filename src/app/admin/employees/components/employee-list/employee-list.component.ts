import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminEmployeeService } from '../../services/admin-employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../../../services/notifications.service';
import { parse, format } from 'date-fns';

@Component({
  selector: 'app-employee-list',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = []
  isAttendanceModalOpen: boolean = false;
  isPerformanceModelOpen: boolean = false;
  currentEmpId: string = ''
  employeeDetails = {
    name: '',
  }

  employeeAttendance: any[] = []
  isLeaveRequessModelOpen: boolean = false;

  leavesData: any[] = []



  constructor(
    private router: Router,
    private employeeService: AdminEmployeeService,
    private toastr: ToastrService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.loadEmployees()
  }

  async loadEmployees() {
    try {
      const res: any = await this.employeeService.getAllEmployees();
      this.employees = res.data;
    } catch (e) {
      console.log(e);
    }
  }

  formatDate(dateString: string): string {
    try {
      // dd-MM-yyyy format
      const date = parse(dateString, 'dd-MM-yyyy', new Date());

      return format(date, 'dd-MM-yyyy');
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return 'Invalid Date';
    }
  }
  async loadAttendanceByEmpId() {
    try {
      const res: any = await this.employeeService.getAttendanceByEmpId(this.currentEmpId);
      this.employeeAttendance = res.data.map((attendance: any) => {
        const formattedDate = this.formatDate(attendance.date);
        console.log(formattedDate);
        return {
          ...attendance,
          date: formattedDate,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  async loadLeavesData() {
    try {
      const res: any = await this.employeeService.getAllLeaveRequestsByEmpId(this.currentEmpId)
      this.leavesData = res.data;
    } catch (e) {
      console.log(e);
    }
  }
  downloadAttendance(): void {
    console.log('Download Attendance button clicked');
  }


  openLeaveRequestsModel(empId: string) {
    this.isLeaveRequessModelOpen = !this.isLeaveRequessModelOpen
    this.currentEmpId = empId
    this.loadLeavesData()
  }

  closeLeaveRequestsModel() {
    this.isLeaveRequessModelOpen = false
  }

  openEmployeeForm() {
    this.router.navigate(['/admin/employees/form'])
  }

  editEmployee(employeeId: string) {
    this.router.navigate([`/admin/employees/${employeeId}/edit`])
  }

  openMarkAttendance(empId: string) {
    this.isAttendanceModalOpen = !this.isAttendanceModalOpen
    this.currentEmpId = empId;
    this.loadAttendanceByEmpId()
  }

  openPerformanceModel(empId: string) {
    this.isPerformanceModelOpen = !this.isPerformanceModelOpen
    this.currentEmpId = empId;
  }

  closeMarkAttendanceModel() {
    this.isAttendanceModalOpen = false;
  }
  async approveLeave(leaveId: string) {
    try {
      const notificationPayload: any = {
        empId: this.currentEmpId,
        message: "Leave approved",
        type: "APPROVAL_REQUEST",
        dateSent: new Date().toISOString(),
      };
  
      const res: any = await this.employeeService.approveLeave(leaveId);
  
      if (res.data.approved) {
        this.leavesData = this.leavesData.map((leave) =>
          leave.id === leaveId ? { ...leave, approved: true } : leave
        );
  
        this.toastr.success("Leave approved successfully");
        await this.notificationService.saveNotification(notificationPayload);
      } else {
        this.toastr.error("Leave approval failed");
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      this.toastr.error("Error approving leave");
    }
  }
  


  async deleteEmployee(employeeId: string) {
    try {
      await this.employeeService.deleteEmployee(employeeId)
      this.toastr.success("Employee deleted successfully")
      this.loadEmployees()
    } catch (e) {
      console.log(e);
    }
  }
}
