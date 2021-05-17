import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NosCommunautesComponent } from './nos-communautes.component';

describe('NosCommunautesComponent', () => {
  let component: NosCommunautesComponent;
  let fixture: ComponentFixture<NosCommunautesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosCommunautesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosCommunautesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
