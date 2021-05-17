import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private news: News[] = []
  newsSubject = new Subject<News[]>();

  constructor(private httpClient: HttpClient) {
    //this.getNewsFromServer
  }

  getNews() {
    this.httpClient
      .get<any>('http://localhost:3000/api/news')
      .subscribe(
        (response: News[]) => {
            this.news = response;
            console.log(response);
            this.emitNews();
          },
        (error) => {
          console.log('Erreur ! : ' + error);
          console.log(error);
          this.emitNews();
        }
      );
  }

  saveNews(news: News) {
    this.httpClient
      .post('http://localhost:3000/api/news', news)
      .subscribe(
        () => {
            console.log('Enregistrement terminé !');
            this.getNews();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
  }

  emitNews() {
    this.newsSubject.next(this.news);
  }
  
  removeNews(id:number) {
    this.httpClient
      .delete('http://localhost:3000/api/news/' + id)
      .subscribe(
        () => {
          console.log('Suppression terminée !');
          const indexToRemove = this.news.findIndex(
            (El) => {
              if (El.id === id) {
                return true;
              }
            }
          );
          this.news.splice(indexToRemove, 1);
          this.emitNews();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  getSingleNews(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
          .get('http://localhost:3000/api/news/'+id)
          .subscribe(
              (news: News) => {
                resolve(news)
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
  
  updateNews(item: News) {
    this.httpClient
      .put('http://localhost:3000/api/news/' + item.id, item)
      .subscribe(
        () => {
            console.log('Modification terminée !');
            this.news = this.news.map(
				(t_item) => {
					if(t_item.id == item.id)
						return item;
					else
						return t_item;
				  });
            this.emitNews();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
  }


}
