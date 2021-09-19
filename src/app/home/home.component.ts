import { Component, HostListener, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PrayerService } from '../Services/prayer.service';
import { Prayer } from '../models/prayer.model';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../Services/communication.service';
import { Communication } from '../models/communication.model';
import { FileService } from '../Services/file.service';
import { File } from '../models/file.model';
import { News } from '../models/news.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private prayerService: PrayerService, 
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private comService: CommunicationService) { }

  imgTab: string[] = [];
  bulletinTab: number[] = [1, 2, 3];
  prayerForm: FormGroup;
  prayer: Prayer;

  commSubscription: Subscription;
  commun:Communication[]=[];
  isShow: boolean;
  topPosToStartShowing = 100;

  fileSubscription: Subscription;
  filesReq:File[];
  singleCom: Communication = new Communication("","");
  /*longitude = 20.728218;
  latitude = 52.128973;
  markers = [
    { latitude: 52.228973, longitude: 20.728218 }
  ];*/

  ngOnInit() { 

    this.commSubscription = this.comService.communicationSubject.subscribe(
      (comm:Communication[]) =>{
        this.commun = comm;
      }
    );
    this.comService.getCommunications();

    this.fileSubscription = this.fileService.filesSubject.subscribe(
        (files: File[]) => {
          this.filesReq = files.slice().reverse();  //copie inversée de la liste 
      }
    );
    this.fileService.getFiles();

    this.fct();
    this.initForm();
    
  }


  fct(){
    for(var i=0;i<15;i++){
      this.imgTab[i]="../../assets/images/Page d'accueil ("+(i+1)+").jpg";
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

  getComId(i:number){
    const Id = i;
    this.comService.getSingleCommunication(Id).then(
      (singleCo:Communication) =>{
        this.singleCom = singleCo;
    },(error)=>{
      console.log("SingleCommunication inexistant");
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.commSubscription.unsubscribe();
  }
}
