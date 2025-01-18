import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { DepartmentService } from '../departments/services/department.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalEmployees: number = 0;
  todayPresent: number = 0;
  pendingLeaves: number = 0;
  totalDepartments: number = 0;

  employees: any[] = [];
  announcements: any[] = [];

  constructor(private adminService: AdminService, private departmentService: DepartmentService, private router: Router) {}

  ngOnInit() {
    this.fetchDashboardData();
    this.fetchTotalDepartments();
  }

  async fetchDashboardData() {
    try {
      const dashboardData: any = await this.adminService.getDashboardData();

      this.totalEmployees = dashboardData.totalEmployees || 0;
      this.todayPresent = dashboardData.todayPresent || 0;
      this.pendingLeaves = dashboardData.pendingLeaves || 0;

      this.employees = (dashboardData.employees || []).map((emp: any) => ({
        ...emp,
        department: emp?.department?.name || 'Unknown',
      }));

      this.announcements = dashboardData.announcements || [];
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }

  async fetchTotalDepartments() {
    try {
      const response: any = await this.departmentService.getAllDepartments();
      console.log('Departments API Response:', response);
  
      this.totalDepartments = Array.isArray(response.data) ? response.data.length : 0;
    } catch (error) {
      console.error('Error fetching total departments:', error);
      this.totalDepartments = 0;
    }
  }
  
  

  navigateToAnnouncementForm() {
    this.router.navigate(['/admin/holidays/form']);
  }
}

