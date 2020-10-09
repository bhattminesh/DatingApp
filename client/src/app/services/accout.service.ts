import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AccoutService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  login(model:any){
    
    return this.httpClient.post(this.baseUrl + 'Login/login',model);
  }
}