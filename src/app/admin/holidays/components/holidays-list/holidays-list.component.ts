import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../services/holiday.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-holidays-list',
  imports: [NgFor, CommonModule],
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})
export class HolidaysListComponent implements OnInit {
  holidays: any[] = [];

  constructor(private holidayService: HolidayService, private router: Router) { }

  ngOnInit(): void {
    this.fetchHolidays();
  }
  async fetchHolidays() {
    try {
      const response: any = await this.holidayService.getAllHolidays();
      if (response && response.data) {
        this.holidays = response.data;
      } else {
        console.error('Invalid data structure:', response);
      }
    } catch (err) {
      console.error('Error fetching holidays:', err);
    }
  }


  navigateToForm() {
    this.router.navigate(['/admin/holidays/form']);
  }

  navigateToEditForm(holidayId: string) {
    if (holidayId) {
      this.router.navigate(['/admin/holidays', holidayId, 'edit']);
    } else {
      console.error('Invalid holidayId:', holidayId);
    }
  }
  async deleteHoliday(holidayId: string) {
    if (confirm('Are you sure you want to delete this holiday?')) {
      try {
        await this.holidayService.deleteHoliday(holidayId);
        this.holidays = this.holidays.filter(h => h.holidayId !== holidayId);
      } catch (err) {
        console.error('Error deleting holiday:', err);
      }
    }
  }
}
