import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-employee-main',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent {

}
