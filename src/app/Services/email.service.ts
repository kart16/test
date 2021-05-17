import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {File} from '../models/file.model';
import { Observable } from 'rxjs';
import { Email } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private httpClient: HttpClient) {
  }

  sendMail(emailToSend: Email) {

    const endpoint = 'http://localhost:3000/api/sendmails/';

    const formData: FormData = new FormData();
    formData.append('subject', emailToSend.subject);
    formData.append('text', emailToSend.text);
    for(var i = 0; i < emailToSend.event_files.length ; i ++) {
      formData.append('files', emailToSend.event_files[i]);
    }
    

    this.httpClient.post(endpoint,formData).subscribe(
      ()=>{
        console.log('Mails envoyés !');
      },
      (error) => {
        console.log('Erreur ! : ');
        console.log(error);
      }
    );
    
  }
}
