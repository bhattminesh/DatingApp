//import { AccoutService } from './services/accout.service';
import { AccoutService } from './_services/accout.service';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'The Dating app';


  constructor(private http: HttpClient,private accountService: AccoutService){

  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User  = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);

  }

  
}
