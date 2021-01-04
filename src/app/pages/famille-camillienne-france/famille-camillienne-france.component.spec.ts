import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleCamillienneFranceComponent } from './famille-camillienne-france.component';

describe('FamilleCamillienneFranceComponent', () => {
  let component: FamilleCamillienneFranceComponent;
  let fixture: ComponentFixture<FamilleCamillienneFranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilleCamillienneFranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleCamillienneFranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
