import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css'],
})
export class MarkAttendanceComponent {
  attendance = {
    status: '',
    employeeId: '',
  };

  constructor(
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) {}

  async onSubmit() {
    if (!this.attendance.employeeId || !this.attendance.status) {
      this.toastr.error('All fields are required!', 'Error');
      return;
    }

    try {
      const res = await this.attendanceService.markAttendance(
        this.attendance.employeeId,
        this.attendance
      );
      this.toastr.success('Attendance marked successfully!', 'Success');
    } catch (error) {
      this.toastr.error('Failed to mark attendance.', 'Error');
      console.error(error);
    }
  }
}
