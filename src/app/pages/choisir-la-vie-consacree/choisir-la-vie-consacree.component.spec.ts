import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirLaVieConsacreeComponent } from './choisir-la-vie-consacree.component';

describe('ChoisirLaVieConsacreeComponent', () => {
  let component: ChoisirLaVieConsacreeComponent;
  let fixture: ComponentFixture<ChoisirLaVieConsacreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisirLaVieConsacreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirLaVieConsacreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
