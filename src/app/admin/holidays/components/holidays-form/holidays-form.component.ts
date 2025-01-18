import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidayService } from '../../services/holiday.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-holiday-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './holidays-form.component.html',
  styleUrls: ['./holidays-form.component.css']
})
export class HolidayFormComponent implements OnInit {
  holiday: any = { date: '', description: '', type: 'National' };
  isEditMode = false;
  holidayId: any | null = null;

  constructor(
    private holidayService: HolidayService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.holidayId = this.route.snapshot.paramMap.get('holidayId');
    this.isEditMode = this.holidayId !== null;

    if (this.isEditMode && this.holidayId) {
      this.loadHoliday();
    }
  }

  // async loadHoliday() {
  //   try {
  //     const res: any = await this.holidayService.getHolidayById(this.holidayId);
  //     this.holiday = res.data;
  //   } catch (error) {
  //     console.error('Error fetching holiday:', error);
  //     this.toastr.error('Failed to load holiday data');
  //   }
  // }
  async loadHoliday() {
    try {
      const res: any = await this.holidayService.getHolidayById(this.holidayId);
      if (res && res.data) {
        this.holiday = res.data;
      } else {
        console.error('Holiday not found or invalid response:', res);
      }
    } catch (error) {
      console.error('Error fetching holiday:', error);
      this.toastr.error('Failed to load holiday data');
    }
  }
  

  async saveHoliday() {
    try {
      if (this.isEditMode) {
        const res: any = await this.holidayService.updateHoliday(this.holidayId, this.holiday);
        this.toastr.success('Holiday updated successfully');
      } else {
        const res: any = await this.holidayService.addHoliday(this.holiday);
        this.toastr.success('Holiday added successfully');
      }

      this.router.navigate(['/admin/holidays/list']);
    } catch (error) {
      console.error('Error saving holiday:', error);
      this.toastr.error('An error occurred while saving the holiday');
    }
  }
}
