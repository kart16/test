import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsCamilliennesComponent } from './missions-camilliennes.component';

describe('MissionsCamilliennesComponent', () => {
  let component: MissionsCamilliennesComponent;
  let fixture: ComponentFixture<MissionsCamilliennesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsCamilliennesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsCamilliennesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
