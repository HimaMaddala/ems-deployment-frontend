import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../services/customhttp.service';
import { Observable } from 'rxjs';
import { Employee } from '../employees.module';
import API_ENDPOINTS from '../../api/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private customHttp:CustomHttpService) { }

  getAllEmployees():Promise<any>{
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_EMPLOYEES_API)
      return res;
    }catch(e){
      throw e;
    }
  }

  getEmployeeById(id:string):Promise<any>{
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_EMPLOYEE_BY_ID(id))
      return res;
    }catch(e){
      throw e;
    }
  }

  async updateEmployee(id:string,payload:any){
    try{
      const res = this.customHttp.patch(API_ENDPOINTS.UPDATE_EMPLOYEE_DETAILS_API(id),payload);
      return res;
    }catch(e){
      throw e;
    }
  }

  async requestLeave(id:string,payload:any){
    try{
      const res = this.customHttp.post(API_ENDPOINTS.REQUEST_LEAVE_API(id),payload);
      return res;
    }catch(e){
      throw e;
    }
  }

  async getAdminDetails(){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_ADMIN_ID_API);
      return res;
    }catch(e){
      throw e;
    }
  }

  async isEmployeeMarkedAttendance(empId: string, date: string): Promise<any> {
    try {
      const res = await this.customHttp.get(API_ENDPOINTS.GET_EMPLOYEE_ATTENDANCE_STATUS_API(empId, date));
      return res;
    } catch (e) {
      console.error(`Error checking attendance status for ${empId} on ${date}:`, e);
      throw e;
    }
  }
  
}
