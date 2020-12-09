import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";
import {NinetoysserviceService} from  '../../ninetoysservice.service'
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { UserService } from "../../_services/user.service";
@Component({
  selector: 'mg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  newproduct;
  shows=false;
  count=sessionStorage.getItem('cart_count');
  cartTotal: Number;
  loader;
  visible="false";
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  username = sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  nm;
  public showsearch =false;
  public showsearchr =false;
  searchFocus = false;
  megaMenu = false;
  public isLoggedIn = false;
  public isLoginEmpty;
  public isLoginFull;
  public isLoggedOut;
  public is_logged_in = false;
  public is_logged_out = false;
  flag = localStorage.getItem("flag");
  flag1 = localStorage.getItem("flag1");
  cart;
  public secondcategory =false;
  public mobilelistorder=false;
  visibleIndex = -1; 
  categories;
  brands=[];
  slice;
  stockCheck;
  is_estimate=false;
  public sidenav =false;
  public sidenav1 =false;
  more = false;
  public visibleIndexw =false;
  categories2 = [];
  categoryresp=[];
  topCategories;
  menuShow = false;
  isShow: boolean;
  alreadyCart=false;
  alreadyCartStock=false;
 // topCategories;
  public sellingDiscount=false;
  //categories;
  notbuy=true;
  //categories2 = [];
 // more = false;
  topPosToStartShowing = 100;
 // megaMenu = false;
  banner = false;
  shipping='0';
  rentShow  = false;
  offsetNew=1;
  stockcheck;
  rating_option=true;
  page_itemsNew=6;
  total_entity;
  c;
  pagesNew=1;
  ratebuy;
qty_set;
   offsetSelling=1;
   pagesSelling=1;
  page_itemsSelling=6;

   offsetRent=1;
  page_itemsRent=6;
  pagesRent=1;

   offsetDisc=1;
  page_itemsDisc=6;
  pagesDisc=1;
  bannerData1;
  public searchList: any = {
    category: [],
    brand: [""],

    product: null
  };
  isUserLoggedIn: boolean;
  previewFlag = sessionStorage.getItem('previewFlag');

  constructor(
    private router: Router,
    private adminService: NinetoysserviceService,
    private snackbar: MatSnackBar,
    private dataSharingService: UserService,
    private cookie: CookieService,
    public cartService: CartService,  
  ) {
    // this.fetchCartCount2();
    // this.cart = this.adminService.updateCartCount();
  this.adminService.cartCount
    .subscribe(
      (data)=>{
        this.cart = data
      }
    )
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    //  adminService.cartCount$.subscribe(data => {
    //   this.fetchCartCount2();
    // });
  }
  
  tag = false;
  notag = true;
  host_name;
  companydata;
  comp_num_new;
  tagline;
  public preview = false;
  public nopreview = false;
  
  
  hostd;
  ecomtrails = false;
  ninetoys = false;
  serverlink;
  ngOnInit() {
    if (!this.user_num && !this.access_token) {
      this.is_logged_out = true;
      this.is_logged_in = false;
    } else {
      this.is_logged_in = true;
      this.is_logged_out = false;
    }
    this.header(1);
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];
    let serv = this.host_name;
    var s = serv.split(".");
    this.serverlink = s[1];
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
   // let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];

    
      if((this.host_name == "vendor.9toys.in"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.9toys.in"  && sessionStorage.getItem('previewFlag') == '1' ) ){
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.medialinks(this.comp_num_new);
        this.basicCompany(this.comp_num_new);

      }else{
        this.adminService
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
      this.getCart();
   
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
     //    this.adminService
     //      .get_host_link({
     //      comp_num : 0
     //      })
     //      .subscribe(datan => {
     //        if(datan['status']==1){
     //          var h= JSON.parse(datan['result']['value']);
     //           this.serverlink=h['host_link'];
     //        }

     //    })

     // if(this.serverlink == 'ecomtrails'){
     //    this.ecomtrails = true;
     //  }else if(this.serverlink == '9toys'){
     //    this.ninetoys = true;
     //  }else{
     //    this.ecomtrails = true;

     //  }
          
    // if(this.ecomtrails == true){
    //   this.adminService
    //   .fetchBrandsEcom({//for ecom
    //    // .fetchBrands({
    //       // access_token: this.access_token,user_num: this.user_num
    //       comp_num : this.comp_num_new 
    //     })
    //     .subscribe(
    //       data => {
    //         if (data["status"] == 1) {
    //           this.brands = data['result'];
  
    //         } else if (data["status"] == 10) {
              
    //         } else {
    //         }
    //       },
    //       error => {
    //         // this.loading = false;
    //       }
    //     );
    //   }
    //   else{
    //      this.adminService
    //   // .FetchBrandEcom({//for ecom
    //    .fetchBrands({
    //       // access_token: this.access_token,user_num: this.user_num
    //       comp_num : 0
    //     })
    //     .subscribe(
    //       data => {
    //         if (data["status"] == 1) {
    //           this.brands = data['result'];
  
    //         } else if (data["status"] == 10) {
              
    //         } else {
    //         }
    //       },
    //       error => {
    //         // this.loading = false;
    //       }
    //     );
    //   }


      if( (this.host_name == "vendor.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) ){
        this.ecomtrails = true;
        this.ninetoys = false;
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.adminService
          .get_host_link_of_comapny({
          comp_num : this.comp_num_new
          })
          .subscribe(datan => {
            if(datan['status']==1){
              this.hostd = datan['result'];
            }

        })
        this.basicCompany(this.comp_num_new);
        this.compTagline(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);        
        if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
          this.fetchCartCount(this.comp_num_new);
        } else {
          this.fetchWithoutLoginCartCOunt(this.comp_num_new);
        }
        this.brandFetch(this.comp_num_new);
        this.preview = true;
       

      }
      else if((this.host_name == "vendor.9toys.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.9toys.in"  && sessionStorage.getItem('previewFlag') == '1')){
        this.ninetoys = true;
        this.ecomtrails = false;
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.adminService
          .get_host_link_of_comapny({
          comp_num : this.comp_num_new
          })
          .subscribe(datan => {
            if(datan['status']==1){
              this.hostd = datan['result'];
            }

        })
        this.basicCompany(this.comp_num_new);
        this.compTagline(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);        
        if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
          this.fetchCartCount(this.comp_num_new);
        } else {
          this.fetchWithoutLoginCartCOunt(this.comp_num_new);
        }
        this.preview = true;
        this.brandFetch(this.comp_num_new);
       
      }
      else{
       
        this.adminService
        .hostlink({ host_name: this.host_name })
        .subscribe(data => {
          if (data["status"] == 1) {
            if (data["result"].comp_num == "01"){

                this.router.navigate(["/Admin"]);              
            } else {
              if (data["result"].is_active == "Y") {
                if(this.serverlink == 'ecomtrails'){
                  this.ecomtrails = true;
                }else if(this.serverlink == '9toys'){
                  this.ninetoys = true;
                }else{
                  this.ecomtrails = true;
                  // this.ninetoys = true;

                }
                this.nopreview = true;
                if (this.host_name == data["result"].host_name) {

                  this.comp_num_new = data["result"].comp_num;
                  sessionStorage.setItem(
                    "comp_num_new",
                    data["result"].comp_num
                  );
                  this.basicCompany(this.comp_num_new);
                  this.compTagline(this.comp_num_new);
                  this.fetch_categories(this.comp_num_new);
                  // this.userProfile(this.comp_num_new);
                  if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
                    this.fetchCartCount(this.comp_num_new);
                  } else {
                    this.fetchWithoutLoginCartCOunt(this.comp_num_new);
                  }
                   this.brandFetch(this.comp_num_new);
       
                } else {
                  this.router.navigate(["/404-page-not-found"]);
                }
              } else {
                this.router.navigate(["/page-not-working"]);
              }
            }
          } else {
            sessionStorage.setItem("not-found", "1");
            this.router.navigate(["404-page-not-found"]);
          }
        });

      }
      

      
    // }
    if (!this.user_num && !this.access_token) {
      this.is_logged_out = true;
      this.is_logged_in = false;
    } else {
      this.is_logged_in = true;
      this.is_logged_out = false;
    }
  }
  fetch_categories(dd){
    if(this.ninetoys==true){
      dd='0';
    }
    this.adminService
    .fetch_categories({

      // this.adminService
    // .fetch_categories_ecom({//for ecom
      access_token: this.access_token,
      user_num: this.user_num,
      comp_num : dd
    })
    .subscribe(data => {
      if (data["status"] == 1) {
        this.categories = data["result"];
        console.log(this.categories)
        console.log(data["result"])
        this.categoryresp = data["result"];
        let size = this.categories.length;
        if (size > 4) {
          for (let n = 0; n < 3; n++) {
            this.more = true;
            this.categories2.push(this.categories[n]);
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
  newProduct(dd) {
    this.adminService
      .newProducts({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd,
         offset: this.offsetNew,
         page_items:this.page_itemsNew
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.newproduct = data["result"];
          this.pagesNew=data["pages"];
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
          // this.snackbar.open("Failed. ", "", {
          //   duration: 3000,
          //   horizontalPosition: "center"
          // });
        }
      });
  }
  allCategoryProductCount(dd) {
    this.adminService
      .allCategoryProductCount({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.topCategories = data["result"];
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

  fetchWithoutLoginCartCOunt(dd) {
    var quotes = this.cookie.get("product_id2");
    var d = quotes.replace(/%2C/g, ",");
    var d1 = d.split(",");

    var dn = quotes.replace(/,""/g, "");
    var postData2 = { product_no: "", comp_num: "" };
    postData2.product_no = dn;
    postData2.comp_num = dd;
    this.adminService.fethcProductWishlist(postData2).subscribe(data => {
      if (data["status"] == "1") {
        this.cart = data["wishlist"].length;
      } else {
        this.cart = "0";
      }
    });
  }
  fetchCartCount(dd) {
    var postData = { user_num: "", access_token: "", comp_num: "" };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.comp_num = dd;
    if (postData.user_num != "" || postData.access_token != "") {
      this.adminService.fetchCart(postData).subscribe(data => {

        if (data["status"] == "1") {
          this.cart = data["cart"].cart_inventory.length;
        } else if ((data["status"] = "10")) {
          this.cart = "0";
        }
      });
    } else {
      this.snackbar.open("Please Login First.", "", {
        duration: 2000
      });
    }
  }
  
  compTagline(dd) {
    this.adminService
      .fetch_company_tagline({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          // var d = data["data"][0];
          // this.tagline = JSON.parse(d.value);
          this.tagline = data["data"].value;
          this.tag = true;
          this.notag = false;
        } else if (data["status"] == 0) {
          this.tag = false;
          this.notag = true;
        }
      });
  }
  basiccompany(dd) {
    this.adminService
      .getCompnyBasicDetail({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.companydata = data["data"];
          if (this.access_token && this.user_num) {
            if (dd == sessionStorage.getItem("comp_num")) {
              this.nm = this.companydata.receiver_name;
            } else {
              this.adminService
                .get_profile({
                  access_token: this.access_token,
                  user_num: this.user_num,
                  comp_num: dd
                })
                .subscribe(data => {
                  if (data["status"] == 1) {
                    this.nm = data["result"].name;
                  }
                });
            }
          }
        } else if (data["status"] == 0) {
        }
      });
  }
 
  logout() {
    var res = confirm("Are you sure you want to Logout.");
   if(res){
   localStorage.setItem("flag1", "0");
   sessionStorage.clear();
   this.visible="true";
      sessionStorage.setItem('visible',this.visible)
   var rtoken = sessionStorage.getItem('noti_token');
   var topic = "user_"+sessionStorage.getItem('user_num');
   
   
   this.adminService.unsubscribe_topic({topic_name : topic , token : rtoken}).subscribe(data =>{
     if(data['status']=='1'){
      
    
       console.log("topic unsubscribed successfully")

     }else{
       console.log("topic not unsubscribed")
     }
   })
   this.ngOnInit()
   // location.reload();
   window.location.reload();
   this.router.navigate([""]);
   this.reloadPage();
 }
 }
  /*logout() {
    localStorage.setItem("flag1", "0");
    sessionStorage.clear();
    var rtoken = sessionStorage.getItem('noti_token');
    var topic = "user_"+sessionStorage.getItem('user_num');
    
    
    this.adminService.unsubscribe_topic({topic_name : topic , token : rtoken}).subscribe(data =>{
      if(data['status']=='1'){
        this.visible="true";
        sessionStorage.setItem('visible',this.visible)
        console.log("topic unsubscribed successfully")

      }else{
        console.log("topic not unsubscribed")
      }
    })
    // location.reload();
    this.router.navigate([""]);
  }
  */
  redirectTo(url: string) {
    throw new Error("Method not implemented.");
  }
  search(keys) {
    let postData = { keys: keys, comp_num: "" };
    postData.comp_num = sessionStorage.getItem("comp_num_new");
    if(this.ninetoys==true){
      postData.comp_num ='0';
    }
  //    if(this.serverlink == 'ecomtrails'){
  //   this.adminService.searching_ecom(postData).subscribe(
  //     data => {
  //       this.searchList = data;
  //       // this.searchList = data;
  //       this.adminService.changeProductList(this.searchList.Product);
  //     },
  //     error => {
  //     }
  //   );
  // }
  // else{
     this.adminService.search(postData).subscribe(
      data => {
        this.searchList = data;
        // this.searchList = data;
        this.adminService.changeProductList(this.searchList.Product);
      },
      error => {
      }
    );
  // }
  }
  getSlug(name: string, id, slug): string {
    
    return slug;
  }
  navigateCategory(name, id) {

    this.adminService
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
  navigateBrand(name, id) {

    this.adminService
      .fetch_product_list_check({
        comp_num: sessionStorage.getItem("comp_num"),
        brand_id: id
      })
      .subscribe(data => {
        if (data["status"] == 1) {
     let slug =
      name.replace(/\s+/g, "-") +
      "-?brand_id=" +
      id +
      "&marketplace=ECOMTRAILS";

    // let slug = name.replace(/\s/, "-") + "-?" + id;
    window.scroll(0, 0);
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/shop", "brand", slug]));
    }else{
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/shop", "brand", slug]));
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
    
   
    // this.router.navigate(['/category', id]);
    
    this.megaMenu = false;
  }
  showsearchbar(){
this.showsearch = !this.showsearch;
  }
  showsearchbarr(){
    this.showsearch = false; 
      }
  seecategory(){
    this.secondcategory = !this.secondcategory;
  }

  hidecategory(){
    this.secondcategory = false;

    
  }

  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  showlist(){
    this.mobilelistorder= !this.mobilelistorder;
  }
  openNav() {
    document.getElementById("mySidenav").style.left = "0";
   
    this.sidenav = true;
  }

  closeNav() {
    document.getElementById("mySidenav").style.left = "-90%";
    document.body.style.backgroundColor = "white";
    this.sidenav = false;
  }


  openNav1() {
    document.getElementById("mySidenav1").style.right = "0";

    this.sidenav1 = true;
  }

  closeNav1() {
    document.getElementById("mySidenav1").style.right = "-90%";
    document.body.style.backgroundColor = "white";
    this.sidenav1 = false;
  }
  reloadPage() {
    window.location.reload();
 }

  doesExist(val) {
    return val != '';
  }
  getbrandImage(image):string{
    return this.adminService.getbrandImage(image);
  }
  brandFetch(dd){
    if(this.ecomtrails == true){
      this.adminService
      .fetchBrandsEcom({//for ecom
       // .fetchBrands({
          // access_token: this.access_token,user_num: this.user_num
          comp_num : dd
        })
        .subscribe(
          data => {
            if (data["status"] == 1) {
              this.brands = data['result'];
  
            } else if (data["status"] == 10) {
              
            } else {
            }
          },
          error => {
            // this.loading = false;
          }
        );
      }
      else{
         this.adminService
      // .FetchBrandEcom({//for ecom
       .fetchBrands({
          // access_token: this.access_token,user_num: this.user_num
          comp_num : 0
        })
        .subscribe(
          data => {
            if (data["status"] == 1) {
              this.brands = data['result'];
  
            } else if (data["status"] == 10) {
              
            } else {
            }
          },
          error => {
          }
        );
      }

  }



  //comp_num_new = sessionStorage.getItem("comp_num_new");
  //host_name;
  compd;
  


  data;
  medialinks(dd) {
    this.adminService
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
    this.adminService
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
 
  getCart() {
    this.isLoggedOut = false;
    this.loader = false;
    var postData ={ user_num: "", access_token: "", comp_num: "" };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.comp_num = sessionStorage.getItem("comp_num_new");
    if (postData.user_num != "" || postData.access_token != "") {
      this.adminService.fetchCart(postData).subscribe(data => {
        //
        if (data["status"] == "1") {
          this.isLoggedIn = true;
          this.isLoggedOut = false;
          this.isLoginFull = true;
          this.cart = data["cart"];
          this.total_entity=data['total_entity'];
          this.c = this.cart.cart_inventory;
          for(let check =0;check<this.c.length;check++){
            if(this.c[check].product.txn_quantity < '1' || this.c[check].product.txn_quantity < 1){
              this.stockCheck =true;
            }
           
             
            
            var rate_type_actual=this.c[check].rate_type;
            this.cart.cart_inventory[check].rate_type_actual=rate_type_actual;
             // estimate_time_delivery24/08/2020
            if(this.is_estimate==true){
           //  this.otpForm.get("weight").setValue(this.c[check].product.final_weight);
            //  this.estimate_time_delivery();
            }
            
          }

          this.loader = true;
        } else if (data["status"] == "10") {
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/login"]));
            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/login"]));

            }

          }else{
            this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/login"]));

          }
          
        } else {
          this.isLoggedIn = true;
          this.isLoginEmpty = true;
          this.loader = true;
          
          if (sessionStorage.getItem("access_token") == "") {
            if(this.previewFlag == '1'){
               if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4200")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/login"]));
                }else{
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/login"]));
      
                }
  
            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/login"]));
  
            }
          }
        }
      });
    } else {
      this.snackbar.open("Please Login First.", "", {
        duration: 2000
      });
    }
  }
header(data:number){
 console.log("header")
 setTimeout(function (){
  document.getElementById("nav1").style.top="-70px"
    },700)
  let prevScrollpos = window.pageYOffset;
 // console.log(prevScrollpos)
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
   // console.log(currentScrollPos)
  
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("nav1").style.top = "-70px";
      document.getElementById("nav2").style.top="0";
      
    } else {
      document.getElementById("nav1").style.top = "0";
     
      document.getElementById("nav2").style.top="-100px";
    }
  /* if(currentScrollPos==0){
     document.getElementById("nav2").style.top="0";
     document.getElementById("nav1").style.top="-70px"   
   }else{
     document.getElementById("nav2").style.top="-100px";
     document.getElementById("nav1").style.top="0";
   }*/
    prevScrollpos = currentScrollPos;
    if(prevScrollpos==0){
      document.getElementById("nav2").style.top="0";
      document.getElementById("nav1").style.top="-70px"   
    }else{
      document.getElementById("nav2").style.top="-100px";
      document.getElementById("nav1").style.top="0";
      this.shows=true;
    }
    
  } 
}
}
