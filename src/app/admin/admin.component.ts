import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/admin/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { AdminEmployeeService } from './employees/services/admin-employee.service';
import { AdminService } from './services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [NavbarComponent,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
}
