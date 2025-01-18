import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [FormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: any[] = [];
  currentEmpId: string | null = null;
  isNotificationModelOpen: boolean = false;
  notificationsCount: number = 0;
  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentEmpId = this.authService.currentUser?.userId || null;
    this.loadNotifications();
  }

  openNotificationModal(): void {
    this.isNotificationModelOpen = !this.isNotificationModelOpen;
    if (this.isNotificationModelOpen) {
      this.markReadNotifications(false);
    }
  }

  closeNotificationModal(): void {
    this.isNotificationModelOpen = false;
  }

  async loadNotifications(): Promise<void> {
    try {
      if (this.currentEmpId) {
        const res: any[] = await this.notificationService.getEmployeeNotification(this.currentEmpId);
        this.notifications = Array.isArray(res) ? res : [];
        this.notificationsCount = this.notifications.length;
      }
    } catch (e) {
      console.error('Error loading notifications:', e);
      this.notifications = [];
      this.notificationsCount = 0;
    }
  }

  async markReadNotifications(removeRead: boolean = true): Promise<void> {
    try {
      if (this.currentEmpId) {
        await this.notificationService.markReadNotification(this.currentEmpId);

        if (removeRead) {
          this.notifications = [];
          this.notificationsCount = 0;
        } else {
          this.notifications = this.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          }));
          this.notificationsCount = 0;
        }
      }
    } catch (e) {
      console.error('Error marking notifications as read:', e);
    }
  }
}
