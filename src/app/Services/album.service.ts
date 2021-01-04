import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {File} from '../models/file.model';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  albumsMapS : Map<String, Subject<Album>> = new Map<String, Subject<Album>>();
  albumsMap : Map<String, Album> = new Map<String, Album>(); 
  albumsNamesS : Subject<string[]> = new Subject<string[]>();

  constructor(private httpClient: HttpClient) {}

  getAlbums() {
    this.httpClient
      .get<any>('http://localhost:3000/api/albums')
      .subscribe(
        (response: {name : string, url : string}[]) => {
          for(var i = 0; i < response.length; i++) {
            this.albumsMap.set(response[i].name, new Album(response[i].name, response[i].url, []));
            this.albumsMapS.set(response[i].name, new Subject<Album>());
            this.emitAlbumPhotos(response[i].name);
          }
          this.albumsNamesS.next(response.map(x => x.name));
        },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.albumsNamesS.next([]);
          this.emitEmptyAlbums();
        }
      );
  }


  emitAlbumPhotos (albumName) {
    this.httpClient
      .get<any>(this.albumsMap.get(albumName).albumurl)
      .subscribe(
        (response: {name : string, url : string}[]) => {
          this.albumsMap.get(albumName).albumphotos = response; 
          this.albumsMapS.get(albumName).next(this.albumsMap.get(albumName))
          //console.log("ICcccccccccccccccci");
        },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.albumsMapS.get(albumName).next(new Album(albumName, this.albumsMap.get(albumName).albumurl, []))
        }
      );
  }

  emitEmptyAlbums (){
    for (var albumName in this.albumsMap.keys){
      this.albumsMapS.get(albumName).next(new Album(albumName, this.albumsMap.get(albumName).albumurl, []))
    }
    this.albumsNamesS.next([]);
  }


  postPhotos(album : Album) {
    const formData: FormData = new FormData();
    for(var i = 0; i < album.upload_photos.length; i++) {
      formData.append('file', album.upload_photos[i]);
    }
    this.httpClient.post(album.albumurl, formData).subscribe(
      ()=>{
        console.log('Enregistrement terminé !');
        this.emitAlbumPhotos(album.albumname);
      },
      (error) => {
        console.log('Erreur ! : ');
        console.log(error);
      }
    );
  }


  deletePhoto(album : Album, photo : {name : string, url : string}) {
    this.httpClient
      .delete(album.albumurl + "/" + photo.name)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          const indexToRemove = this.albumsMap.get(album.albumname).albumphotos.findIndex(
            (El) => {
              if (El === photo) {
                return true;
              }
            }
          );
          this.albumsMap.get(album.albumname).albumphotos.splice(indexToRemove, 1);
          this.emitAlbumPhotos(album.albumname);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  deleteAlbum(album : Album) {
    this.httpClient
      .delete(album.albumurl)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          this.albumsMapS.get(album.albumname).next(new Album(album.albumname, album.albumurl, []))
          this.albumsMapS.get(album.albumname).complete();
          this.albumsMap.delete(album.albumname);
          this.albumsMapS.delete(album.albumname);
          this.albumsNamesS.next(this.albumsMap.keys.apply(strList => strList));
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }


}
