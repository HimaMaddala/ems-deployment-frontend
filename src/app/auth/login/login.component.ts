import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isSignUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  role: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role') || 'admin';//default
  }


  navigateToRole(newRole: string): void {
    this.role = newRole;
    this.router.navigate(['/login', newRole]);
  }

  async login() {
    this.isLoading = true;
    try {
      if (this.role === 'employee') {
        const res = await this.authService.employeeLogin(this.username, this.password);
        res ? this.router.navigate(['/me']) : (this.errorMessage = 'Invalid credentials');
      } else {
        const success = await this.authService.login(this.username, this.password);
        success ? this.router.navigate(['/admin/dashboard']) : (this.errorMessage = 'Invalid credentials');
      }
    } catch (e: any) {
      this.errorMessage = e.message;
    } finally {
      this.isLoading = false;
    }
  }

  toggleMode(): void {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
  }

  clearForm(): void {
    this.username = '';
    this.password = '';
  }
}
