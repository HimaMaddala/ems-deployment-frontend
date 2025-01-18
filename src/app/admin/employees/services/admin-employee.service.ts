import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../../services/customhttp.service';
import API_ENDPOINTS from '../../../api/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeService {

  constructor(private customHttp: CustomHttpService) { }

  async getAllEmployees() {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_ADMIN_EMPLOYEES_API);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getAllEmpIds() {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_ALL_EMP_IDS_API);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getEmployeeById(id: string) {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_ADMIN_EMPLOYEE_BY_ID(id));
      return res;
    } catch (e) {
      throw e;
    }
  }

  async createEmployee(deptId: string, payload: any) {
    try {
      const res = this.customHttp.post(API_ENDPOINTS.CREATE_ADMIN_EMPLOYEE_API(deptId), payload);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async updateEmployee(id: string, departmentId: string, payload: any) {
    try {
      console.log(departmentId);
      const res = this.customHttp.patch(API_ENDPOINTS.UPDATE_ADMIN_EMPLOYEE_BY_ID(id, departmentId), payload);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async deleteEmployee(id: string) {
    try {
      const res = this.customHttp.delete(API_ENDPOINTS.DELETE_ADMIN_EMPLOYEE_BY_ID(id));
      return res;
    } catch (e) {
      throw e;
    }
  }

  async markAttendace(id: string, payload: any) {
    try {
      const res = this.customHttp.post(API_ENDPOINTS.MARK_ATTENDANCE_API(id), payload);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getAttendanceByEmpId(id: string) {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_ATTENDANCE_BY_EMP_ID_API(id));
      return res;
    } catch (e) {
      throw e;
    }
  }

  async isEmployeeMarkedAttendance(empId: string, date: string) {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_EMPLOYEE_ATTENDANCE_STATUS_API(empId, date))
    } catch (e) {
      throw e;
    }
  }



  async getAllLeaveRequestsByEmpId(id: string) {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_LEAVES_BY_EMP_ID_API(id));
      return res;
    } catch (e) {
      throw e;
    }
  }

  async approveLeave(id: string) {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.APPROVE_LEAVE_API(id));
      return res;
    } catch (e) {
      throw e;
    }
  }

  async pendingLeaves() {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_PENDING_LEAVE_API);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getAdminDetails() {
    try {
      const res = this.customHttp.get(API_ENDPOINTS.GET_ADMIN_ID_API);
      return res;
    } catch (e) {
      throw e;
    }
  }


}
