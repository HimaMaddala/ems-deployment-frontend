import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = ""
  isSignUp: boolean = false;
  errorMessages: any = {};
  successMessage: string = '';
  isLoading: boolean = false;
  role: string = ''

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessages = '';
    this.successMessage = '';
  }

  async signUp() {
    try {
      if (this.password !== this.confirm_password) {
        this.errorMessages = {
          confirm_password: "Password not match"
        }
        return;
      }
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      }
      const res: any = await this.authService.signUp(payload)
      if (res?.data) {
        this.router.navigate(['/login'])
      }

      this.errorMessages = {
        ...res,
        confirm_password: this.confirm_password === "" && "Confirm password is required",
      }
    } catch (e: any) {
      console.log(e);
      this.errorMessages = e

      console.log("error", this.errorMessages);
    }
  }

  clearForm() {
    this.username = '';
    this.password = '';
  }
}
