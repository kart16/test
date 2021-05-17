import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {File} from '../models/file.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileService {
  private files: File[] = []
  filesSubject = new Subject<File[]>();
  pdfSubject = new Subject<File[]>();
  imageSubject = new Subject<File[]>();

  constructor(private httpClient: HttpClient) {
  }

  getFiles() {
    this.httpClient
      .get<any>('http://localhost:3000/api/files')
      .subscribe(
        (response: File[]) => {
          this.files = response;
          //console.log(response);
          this.emitFiles();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
          console.log(error);
          this.emitFiles();
        }
      );
  }

/*  saveFiles(file: File) {
      this.httpClient
      .post('http://localhost:3000/api/files', file)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          this.getFiles();
          this.emitFiles();
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      ); 
  }*/

  postFile(fileToUpload: File) {

    const endpoint = 'http://localhost:3000/api/files/';

    const formData: FormData = new FormData();
    formData.append('name', fileToUpload.name);
    formData.append('date', fileToUpload.date.toString());
    formData.append('file', fileToUpload.event_file);

    this.httpClient.post(endpoint,formData).subscribe(
      ()=>{
        console.log('Enregistrement terminé !');
        this.getFiles();
        this.emitFiles();
      },
      (error) => {
        console.log('Erreur ! : ');
        console.log(error);
      }
    );
    
  }

  emitFiles() {
    this.filesSubject.next(this.files);
/*     console.log("-----------------------------------------------");
    console.log(this.files);
    console.log("-----------------------------------------------"); */
    this.imageSubject.next(this.files.filter(value => value.type.startsWith('image')));
    this.pdfSubject.next(this.files.filter(value => value.type.endsWith('pdf')));
  }

  removeFile(item: File) {
    this.httpClient
      .delete('http://localhost:3000/api/files/' + item.id)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          const indexToRemove = this.files.findIndex(
            (El) => {
              if (El === item) {
                return true;
              }
            }
          );
          this.files.splice(indexToRemove, 1);
          this.emitFiles();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  getSingleFile(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
          .get('http://localhost:3000/api/files/' + id)
          .subscribe(
            (file: File) => resolve(file),
            (error) => {
              console.log('Erreur ! : ');
              console.log(error);
              reject(error);
            }
          );
      }
    );
  }
}
