import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailPage } from './restaurant-detail-page';

describe('RestaurantDetailPage', () => {
  let component: RestaurantDetailPage;
  let fixture: ComponentFixture<RestaurantDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
