import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../admin/holidays/services/holiday.service';
import { Holiday } from '../holiday.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.css'],
  imports:[CommonModule]
})
export class HolidayCalendarComponent implements OnInit {
  holidays: Holiday[] = [];

  constructor(private holidayService: HolidayService) {}

  async ngOnInit() {
    try {
      this.holidays = await this.holidayService.getEmployeeHolidays();
    } catch (error) {
      console.error('Failed to load holidays:', error);
    }
  }
}
