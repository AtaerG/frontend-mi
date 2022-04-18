import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyChatComponent } from './apply-chat.component';

describe('ApplyChatComponent', () => {
  let component: ApplyChatComponent;
  let fixture: ComponentFixture<ApplyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
