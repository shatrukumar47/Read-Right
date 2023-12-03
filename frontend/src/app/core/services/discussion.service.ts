import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private discussionAPI = "http://localhost:8080/community"
  private discussionPostAPI = "http://localhost:8080/posts"
  private token:string = "";
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getAllDiscussions(): Observable<any>{
    return this.http.get<any>(this.discussionAPI)
  }

  getDiscussionsByBookID(id: string): Observable<any>{
    return  this.http.get<any>(`${this.discussionAPI}/book/${id}`);
  }

  getDiscussionPosts(id: string): Observable<any>{
    return this.http.get<any>(`${this.discussionPostAPI}/${id}`)
  }

  createDiscussionPost(discussionID: string, message: string): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.post<any>(`${this.discussionPostAPI}/create/${discussionID}`, {message}, {headers});
  }

  createDiscussion(payload: {title:string, topic: string, description: string, bookID: string}): Observable<any>{
    this.setToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    
    return this.http.post<any>(`${this.discussionAPI}/create`, payload, {headers});
  }


  setToken(){
    this.store.select((state)=> state.auth.token).subscribe((res)=>{
      this.token = res;
    })
  }
}
