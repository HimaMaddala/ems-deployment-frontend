import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../../../services/performance.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../employees/services/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-performance',
  imports: [FormsModule,NgFor],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {

  performances: any[] = [];
  employeeId: string | null = '';
  evaluationPeriods: string[] = [];
  employees: any[] = [];

  performance = {
    employee: '',
    evaluationPeriod: '',
    rating: 0,
    remarks: '',
    evaluator: ''
  };

  constructor(
    private performanceService: PerformanceService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('empId');
    console.log(this.employeeId);
    this.loadAllEmployees();
    this.fetchPerformanceByEmployee();
    this.generateEvaluationPeriods();
  }

  generateEvaluationPeriods(): void {
    const currentYear = new Date().getFullYear();
    this.evaluationPeriods = [
      `Q1-${currentYear}`,
      `Q2-${currentYear}`,
      `Q3-${currentYear}`,
      `Q4-${currentYear}`
    ];
  }

  async fetchPerformanceByEmployee() {
    try {
      if (this.employeeId) {
        const res: any = await this.performanceService.getPerformanceByEmpId(this.employeeId);
        console.log(res.data);
        this.performances = res.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async addPerformance() {
    try {
      const res: any = await this.performanceService.savePerformance(this.performance);
      this.performance = res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async loadAllEmployees() {
    try {
      const res: any = await this.employeeService.getAllEmployees();
      this.employees = res.data;
    } catch (e) {
      console.log(e);
    }
  }
}

