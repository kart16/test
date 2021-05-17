import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesFraternitesStCamilleComponent } from './les-fraternites-st-camille.component';

describe('LesFraternitesStCamilleComponent', () => {
  let component: LesFraternitesStCamilleComponent;
  let fixture: ComponentFixture<LesFraternitesStCamilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesFraternitesStCamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesFraternitesStCamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
