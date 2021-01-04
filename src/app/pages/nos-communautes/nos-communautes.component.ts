import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/Services/album.service';

@Component({
  selector: 'app-nos-communautes',
  templateUrl: './nos-communautes.component.html',
  styleUrls: ['./nos-communautes.component.scss']
})
export class NosCommunautesComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;

  albumNameSubcription: Subscription;
  albumSubscription: Subscription;

  album: string;            // le nom d'un album
  albumm: Album = new Album("", "", {name : "", url : ""}[0]);
  albumNames:string[];
  urlPhoto: string;
  photoTitle: string;
  urlPhoto2: string;
  photoTitle2: string;

  constructor(private router: Router,
              private albumService: AlbumService) { }

  ngOnInit(){

    this.albumNameSubcription = this.albumService.albumsNamesS.subscribe(
      (albumNames:string[]) =>{
        this.albumNames = albumNames;
      }
    );
    this.albumService.getAlbums();

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
      this.album = this.albumNames[0];
      this.getAlbum(this.album);

    }else if(num==2){
      this.album = this.albumNames[1];
      this.getAlbum(this.album);

    }else if(num==3){
      this.album = this.albumNames[2];
      this.getAlbum(this.album);

    }
  }

  maGalery(){
    this.albumSelect(3);
  }

  
  getIndex(i){
    this.urlPhoto = this.albumm.albumphotos[i].url; 
    this.urlPhoto2 = this.albumm.albumphotos[i+1].url; 

    this.photoTitle = this.albumm.albumphotos[i].name;
    this.photoTitle2 = this.albumm.albumphotos[i+1].name;
  }
  
  next(url){
    for(var i=0;i<this.albumm.albumphotos.length;i++){
      if(this.albumm.albumphotos[i].url===url){
        this.urlPhoto = this.albumm.albumphotos[i+1].url;
        this.urlPhoto2 = this.albumm.albumphotos[i+2].url;

        this.photoTitle = this.albumm.albumphotos[i+1].name;
        this.photoTitle2 = this.albumm.albumphotos[i+2].name;
      }
    }
    
  }

  prev(url){
    for(var i=0;i<this.albumm.albumphotos.length;i++){
      if(this.albumm.albumphotos[i].url===url){
        this.urlPhoto = this.albumm.albumphotos[i-1].url;
        this.urlPhoto2 = this.albumm.albumphotos[i-2].url;
        
        this.photoTitle = this.albumm.albumphotos[i-1].name;
        this.photoTitle2 = this.albumm.albumphotos[i-2].name;
      }
    }
  }

  ngOnDestroy() {
    if(this.albumNameSubcription){
      this.albumNameSubcription.unsubscribe();
      this.router.navigate(['/home']); 
    }
    else if(this.albumSubscription){
      this.albumSubscription.unsubscribe();
      this.router.navigate(['/home']); 
    }
  }

}
