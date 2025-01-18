import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeeLeaveFormComponent } from './employeee-leave-form.component';

describe('EmployeeeLeaveFormComponent', () => {
  let component: EmployeeeLeaveFormComponent;
  let fixture: ComponentFixture<EmployeeeLeaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeeLeaveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeeLeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
