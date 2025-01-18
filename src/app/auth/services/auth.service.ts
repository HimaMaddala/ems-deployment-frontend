import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CustomHttpService } from '../../services/customhttp.service';
import API_ENDPOINTS from '../../api/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private loggedInUser: any = null;
  private BASE_URL = 'http://localhost:8082/api';

  constructor(private customHttp: CustomHttpService, private router: Router) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const res: any = await this.customHttp.post(API_ENDPOINTS.LOGIN_API, { username, password });
      if (res.data) {
        const token = res.data;
        const decodedToken: any = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }

        const userDetails = {
          username: decodedToken.sub,
          role: decodedToken.role,
          email: decodedToken.email,
          userId: decodedToken.userId
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDetails));
        localStorage.setItem('role', userDetails.role);

        this.loggedInUserSubject.next(userDetails);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async employeeLogin(username: string, password: string): Promise<boolean> {
    try {
      const res: any = await this.customHttp.post(API_ENDPOINTS.EMPLOYEE_LOGIN_API, { username, password });
      if (res.data) {
        const token = res.data;
        const decodedToken: any = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }

        const userDetails = {
          username: decodedToken.sub,
          role: decodedToken.role,
          email: decodedToken.email,
          userId: decodedToken.userId
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDetails));
        localStorage.setItem('role', userDetails.role);

        this.loggedInUserSubject.next(userDetails);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async signUp(payload: any): Promise<boolean> {
    try {
      const res: any = await this.customHttp.post(API_ENDPOINTS.SIGNUP_API, payload);
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  get currentUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  }
}
