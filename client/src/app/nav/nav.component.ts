import { AccoutService } from './../_services/accout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;

  constructor(private accountService: AccoutService) {}

  ngOnInit(): void {}

  login() {
    
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = true;
        console.log(this.loggedIn);
      },
      (error) => {
        console.log(error);
      }
    );
    
    }
   
   logout(){
    
    this.loggedIn = false;
  }
}
