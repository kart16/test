import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AumoneriesComponent } from './aumoneries.component';

describe('AumoneriesComponent', () => {
  let component: AumoneriesComponent;
  let fixture: ComponentFixture<AumoneriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AumoneriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AumoneriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
