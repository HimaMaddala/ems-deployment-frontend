import { Injectable } from '@angular/core';
import { CustomHttpService } from './customhttp.service';
import API_ENDPOINTS from '../api/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http:CustomHttpService
  ) { }

  async saveNotification(payload:any):Promise<any>{
    try{
      const res:any = this.http.post(API_ENDPOINTS.SAVE_NOTIFICATION_API,payload)
      return res;
    }catch(e){
      throw e
    }
  }
async getEmployeeNotification(id: string): Promise<any[]> {
  try {
    const res: any = await this.http.get(API_ENDPOINTS.GET_EMPLOYEE_NOTIFICATION_API(id));
    console.log('API Response:', res);  // Debug response
    return res?.data || [];
  } catch (e) {
    console.error('API call failed', e);
    return [];
  }
}

  async markReadNotification(id: string): Promise<any> {
    try {
      const res: any = await this.http.get(API_ENDPOINTS.MARK_READ_NOTIFICATIONS_API(id));
      return res;
    } catch (e) {
      throw e;
    }
  }  
}
