import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../../services/customhttp.service';
import API_ENDPOINTS from '../../../api/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private customHttp:CustomHttpService ) {}

  async getAllDepartments(){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_ADMIN_ALL_DEPARTMENTS_API)
      return res;
    }catch(e){
      throw e;
    }
  }

  async getDepartmentById(id:string){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_ADMIN_DEPARTMENT_BY_ID_API(id))
      return res;
    }catch(e){
      throw e;
    }
  }

  async saveDepartment(payload:any){
    try{
      const res = this.customHttp.post(API_ENDPOINTS.CREATE_ADMIN_ALL_DEPARTMENTS_API,payload)
      return res;
    }catch(e){
      throw e;
    }
  }

  async updateDepartmentById(id:string,payload:any){
    try{
      const res = this.customHttp.patch(API_ENDPOINTS.UPDATE_ADMIN_DEPARTMENT_BY_ID_API(id),payload)
      return res;
    }catch(e){
      throw e;
    }
  }

  async deleteDepartmentById(id:string){
    try{
      const res = this.customHttp.delete(API_ENDPOINTS.DELETE_ADMIN_DEPARTMENT_BY_ID_API(id))
      return res;
    }catch(e){
      throw e;
    }
  }
}
