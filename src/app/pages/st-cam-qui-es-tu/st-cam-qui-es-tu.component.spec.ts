import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StCamQuiEsTuComponent } from './st-cam-qui-es-tu.component';

describe('StCamQuiEsTuComponent', () => {
  let component: StCamQuiEsTuComponent;
  let fixture: ComponentFixture<StCamQuiEsTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StCamQuiEsTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StCamQuiEsTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
