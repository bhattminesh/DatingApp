import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'The Dating app';
  user: any;

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
