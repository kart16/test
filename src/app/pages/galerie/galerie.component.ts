import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from 'src/app/Services/album.service';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit {

  albumNameSubcription: Subscription;
  albumSubscription: Subscription;

  albumNames:string[];
  album: string; 
  albumm: Album = new Album("", "", {name : "", url : ""}[0]);
  albumCourant: Album;
  urlPhotoCourant: String = "";
  albumNom: String = "";
  urlPhoto: String = "";

  constructor( private albumService: AlbumService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {

    this.albumNameSubcription = this.albumService.albumsNamesS.subscribe(
      (albumNames:string[]) =>{
        this.albumNames = albumNames;
      }
    );
    this.albumService.getAlbums();

    this.albumCourant = new Album("", "", {name : "", url : ""}[0]);

    this.urlPhotoCourant = this.route.snapshot.params['id'];
    /* this.albumNom = this.route.snapshot.params['albumNom'];

    setTimeout(()=>{
      this.albumSubscription = this.albumService.albumsMapS.get(this.albumNom ).subscribe(
        (album: Album) =>{
          this.albumm = album;
        }
      );
      this.albumService.emitAlbumPhotos(this.albumNom );
    }, 50);

    setTimeout(()=>{
      for(var i=0;i<this.albumm.albumphotos.length;i++){
        if(this.albumm.albumphotos[i].url===this.urlPhotoCourant){
          this.urlPhoto = this.urlPhotoCourant;
        }
      }
    }, 50); */

  } 
}
