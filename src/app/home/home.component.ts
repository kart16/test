import { Component, HostListener, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PrayerService } from '../Services/prayer.service';
import { Prayer } from '../models/prayer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private prayerService: PrayerService, private formBuilder: FormBuilder) { }

  imgTab: string[] = [];
  bulletinTab: number[] = [1, 2, 3];
  prayerForm: FormGroup;
  prayer: Prayer;

  isShow: boolean;
  topPosToStartShowing = 100;

  /*longitude = 20.728218;
  latitude = 52.128973;
  markers = [
    { latitude: 52.228973, longitude: 20.728218 }
  ];*/

  ngOnInit() { 
    this.fct();
    this.initForm();
  }
  
  fct(){
    for(var i=0;i<7;i++){
      this.imgTab[i]="assets/images/img"+(i+1)+".jpg";
    }
  }

  initForm() {
    this.prayerForm = this.formBuilder.group({
      prayerFormModalName: ['', Validators.required],
      prayerFormModalPrayer: ['', Validators.required]
    });
  }

  onSubmitPrayer() {
    const formValue = this.prayerForm.value;
    const newPrayer = new Prayer(
      formValue['prayerFormModalName'],
      formValue['prayerFormModalPrayer'],
      new Date()
    );
    this.prayerService.savePrayers(newPrayer);

    this.initForm();
    this.prayerService.emitPrayers();
  }

  get prayerFormModalName() {
    return this.prayerForm.get('prayerFormModalName');
  }

  get prayerFormModalPrayer() {
    return this.prayerForm.get('prayerFormModalPrayer');
  }

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= (this.topPosToStartShowing+1000)) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
