import { Component, OnInit } from '@angular/core';
import { Subscription, from, Subject } from 'rxjs';
import { PrayerService } from 'src/app/Services/prayer.service';
import { Prayer } from 'src/app/models/prayer.model';
import { Router } from '@angular/router';
import { FileService } from 'src/app/Services/file.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File } from '../../models/file.model'
import { $ } from 'protractor';
import { Album } from 'src/app/models/album.model';
import { Email } from 'src/app/models/email.model';
import { AlbumService } from 'src/app/Services/album.service';
import { EmailService } from 'src/app/Services/email.service';
import { Communication } from 'src/app/models/communication.model';
import { CommunicationService } from 'src/app/Services/communication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  prayersSubscription: Subscription;
  fileSubscription: Subscription;
  albumNameSubcription: Subscription;
  albumSubscription: Subscription;
  commSubscription: Subscription;

  prayer: any[];
  filesReq:File[];
  singleP: Prayer;
  prayerText: string = "";
  sp: Prayer;
  isResp: boolean;
  identifiant:number;
  fileId: number;
  actifLink: number = 1;
  uploadForm: FormGroup;
  uploadPhoto: FormGroup;
  emailForm: FormGroup;
  comForm:FormGroup;
  newDate: Date = new Date();
  fileTab: string[] = [];
  fileToUpload: File[] = [];// = new File();
  emailFileToUpload: File[] = []//new File();
  fileToRm: File = new File();
  isAlbum:boolean = false;
  albumNewPotoToUpload: Album = new Album("", "", {name : "", url : ""}[0]);

  album: string;            // le nom d'un album
  albumNames:string[];
  albumsMap : Map<String, Album> = new Map<String, Album>(); 
  albumm: Album = new Album("", "", {name : "", url : ""}[0]);
  urlPhoto: string;
  photoTitle: string;
  urlPhoto2: string;
  photoTitle2: string;
  isList: boolean = false;
  imageName: string[] = [];
  isdetect: boolean = false;

  email: Email = new Email();
  emailFileName: string[] = [];
  isFiledetected: boolean = false;

  numeros:number []= [1,2,3,4];
  communication: Communication = new Communication("","");
  commun:Communication[]=[];

  constructor(private prayerService: PrayerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private albumService: AlbumService,
              private emailService: EmailService,
              private comService: CommunicationService) { }

  ngOnInit() {
    this.prayersSubscription = this.prayerService.prayersSubject.subscribe(
        (prayers: Prayer[]) => {
          this.prayer = prayers;
      }
    );
    this.prayerService.getPrayers();

    this.fileSubscription = this.fileService.filesSubject.subscribe(
        (files: File[]) => {
          this.filesReq = files;
      }
    );
    this.fileService.getFiles();

    this.albumNameSubcription = this.albumService.albumsNamesS.subscribe(
      (albumNames:string[]) =>{
        this.albumNames = albumNames;
      }
    );
    this.albumService.getAlbums();

    this.commSubscription = this.comService.communicationSubject.subscribe(
      (comm:Communication[]) =>{
        this.commun = comm;
      }
    );
    this.comService.getCommunications();

    this.initForm();

    this.initPhotoForm();

    this.initEmailForm();

    this.initCommForm();
  }

  fct(){
    for(var i=0;i<this.filesReq.length;i++){
      this.fileTab[i]=""+this.filesReq[i].location;
    }
  }

  initForm() {
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required], 
      fichier: ['', Validators.required]
    });
  }

  detectFiles(event) {
    for(var i=0;i<event.target.files.length;i++){
      this.fileToUpload[i] = new File();
      this.fileToUpload[i].event_file = event.target.files.item(i);
    }
  }

  uploadFile(){

    for(var i=0;i<this.fileToUpload.length;i++){
      this.fileToUpload[i].name = this.uploadForm.get('name').value;
      this.fileToUpload[i].uploadDate = this.uploadForm.get('date').value;
      this.fileService.postFile(this.fileToUpload[i]); 
    }

  }

  initPhotoForm() {
    this.uploadPhoto = this.formBuilder.group({
      photo: ['', Validators.required]
    });
  }

  detectPhoto(event) {
    for(var i=0;i<event.target.files.length;i++){
      this.albumNewPotoToUpload.upload_photos[i] = event.target.files.item(i);
      this.imageName[i] = event.target.files[i].name;
    }
    this.isdetect = true;
  }

  uploadImage(){
    this.albumNewPotoToUpload.albumurl = this.albumm.albumurl;
    this.albumNewPotoToUpload.albumname = this.albumm.albumname; 
    this.albumService.postPhotos(this.albumNewPotoToUpload);
  }
  
  initEmailForm(){
    this.emailForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      fichier: ['', Validators.required]
    });
  }

  detectEmailFiles(event) {
    for(var i=0;i<event.target.files.length;i++){
      this.emailFileToUpload[i] = new File();
      this.emailFileName[i] = event.target.files[i].name;
    }
    this.isFiledetected = true;
  }

  sendEmail(){

    this.email.subject = this.emailForm.get('subject').value;
    this.email.text = this.emailForm.get('message').value; 
    for(var i=0;i<this.emailFileToUpload.length;i++){
      this.email.event_files[i] = this.emailFileToUpload[i].event_file;
    }

    this.emailService.sendMail(this.email);

    this.actifLink=1;
  }

  initCommForm(){
    this.comForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  sendCom(){
    this.communication.title = this.comForm.get('title').value;
    this.communication.content = this.comForm.get('content').value; 

    this.comService.saveCommunication(this.communication);

    this.actifLink=1;
  }

  getSinglePrayer(id:number){
    const ident = id+1;
    this.prayerService.getSinglePrayer(ident).then(
      (p:Prayer)=>{
        this.prayerText = p.prayer;  //texte de prière
        this.sp=p;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  
  updatePrayer(){
    this.sp.prayer = this.prayerText;
    this.prayerService.updatePrayer(this.sp);
  }

  linkActif(n:number){
    if(n===1)
      this.actifLink=1;
      console.log(this.albumNames[0]);
    if(n===2)
      this.actifLink=2;
    if(n===3)
      this.actifLink=3;
    if(n===4)
      this.actifLink=4;
  }

  onDeletePrayer(res:string){
    if(res==="yes"){
      this.prayerService.removePrayer(this.identifiant);
    }
  }
  
  getId(id:number){
    const ident = id+1;
    this.identifiant=ident;
  }

  getFileId(i:number){
    const id = i+1;
    this.fileId = id;
  }

  onDeleteFile(res:string){
    if(res==="yes"){
      for(let i=0;i<this.filesReq.length;i++){
        if(this.filesReq[i].id===this.fileId){
          this.fileToRm = this.filesReq[i] 
        }
      }
      this.fileService.removeFile(this.fileToRm);
    }
  }

  getAlbum(albumName){
    this.albumSubscription = this.albumService.albumsMapS.get(albumName).subscribe(
      (album: Album) =>{
        this.albumm = album;
      }
    );
    this.albumService.emitAlbumPhotos(albumName);
  }

  albumSelect(num:number){
    if(num==1){
      this.isAlbum= true;
      this.album = this.albumNames[0];
      this.getAlbum(this.album);

    }else if(num==2){
      this.isAlbum= true;
      this.album = this.albumNames[1];
      this.getAlbum(this.album);

    }else if(num==3){
      this.isAlbum= true;
      this.album = this.albumNames[2];
      this.getAlbum(this.album);

    }
  }

  getIndex2(i){
    this.urlPhoto = this.albumm.albumphotos[i].url; 
  }

  deletPhoto(i){
    var photo = {
      name: this.albumm.albumphotos[i].name,
      url: this.albumm.albumphotos[i].url
    };
    this.albumService.deletePhoto(this.albumm,photo);
  }

  printList(){
    this.isList = true;
  }

  notPrintList(){
    this.isList = false;
  }

  onValidate(p:Prayer){
    p.activated = true;
    this.prayerService.updatePrayer(p);
  }

  invalid(p:Prayer){
    p.activated = false;
    this.prayerService.updatePrayer(p);
  }

  ngOnDestroy() {
    if(this.prayersSubscription){
      this.prayersSubscription.unsubscribe();
    }
    else if(this.fileSubscription){
      this.fileSubscription.unsubscribe();
    }
    else if(this.albumNameSubcription){
      this.albumNameSubcription.unsubscribe();
      this.router.navigate(['/home']); 
    }
    else if(this.albumSubscription){
      this.albumSubscription.unsubscribe();
      this.router.navigate(['/home']); 
    }

  }

  
}




