import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NinetoysserviceService } from '../../ninetoysservice.service';
import {
  switchMap,
  takeUntil,
  catchError,
  startWith,
  takeWhile
} from "rxjs/operators";
import { timer, Observable, Subject, interval, Subscription } from "rxjs";
import { TimeInterval } from "rxjs/internal/operators/timeInterval";
import { Location } from "@angular/common";
import { CookieService } from "ngx-cookie-service";

@Component({
 selector: 'app-checkout-status',
  templateUrl: './checkout-status.component.html',
  styleUrls: ['./checkout-status.component.scss']
})
export class CheckoutStatusComponent implements OnInit {
 public paymentStatus = "Pending";
 public api;
  public subscription: Subscription;
  public flag = 0;
  private foo: any = null;
  public counts=0;
 // data={productinfo:sessionStorage.getItem("productinfo")};
 data={productinfo:sessionStorage.getItem("productinfo")};
  public loader=true;
  previewFlag = sessionStorage.getItem('previewFlag');

  constructor(
  	 private adminService: NinetoysserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
     private cookie: CookieService) { }

  ngOnInit() {
    sessionStorage.setItem("headerone","1")
     this.cookie.delete("product_id2");
    this.cookie.delete("rate_type");
    sessionStorage.removeItem("product_no2");
    sessionStorage.removeItem("rate_buy");
    this.adminService.buy=false;
    this.cookie.set('buy_now_product',"false");

    this.reloadPage();
    
  	this.getPaymentStatus();
  	

  }
reloadPage(){
  console.log("reload")
setTimeout(function(){
this.reload();
},700)
}
reload(){
this.router.navigate([""])
}
  getPaymentStatus() {
   
     this.api = interval(7000).pipe(startWith(0), switchMap(() => this.adminService.payment_status_check(this.data)));
    // this.api=setInterval(() => {this.adminService.payment_status_check(this.data)}, 5000);
     
      // if(this.counts<50){
    this.subscription = this.api.subscribe(data => {
       this.counts++;
     
        if (data["status"] == 1) {
            this.paymentStatus = "Success";
            sessionStorage.setItem("buy_variable", 'false');
             // if( this.paymentStatus == "Success" || this.counts > 70){
               if( this.paymentStatus == "Success" ){
             
               this.subscription.unsubscribe();
            }
            setTimeout(()=>{
              if(this.previewFlag == '1'){
                this.router
                .navigateByUrl("/RefrshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/Admin/preview/home_profile/order-history"]));

              }else{
                this.router
                .navigateByUrl("/RefrshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/home_profile/order-history"]));

              }
                   
                  
            },2000);
      
        } else if (data["status"] == 0) {
            this.paymentStatus = "Pending";
            // if(  this.counts > 50){
            //   this.subscription.unsubscribe();
            // }
         
        } else {
          this.paymentStatus = "Failed";
           if( this.paymentStatus == "Failed"){
          
           // if( this.paymentStatus == "Failed" || this.counts > 30){
             this.subscription.unsubscribe();
          }
         
          
           setTimeout(()=>{
              
            if(this.previewFlag == '1'){
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/Admin/preview/home_profile/order-history"]));

            }else{
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/home_profile/order-history"]));

            }
              
           },3000);
             
        }
     
      if(this.flag==1) {
          setTimeout(()=>{
            if(this.previewFlag == '1'){
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/Admin/preview/home_profile/order-history"]));

            }else{
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/home_profile/order-history"]));

            }
          },4000);
      }
     
    });
  // }
  }
ngOnDestroy() {
  sessionStorage.setItem("buy_variable", 'false');
  // setTimeout(()=>{});
    this.subscription.unsubscribe();

  // if (this.api) {
    // clearInterval(this.subscription);
  // }
}
}
