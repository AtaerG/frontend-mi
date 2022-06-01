import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErPageComponent } from './er-page.component';

describe('ErPageComponent', () => {
  let component: ErPageComponent;
  let fixture: ComponentFixture<ErPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
