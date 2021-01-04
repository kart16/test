import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesReligServMaladComponent } from './des-relig-serv-malad.component';

describe('DesReligServMaladComponent', () => {
  let component: DesReligServMaladComponent;
  let fixture: ComponentFixture<DesReligServMaladComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesReligServMaladComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesReligServMaladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
