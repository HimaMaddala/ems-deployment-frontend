import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './guards/auth.gaurd';
import { AdminGaurd } from './guards/admin.gaurds';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { AdminComponent } from './admin/admin.component';
import { DepartmentListComponent } from './admin/departments/components/department-list/department-list.component';
import { DepartmentFormComponent } from './admin/departments/components/department-form/department-form.component';
import { EmployeeListComponent } from './admin/employees/components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './admin/employees/components/employee-form/employee-form.component';
import { EmployeedetailsFormComponent } from './employees/employeedetails-form/employeedetails-form.component';
import { EmployeeeLeaveFormComponent } from './employees/employeee-leave-form/employeee-leave-form.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { EmployeeMainComponent } from './employees/employee-main/employee-main.component';
import { PerformanceComponent } from './admin/employees/components/performance/performance.component';
import { HolidaysListComponent } from './admin/holidays/components/holidays-list/holidays-list.component';
import { HolidayFormComponent } from './admin/holidays/components/holidays-form/holidays-form.component';
import { HolidayCalendarComponent } from './employees/holiday-calendar/holiday-calendar.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login/:role', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: EmployeeMainComponent,
        children: [
            { path: 'me', component: EmployeeDetailsComponent },
            { path: 'me/edit', component: EmployeedetailsFormComponent },
            { path: 'me/leave-request', component: EmployeeeLeaveFormComponent },
            { path: 'holidays', component: HolidayCalendarComponent },
        ],
        canActivate: [AuthGaurd]
    },

    // admin routes
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGaurd, AdminGaurd],
        children: [
            { path: 'dashboard', component: DashboardComponent },

            // department routes
            { path: 'departments/list', component: DepartmentListComponent },
            { path: 'departments/form', component: DepartmentFormComponent },
            { path: 'departments/:departmentId/edit', component: DepartmentFormComponent },

            // employee routes
            { path: 'employees/list', component: EmployeeListComponent },
            { path: 'employees/form', component: EmployeeFormComponent },
            { path: 'employees/:employeeId/edit', component: EmployeeFormComponent },
            { path: 'employees/performance/:empId', component: PerformanceComponent },

            // holiday routes
            { path: 'holidays/list', component: HolidaysListComponent },
            { path: 'holidays/form', component: HolidayFormComponent },
            { path: 'holidays/:holidayId/edit', component: HolidayFormComponent }
        ]
    },
    { path: '**', redirectTo: 'app/home', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes), BrowserModule],
    exports: [RouterModule],
    providers: [NgModel]
})
export class AppRoutingModule { }
