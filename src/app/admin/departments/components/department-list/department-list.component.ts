import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-list',
  imports: [NgFor,CommonModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {

  departments:any[] = [];

  constructor(
    private router:Router,
    private departmentService:DepartmentService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
      this.loadDepartments()
  }

  async loadDepartments(){
    try{
      const res:any = await this.departmentService.getAllDepartments();
      this.departments = res.data;
    }catch(e){
      console.log(e);
    }
  }
  openDepartmentForm(){
    this.router.navigate(['/admin/departments/form'])
  }

  editDepartment(departmentId:string){
    this.router.navigate([`/admin/departments/${departmentId}/edit`])
  }

  async deleteDepartment(departmentId:string){
    try{
      await this.departmentService.deleteDepartmentById(departmentId)
      this.toastr.success("Department deleted successfully")
      this.loadDepartments()
    }catch(e){
      console.log(e);
    }
  }
}
