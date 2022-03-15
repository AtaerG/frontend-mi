import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentProductComponent } from './add-comment-product.component';

describe('AddCommentProductComponent', () => {
  let component: AddCommentProductComponent;
  let fixture: ComponentFixture<AddCommentProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
