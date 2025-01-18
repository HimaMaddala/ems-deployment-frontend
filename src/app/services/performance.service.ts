import { Injectable } from '@angular/core';
import { CustomHttpService } from './customhttp.service';
import API_ENDPOINTS from '../api/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(
    private customHttp: CustomHttpService
  ) { }

  savePerformance(payload:any){
    try{
      const res = this.customHttp.post(API_ENDPOINTS.SAVE_PERFORMANCE_API,payload);
      return res;
    }catch(e){
      throw e
    }
  }

  getPerformanceByEmpId(empId:string){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_PERFOMANCE_BY_EMPLOYEE_API(empId));
      return res;
    }catch(e){
      throw e
    }
  }

  getPerformanceByPeriod(period:string){
    try{
      const res = this.customHttp.get(API_ENDPOINTS.GET_PERFOMANCE_BY_EMPLOYEE_API(period));
      return res;
    }catch(e){
      throw e
    }
  }
}
