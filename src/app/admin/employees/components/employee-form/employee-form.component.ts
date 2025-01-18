import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminEmployeeService } from '../../services/admin-employee.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../departments/services/department.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,NgFor],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeId:string | null = null;
  departments:any[] = []
  departmentId:string = ''
  isEdit:boolean = false;
  employee:any = {
    name:'',
    email: '',
    phone: '',
    jobTitle: '',
    dateOfJoining: '',
    status: '',
    role: 'employee',
    dateOfBirth: '',
    empId: ''
  }

  generatedEmpIds:string[] = []

  constructor(
    private toastr:ToastrService,
    private employeeService:AdminEmployeeService,
    private route:ActivatedRoute,
    private departmentServcie:DepartmentService
  ){}

  ngOnInit(): void {
      this.employeeId = this.route.snapshot.paramMap.get('employeeId')
      this.isEdit = this.employeeId !== null && true
      this.loadDepartments()
      this.loadEmployee()
      this.loadEmpIds()
  }

  async loadEmpIds(){
    try{
      const res:any = await this.employeeService.getAllEmpIds()
      this.generatedEmpIds = res.data;
    }catch(e){
      console.log(e);
    }
  }

  generateId(){
    let uniqueId:string;

    do{
      uniqueId = this.createRandomId()
    }while(this.generatedEmpIds.includes(uniqueId))
    
    this.employee.empId = uniqueId;
  }

  createRandomId(){
    const randomId = Math.floor(100000 + Math.random() * 900000).toString(); //btw 100000 and 999999
    return randomId;
  }

  generateEmployeeId(){

  }

  async loadEmployee(){
    try{
      if(this.employeeId){
        const res:any = await this.employeeService.getEmployeeById(this.employeeId)
        this.employee = res.data
      }
    }catch(e){
      console.log(e);
    }
  }

  async loadDepartments(){
    try{
      const res:any = await this.departmentServcie.getAllDepartments()
      this.departments = res.data;
    }catch(e){
      console.log(e);
    }
  }

  async onSubmit(){
    try{
      if(!this.isEdit){
        const res:any = await this.employeeService.createEmployee(this.departmentId,this.employee);
        if(res.data){
          this.toastr.success("Employee created successfully")
        }
      }else{
        if(this.employeeId){
          const res:any = await this.employeeService.updateEmployee(this.employeeId,this.employee.department.departmentId,this.employee);
          if(res.data){
            this.toastr.success("Employee updated successfully")
          }
        }
      }
    }catch(e){
      console.log(e);
    }
  }

  cancel(){

  }
}
