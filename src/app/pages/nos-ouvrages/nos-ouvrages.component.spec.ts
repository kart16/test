import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NosOuvragesComponent } from './nos-ouvrages.component';

describe('NosOuvragesComponent', () => {
  let component: NosOuvragesComponent;
  let fixture: ComponentFixture<NosOuvragesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosOuvragesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosOuvragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
