import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccoutService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  //currentUser$ = this.currentUserSource.asObservable();
 
  constructor(private httpClient: HttpClient) { }

  login(model:any){
    
    this.httpClient.post(this.baseUrl + 'account/login',model)
    return this.httpClient.post(this.baseUrl + 'account/login',model).pipe(
      map((response: User) => 
      {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          //const c = this.currentUserSource.asObservable();
          this.currentUserSource.next(user);
        };
      })
     );
  }
    
  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
 
}
