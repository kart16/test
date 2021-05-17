import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Communication } from '../models/communication.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private communication: Communication[] = []
  communicationSubject = new Subject<Communication[]>();

  constructor(private httpClient: HttpClient) {
    //this.getCommunicationsFromServer
  }

  getCommunications() {
    this.httpClient
      .get<any>('http://localhost:3000/api/communications')
      .subscribe(
        (response: Communication[]) => {
            this.communication = response;
            console.log(response);
            this.emitCommunication();
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          console.log(error);
          this.emitCommunication();
        }
      );
  }

  saveCommunication(communication: Communication) {
    this.httpClient
      .post('http://localhost:3000/api/communications', communication)
      .subscribe(
        () => {
            console.log('Enregistrement terminé !');
            //this.communication.push(communication);
            //console.log(this.communication);
            //this.emitCommunication();
            this.getCommunications();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
  }

  emitCommunication() {
    this.communicationSubject.next(this.communication);
  }

  removeCommunication(id:number) {
    this.httpClient
      .delete('http://localhost:3000/api/communications/' + id)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          const indexToRemove = this.communication.findIndex(
            (El) => {
              if (El.id === id) {
                return true;
              }
            }
          );
          this.communication.splice(indexToRemove, 1);
          this.emitCommunication();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  getSingleCommunication(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
          .get('http://localhost:3000/api/communications/'+id)
          .subscribe(
              (communication: Communication) => {
                resolve(communication)
              },
              (error) => {  
                console.log('Erreur ! : ');
                console.log(error);
                reject(error);
              }
            );
      }
    );
  }
  
  updateCommunication(item: Communication) {
    this.httpClient
      .put('http://localhost:3000/api/communications/' + item.id, item)
      .subscribe(
        () => {
            console.log('Modification terminée !');
            this.communication = this.communication.map(
				(t_item) => {
					if(t_item.id == item.id)
						return item;
					else
						return t_item;
				  });
            this.emitCommunication();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
  }


}
