import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { NotificationsComponent } from "../notifications/notifications.component";
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user_first: any | null = null;
  username: string | null = null;
  email: string | null = null;
  showDropdown = false;
  isMenuOpen = false;
  notifications: any[] = [];
  empId: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    const userDetails = this.authService.currentUser;
    if (userDetails) {
      this.isLoggedIn = true;
      this.username = userDetails.username;
      this.user_first = this.username?.charAt(0).toUpperCase();
      this.email = userDetails.email;
      this.empId = userDetails.userId;
    }
    this.loadNotifications();
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  goToProfile(): void {
    this.router.navigate(['/me']);
    this.closeDropdown();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.closeDropdown();
  }

  private closeDropdown(): void {
    this.showDropdown = false;
    this.isMenuOpen = false;
  }

  async loadNotifications(): Promise<void> {
    if (this.empId) {
      try {
        const response: any = await this.notificationService.getEmployeeNotification(this.empId);
        this.notifications = response.data;
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }
}

