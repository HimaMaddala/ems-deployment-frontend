import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedetailsFormComponent } from './employeedetails-form.component';

describe('EmployeedetailsFormComponent', () => {
  let component: EmployeedetailsFormComponent;
  let fixture: ComponentFixture<EmployeedetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeedetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeedetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
