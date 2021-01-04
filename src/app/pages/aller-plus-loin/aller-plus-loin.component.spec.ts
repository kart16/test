import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllerPlusLoinComponent } from './aller-plus-loin.component';

describe('AllerPlusLoinComponent', () => {
  let component: AllerPlusLoinComponent;
  let fixture: ComponentFixture<AllerPlusLoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllerPlusLoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllerPlusLoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
