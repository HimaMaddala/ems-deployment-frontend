import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../../services/customhttp.service';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { Holiday } from '../../../employees/holiday.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {

  constructor(private customHttp: CustomHttpService) { }

  async getAllHolidays() {
    try {
      const res = await this.customHttp.get(API_ENDPOINTS.GET_ADMIN_HOLIDAYS_API);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getHolidayById(holidayId: string) {
    try {
      const res = await this.customHttp.get(API_ENDPOINTS.GET_ADMIN_HOLIDAY_BY_ID_API(holidayId));
      return res;
    } catch (e) {
      throw e;
    }
  }

  async addHoliday(holiday: any) {
    try {
      const res = await this.customHttp.post(API_ENDPOINTS.CREATE_ADMIN_HOLIDAY_API, holiday);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async updateHoliday(holidayId: string, holiday: any) {
    try {
      const res = await this.customHttp.patch(API_ENDPOINTS.UPDATE_ADMIN_HOLIDAY_BY_ID_API(holidayId), holiday);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async deleteHoliday(holidayId: string) {
    try {
      const res = await this.customHttp.delete(API_ENDPOINTS.DELETE_ADMIN_HOLIDAY_BY_ID_API(holidayId));
      return res;
    } catch (e) {
      throw e;
    }
  }
  async getEmployeeHolidays(): Promise<Holiday[]> {
    try {
      return await this.customHttp.get<Holiday[]>(API_ENDPOINTS.GET_EMPLOYEE_HOLIDAYS_API);
    } catch (e) {
      console.error('Failed to get employee holidays', e);
      return [];
    }
  }

}
