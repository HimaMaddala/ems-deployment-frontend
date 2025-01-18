import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminEmployeeService } from '../../admin/employees/services/admin-employee.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';

interface AttendanceResponse {
  status: number;
  data?: any;
}

interface AdminDetailsResponse {
  data: { userId: string };
}

@Component({
  selector: 'app-mark-attendance',
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit, OnChanges {
  @Input() employee: any = {};
  @Input() isAttendanceMarked: boolean = false;
  isAttendanceModalOpen: boolean = false;
  currentEmpId: string = '';
  adminId: string = '';
  currentDate: string = '';

  attendance: any = {
    status: '',
    date: this.currentDate
  };

  statusData = [
    { name: 'Present' },
    { name: 'Absent' },
    { name: 'Leave' },
  ];

  constructor(
    private employeeService: AdminEmployeeService,
    private toastr: ToastrService,
    private notification: NotificationsService
  ) {
    this.currentDate = this.setTodayDate();
  }

  ngOnInit(): void {
    this.loadAdminDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.currentEmpId = this.employee.empId;
    }
  }

  setTodayDate(): string {
    const today = new Date();
const day = ('0' + today.getDate()).slice(-2);
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const year = today.getFullYear();

this.attendance.date = `${day}-${month}-${year}`;

    return `${day}-${month}-${year}`;
  }

  openMarkAttendance() {
    this.isAttendanceModalOpen = !this.isAttendanceModalOpen;
  }

  closeMarkAttendanceModel() {
    this.isAttendanceModalOpen = false;
  }

  // async markEmployeeAttendance() {
  //   try {
  //     if (!this.currentEmpId) {
  //       console.error('Employee ID is missing!');
  //       return;
  //     }
  
  //     const res = await this.employeeService.markAttendace(this.currentEmpId, this.attendance) as AttendanceResponse;
  
  //     if (res.status === 200) {
  //       this.isAttendanceMarked = true;
  //       this.toastr.success('Attendance marked successfully!');
  //     } else {
  //       this.toastr.success('Attendance marked successfully!');
  //     }
  
  //     this.closeMarkAttendanceModel();
  //   } catch (e) {
  //     console.error('Error marking attendance:', e);
  //     this.toastr.error('Error marking attendance. Please try again.');
  //   }
  // }

  async markEmployeeAttendance() {
    try {
      if (!this.currentEmpId) {
        console.error('Employee ID is missing!');
        return;
      }
  
      const res = await this.employeeService.markAttendace(this.currentEmpId, this.attendance) as AttendanceResponse;
  
      if (res.status === 200) {
        this.toastr.success('Attendance marked successfully!');
        this.isAttendanceMarked = true;
        await this.loadAttendanceStatus();
      } else {
        this.toastr.success('Attendance marked successfully!');
      }
  
      this.closeMarkAttendanceModel();
    } catch (e) {
      console.error('Error marking attendance:', e);
      this.toastr.error('Error marking attendance. Please try again.');
    }
  }
  
  async loadAttendanceStatus() {
    try {
      const todaysDate = this.setTodayDate();
      if (this.currentEmpId) {
        const res: any = await this.employeeService.isEmployeeMarkedAttendance(this.currentEmpId, todaysDate);
        this.isAttendanceMarked = !!res.data;
      }
    } catch (e) {
      console.error('Error loading attendance status:', e);
    }
  }
  
  

  async loadAdminDetails() {
    try {
      const res = await this.employeeService.getAdminDetails() as AdminDetailsResponse;
      this.adminId = res.data.userId;
      console.log(this.adminId);
    } catch (e) {
      console.error('Error loading admin details:', e);
    }
  }
}
