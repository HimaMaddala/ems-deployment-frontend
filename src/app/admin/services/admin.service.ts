import { Injectable } from '@angular/core';
import { EmployeeService } from '../../employees/services/employee.service';
import { AdminEmployeeService } from '../employees/services/admin-employee.service';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../auth/services/auth.service';
import { AttendanceService } from './../attendance/services/attendance.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUserId: string | null = null;
  constructor(
    private employeeService: AdminEmployeeService,
    private notificationService: NotificationsService,
    private attendanceService: AttendanceService,
    private authService: AuthService
  ) { }

  setTodayDate() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }
  async getDashboardData() {
    try {
      const currentDate = this.setTodayDate();

      const empData: any = await this.employeeService.getAllEmployees();
      const notifications: any = await this.notificationService.getEmployeeNotification(this.authService.currentUser?.userId || '');
      const pendingLeave: any = await this.employeeService.pendingLeaves();
      const todayAttendance: any = await this.attendanceService.getAttendanceByDate(currentDate);
  
      const employees = empData?.data || [];
      const notificationsList = notifications?.data || [];
      const pendingLeaves = pendingLeave?.data || [];
      const attendanceList = todayAttendance?.data || [];
  
      const presentCount = attendanceList.filter((record: any) => record.status === 'Present').length;
  
      return {
        employees: employees,
        notifications: notificationsList,
        totalEmployees: employees.length,
        unreadNotifications: notificationsList.length,
        pendingLeaves: pendingLeaves.length,
        todayPresent: presentCount
      };
    } catch (e) {
      console.error('Error in getDashboardData:', e);
      throw e;
    }
  }
  
}
