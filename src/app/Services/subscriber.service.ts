import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {Subscriber} from '../models/subscriber.model';

@Injectable({
  providedIn: 'root'
})

export class SubscriberService {
  private subscribers: Subscriber[] = []
  subscribersSubject = new Subject<Subscriber[]>();

  constructor(private httpClient: HttpClient) {
  }

  getSubcribers() {
    this.httpClient
      .get<any>('http://localhost:3000/api/emails')
      .subscribe(
        (response: Subscriber[]) => {
          this.subscribers = response;
          console.log(response);
          this.emitSubcribers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
          console.log(error);
          this.emitSubcribers();
        }
      );
  }

  saveSubscriber(subscriber: Subscriber) {
    this.httpClient
      .post('http://localhost:3000/api/emails', subscriber)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          this.subscribers.push(subscriber);
          this.emitSubcribers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  emitSubcribers() {
    this.subscribersSubject.next(this.subscribers);
  }

  removeSubscriber(item: Subscriber) {
    this.httpClient
      .delete('http://localhost:3000/api/emails/' + item.id)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          const indexToRemove = this.subscribers.findIndex(
            (El) => {
              if (El === item) {
                return true;
              }
            }
          );
          this.subscribers.splice(indexToRemove, 1);
          this.emitSubcribers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  getSingleSubscriber(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
          .get('http://localhost:3000/api/emails/' + id)
          .subscribe(
            (subscriber: Subscriber) => resolve(subscriber),
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
