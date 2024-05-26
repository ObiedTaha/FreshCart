import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcardComponent } from './productcard.component';

describe('ProductcardComponent', () => {
  let component: ProductcardComponent;
  let fixture: ComponentFixture<ProductcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductcardComponent]
    });
    fixture = TestBed.createComponent(ProductcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
