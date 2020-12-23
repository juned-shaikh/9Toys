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
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  username = sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  categories;
  more = false;
  public visibleIndexw =false;
  categories2 = [];
  categoryresp=[];
  topCategories;
  menuShow = false;
  ninetoys = false;
  ngOnInit() { 
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];

     
      if((this.host_name == "vendor.9toys.in"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.9toys.in"  && sessionStorage.getItem('previewFlag') == '1' ) ){
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.medialinks(this.comp_num_new);
        this.basicCompany(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);
      }else{
        this.adminservice
        .hostlink({ host_name: this.host_name })
        .subscribe(data => {
          if (data["status"] == 1) {
            if(data['result']['is_active']=='Y'){
              sessionStorage.setItem("comp_num_new", data["result"].comp_num);
              this.comp_num_new = data["result"].comp_num;
              console.log("compnew"+this.comp_num_new)
              this.medialinks(this.comp_num_new);
              this.basicCompany(this.comp_num_new);
              this.fetch_categories(this.comp_num_new)
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
  fetch_categories(dd){
    if(this.ninetoys==true){
      dd='0';
    }
    this.adminservice
    .fetch_categories({

      // this.adminService
    // .fetch_categories_ecom({//for ecom
      access_token: this.access_token,
      user_num: this.user_num,
      comp_num : dd
    })
    .subscribe(data => {
      if (data["status"] == 1) {
        this.categories = JSON.stringify(data["result"]);
        console.log(data["result"]+"home")
        this.categoryresp = data["result"];
        let size = this.categories.length;
        if (size > 4) {
          for (let n = 0; n < 3; n++) {
            this.more = true;
            this.categories2.push(this.categories[n]);
            console.log(this.categories2);
          }
          this.menuShow = true;
        } else {
          for (let n2 = 0; n2 < this.categories.length; n2++) {
            this.categories2.push(this.categories[n2]);
          }
        }

      } else if (data["status"] == 10) {
        sessionStorage.clear();
        this.snackbar.open(
          "Multiple login with this ID has been detected, Logging you out. ",
          "",
          {
            duration: 3000,
            horizontalPosition: "center"
          }
        );
        // this.router.navigate(['/Admin/login']);
      } else if (data["status"] == 0) {
      }
    });


  }
  previewFlag = sessionStorage.getItem('previewFlag');
  megaMenu = false;
  navigateCategory(name, id) {

    this.adminservice
      .fetch_product_list_check({
        comp_num: sessionStorage.getItem("comp_num"),
        brand_id: id
      })
      .subscribe(data => {
        if (data["status"] == 1) {
     

    let slug =
      name.replace(/\s+/g, "-") +
      "-?category_no=" +
      id +
      "&marketplace=ECOMTRAILS";

    window.scroll(0, 0);
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/shop", slug]));
    }else{
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/shop", slug]));

    }
          
        }  else if (data["status"] == 0) {
           this.snackbar.open(
            "No Products Found. ",
            "",
            {
              duration: 3000,
              horizontalPosition: "center"
            }
          );
        }
      });
    
   
    
  
    this.megaMenu = false;
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
