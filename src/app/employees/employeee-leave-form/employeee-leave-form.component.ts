import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-employeee-leave-form',
  imports: [FormsModule,NgFor],
  templateUrl: './employeee-leave-form.component.html',
  styleUrl: './employeee-leave-form.component.css'
})
export class EmployeeeLeaveFormComponent implements OnInit {
  empId:string|null = null;
  leaveForm:any = {
    startDate: '',
    endDate: '',
    reason: "",
    leaveType: ''
  }
  adminId:string  = '';

  leaveType:any[] = [
    {name: 'Casual Leave'},
    {name: 'Sick Leave'},
  ]

  notificationPayload: any = {
    empId: '',
    message: "Leave requested",
    type: "LEAVE_REQUEST",
    dateSent: new Date().toString()
  }

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private authService:AuthService,
    private notificationService: NotificationsService
  ) {
    
  }

  ngOnInit(): void {
    this.empId = this.authService.currentUser.userId;
    this.notificationPayload.empId = this.empId,
    this.loadAdminDetails()
  }

  async onSubmit(){
    try{
      if(this.empId){
        const notificationPayload: any = {
          empId: this.adminId,
          message: "Leave Requested",
          type: "REQUEST",
          dateSent: new Date().toString()
        }
        const res:any = await this.employeeService.requestLeave(this.empId,this.leaveForm)
        await this.notificationService.saveNotification(notificationPayload)
        if(res.data){
          this.toastr.success("Leave Requested")
        }
      }
    }catch(e){
      console.log(e);
    }
  }

  async loadAdminDetails(){
    try{
      const res:any = await this.employeeService.getAdminDetails()
      this.adminId = res.data.userId
      console.log(this.adminId);
    }catch(e){
      console.log(e);
    }
  } 
}
