import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css'
})
export class DepartmentFormComponent implements OnInit {
  departmentId: string | null = null
  department: any = {
    name: '',
    description: '',
    date: new Date()
  };
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('departmentId');
    this.isEdit = this.departmentId !== null && true;
    this.loadDepartment()
  }

  async loadDepartment() {
    try {
      if (this.departmentId) {
        const res: any = await this.departmentService.getDepartmentById(this.departmentId)
        this.department = res.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async onSubmit() {
    try {
      if (!this.isEdit) {
        this.department.createdDate = new Date().toISOString().split('T')[0];
        const res: any = await this.departmentService.saveDepartment(this.department);
        if (res.data) {
          this.toastr.success("Department created successfully");
        }
      } else {
        if (this.departmentId) {
          const res: any = await this.departmentService.updateDepartmentById(this.departmentId, this.department);
          if (res.data) {
            this.toastr.success("Department updated successfully");
          }
        }
      }
    } catch (e) {
      console.error(e);
      this.toastr.error("An error occurred while saving the department");
    }
  }


  cancel() {

  }
}
