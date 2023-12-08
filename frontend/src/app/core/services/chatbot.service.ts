import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private api: string = "https://kind-ruby-magpie-sari.cyclic.app/chatbot"

  constructor(private http: HttpClient) { }

  sendMessageToChatAPI(message: string): Observable<any>{
    return this.http.post(this.api, {
      userMessage: message
    })
  }
}
