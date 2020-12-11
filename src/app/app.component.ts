import { Component } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'mg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mega-front';
  headerOne;
  headerTwo;
  constructor(){
    this.headerOne=sessionStorage.getItem("headerone");

    this.headerTwo=sessionStorage.getItem("headertwo");
    console.log(this.headerOne+""+this.headerTwo)

  }
}
