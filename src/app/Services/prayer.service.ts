import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {Prayer} from '../models/prayer.model';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  private prayers: Prayer[] = []
  prayersSubject = new Subject<Prayer[]>();

  constructor(private httpClient: HttpClient) {
    //this.getPrayersFromServer
  }

  getPrayers() {
    this.httpClient
      .get<any>('http://localhost:3000/api/prayers')
      .subscribe(
        (response: Prayer[]) => {
            this.prayers = response;
            //console.log(response);
            this.emitPrayers();
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          console.log(error);
          this.emitPrayers();
        }
      );
  }

  savePrayers(prayer: Prayer) {
    this.httpClient
      .post('http://localhost:3000/api/prayers', prayer)
      .subscribe(
        () => {
            console.log('Enregistrement terminé !');
            this.getPrayers();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
  }

  emitPrayers() {
    this.prayersSubject.next(this.prayers);
  }

  removePrayer(id:number) {
    this.httpClient
      .delete('http://localhost:3000/api/prayers/' + id)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          const indexToRemove = this.prayers.findIndex(
            (El) => {
              if (El.id === id) {
                return true;
              }
            }
          );
          this.prayers.splice(indexToRemove, 1);
          this.emitPrayers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  getSinglePrayer(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
          .get('http://localhost:3000/api/prayers/'+id)
          .subscribe(
              (prayer: Prayer) => {
                resolve(prayer)
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
  
  updatePrayer(item: Prayer) {
    console.log("Prayer PUUUT");
    this.httpClient
      .put('http://localhost:3000/api/prayers/' + item.id, item)
      .subscribe(
        () => {
            console.log('Modification terminée !');
            this.prayers = this.prayers.map(
				(t_item) => {
					if(t_item.id == item.id)
						return item;
					else
						return t_item;
				  });
            this.emitPrayers();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
  }


}
