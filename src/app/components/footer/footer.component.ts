import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NinetoysserviceService } from "../../ninetoysservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CookieService } from "ngx-cookie-service";
import { Location } from "@angular/common";
@Component({
  selector: 'mg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  comp_num_new = sessionStorage.getItem("comp_num_new");
  constructor(
    private adminservice: NinetoysserviceService,
    private router: Router,
    public snackbar: MatSnackBar,

    public location: Location,
    private cookie: CookieService
  ) {}
  host_name;
  compd;
  

  ngOnInit() { 
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];

    
      if((this.host_name == "vendor.9toys.in"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.9toys.in"  && sessionStorage.getItem('previewFlag') == '1' ) ){
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.medialinks(this.comp_num_new);
        this.basicCompany(this.comp_num_new);

      }else{
        this.adminservice
        .hostlink({ host_name: this.host_name })
        .subscribe(data => {
          if (data["status"] == 1) {
            if(data['result']['is_active']=='Y'){
              sessionStorage.setItem("comp_num_new", data["result"].comp_num);
              this.comp_num_new = data["result"].comp_num;
              this.medialinks(this.comp_num_new);
              this.basicCompany(this.comp_num_new);
            } else {

            }

          }else{

          }
           
        });

      }
      
  
  }
  data;
  medialinks(dd) {
    this.adminservice
      .fetch_media_links({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.data = data["data"].value;
          // this.data = JSON.parse(d.value);

        } else if (data["status"] == 0) {
        }
      });
  }
  basicCompany(dd) {
    this.adminservice
      .getCompnyBasicDetail({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.compd = data["data"];
        } else if (data["status"] == 0) {
        }
      });
  }


}
