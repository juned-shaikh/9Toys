import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, serverResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {NinetoysserviceService} from '../../ninetoysservice.service'
import {MatSnackBar, SimpleSnackBar} from '@angular/material/snack-bar'
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'mg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];
  userC = false;
  newproduct;
  cartTotal: Number;
  topSelling;
  ninetoys = false;
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  username = sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  nm;
  public showsearch =false;
  public showsearchr =false;
  searchFocus = false;
  megaMenu = false;
  bannerdata;
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
  rating_option=true;
  page_itemsNew=6;
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
   comp_num_new;
  previewFlag = sessionStorage.getItem('previewFlag');
  constructor(private productService: ProductService,
              private cartService: CartService,
              private router:Router,
              private adminService:NinetoysserviceService,
              public snackbar: MatSnackBar,private cookie:CookieService) {
  }

  ngOnInit() {
    this.productService.getAllProducts(8).subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      console.log(this.products);
    });
    this.comp_num_new = sessionStorage.getItem('comp_num_new');
    this.newProduct(this.comp_num_new);
    this.bannerImage(this.comp_num_new);
    this.topSellingProducts(this.comp_num_new);
this.fetch_categories(this.comp_num_new)
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
        this.categories =  JSON.stringify(data["result"]);
        console.log(data["result"]+"home")
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
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/shop", slug]));
    }else{
      this.router
      .navigateByUrl("/RefreshComponent", {
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

  navigation(nav,type,id){
    if(type=="brand"){
       let slug =
      nav.replace(/\s+/g, "-") +
      "-?brand_id=" +
      id +
      "&marketplace=ECOMTRAILS";
     
      if(this.previewFlag == '1'){
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/Admin/preview/shop/brand", nav]));
        }else{
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/shop/brand", nav]));

        }
      // this.router.navigate(["/shop", nav]);
    }
    else if(type=="category"){
       let slug = nav.replace(/\s+/g, '-') + "-?category_no=" + id  + "&marketplace=ECOMTRAILS";
      if(this.previewFlag == '1'){
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/shop", slug]));
        }else{
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/shop", slug]));

        }
      // this.router.navigate(["/shop", nav]);
    }
    else{
       let slug = nav.replace(/\s+/g, '-') + "-?product_no=" + id  + "&marketplace=ECOMTRAILS";
      // name.replace(/\s+/g, "-")+"-?product_no="+id+"?marketplace=ECOMTRAILS
        if(this.previewFlag == '1'){
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/Admin/preview/product", slug]));
        }else{
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/product", slug]));

        }
    }
  }


    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() => this.router.navigate(["/product", slug]));
  
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
  createRange2(number) {
    var items2: number[] = [];
    for (var i = 1; i <= number; i++) {
      items2.push(i);
    }
    return items2;
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
          console.log(this.newproduct);
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
  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }
  view_product(name, id,slug,quick) {
    if(quick=='N'){
     let re=" ";
     // name.replace(re,"-");
    // let slug = name.replace(/\s+/g, '-') + "-?product_no=" + id  + "&marketplace=ECOMTRAILS";
    if(this.previewFlag == '1'){
      const currentRoute = this.router.url;
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => 
      this.router.navigate(["/Admin/preview/view-product", slug]));
    } else{
      const currentRoute = this.router.url;
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => 
      this.router.navigate(["/view-product", slug]));

    }
  }
  
  

    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() => this.router.navigate(["/product", slug]));
  }
  getImage(image): string {
    return this.adminService.getImage(image);
  }
  getThumbnail1(thumbnail1): string {
    return this.adminService.getThumbnail1(thumbnail1);
  }
  getThumbnail2(thumbnail2): string {
    return this.adminService.getThumbnail2(thumbnail2);
  }

  getGalleryImage(image): string {
    return this.adminService.getGalleryImage(image);
  }
  getGalleryThumbnail1(thumbnail1): string {
    return this.adminService.getGalleryThumbnail1(thumbnail1);
  }
  getGalleryThumbnail2(thumbnail2): string {
    return this.adminService.getGalleryThumbnail2(thumbnail2);
  }
  bannerImage(dd) {
    this.adminService
      .fetch_banner_image({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.bannerdata = data["data"];
         // this.bannerData1=data['data'].value
         console.log(this.bannerdata)
          console.log(data['data'])
          this.banner = true;
        } else if (data["status"] == 0) {
          this.banner = false;
        }
      });
  }
  topSellingProducts(dd) {
    this.adminService
      .topSellingProducts({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd,
         offset: this.offsetSelling,
         page_items:this.page_itemsSelling
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.topSelling = data["result"];
          console.log(this.topSelling)
          this.pagesSelling=data["pages"];
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
        } else if (data["status"] == 0) {
          // this.snackbar.open("Failed. ", "", {
          //   duration: 3000,
          //   horizontalPosition: "center"
          // });
        }
      });
  }
  addToWishlist(product) {
    var postData = { product_no: "", access_token: "", user_num: "" ,comp_num:sessionStorage.getItem("comp_num_new")};
    postData.product_no = product.product_no;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");
    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      this.snackbar.open("Please Login To Add product in Wishlist", "", {
        duration: 1000
      });
      if(this.previewFlag == '1'){
        this.router.navigate(["/login"]);
      }else{
        this.router.navigate(["/login"]);

      }
      
    } else {
      if (product.is_wishlist == "True") {
        this.snackbar.open("Already Exists in Wishlist", "", {
          duration: 1000
        });
      } else {
        this.adminService.addWishlist(postData).subscribe(data => {
          if (data["status"] == 1) {
            this.ngOnInit();
            // alert('Added to Wishlist');
            this.snackbar.open("Added to Wishlist", "", {
              duration: 1000
            });
            
          } else if (data["status"] == 0) {
            this.snackbar.open("Already Added", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }

  count=0;
  addToCart(product) {

 var detail = product;
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
       comp_num:sessionStorage.getItem("comp_num_new"),
      rate_type: "",
      qty: 1
    };
    postData.product_no = product.product_no;
    if (product.rate[0].is_rent != "2") {
      postData.rate_type = product.rate[0].rate_type;
    } else {
      postData.rate_type = product.rate[1].rate_type;
    }

    // postData.rate_type=product.rate[0].rate_type;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");

    if (
      (sessionStorage.getItem("user_num") == "" &&
        sessionStorage.getItem("access_token") == "") ||
      (sessionStorage.getItem("user_num") == null &&
        sessionStorage.getItem("access_token") == null)
    ) {
       this.alreadyCart=false;
     this.alreadyCartStock=false;

      if(this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != ''){
        var getCookie=this.cookie.get("product_id2");
         var strings = getCookie.replace('%2C',',');

         var getCookieQ=this.cookie.get("quantity");
         var stringsQ = getCookieQ.replace('%2C',',');
         // let stringToSplit = "abc def ghi";
         var strings2=strings.split(",");
         var strings2Q=stringsQ.split(",");
         for(let gg=0;gg<strings2.length;gg++){
              strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");
// myStringWithCommas.split(/\s*,\s*/).forEach(function(myString) {
// });
this.count=gg+1;
 strings2Q[gg] = strings2Q[gg].replace(/^\s*/, "").replace(/\s*$/, "");
              if(strings2[gg] == product.product_no){
                   this.alreadyCart=true;
                    if(parseInt(strings2Q[gg])>=parseInt(product.txn_quantity)){
                     this.alreadyCartStock=true;
                   }
                   else{
                   //console.log(strings2Q[gg]);
                 strings2Q[gg]= (parseInt(strings2Q[gg])+1).toString();
                   }
              }
         }
      }
       if(this.alreadyCart == true){
         if(this.alreadyCartStock == false){
         //console.log(strings2);
      //console.log(strings2Q);
      var k=null;
      for (var i = 0; i < strings2Q.length; i++) {
        //console.log(k);
        if(k==null){
           k=strings2Q[i];
       
        }
        else{
           k=k.concat(","+strings2Q[i]);
       
        }
       
      }
        //console.log(k);
      
        this.cookie.set('quantity',k);
        //console.log(this.cookie.get('quantity'));
         this.snackbar.open("This product already exist in cart,and quantity icreases by 1.", "", {
                duration: 5000
              });
          }
        else{
         this.snackbar.open("This product already exist in cart,and quantity reached the limit.", "", {
                duration: 5000
              });
        }

      }
      else{
      if (this.cookie.get("product_id2") == null || this.cookie.get("product_id2") == '') {
        var product_set = this.cookie.set("product_id2", product["product_no"]);
        this.qty_set=this.cookie.set("quantity", '1');
      } else if (this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != '') {
        var newId = product["product_no"];
        var quants="1";

        if (this.cookie.get("product_id2")) {
          product = this.cookie.get("product_id2");
          this.qty_set=this.cookie.get("quantity");
        } else {
          product = [];
        }
        var co_qty;
        co_qty=quants.concat(","+this.qty_set);
         this.cookie.set("quantity",co_qty);
        var co;
        co = newId.concat("," + product);
        //rate_type topPosToStartShowing
        if (
          !this.cookie.get("rate_type") ||
          this.cookie.get("rate_type") == null || this.cookie.get("rate_type")==''
        ) {
          if (detail.rate[0].is_rent != "2") {
            var product_set = this.cookie.set(
              "rate_type",
              detail.rate[0].rate_type
            );
          } else {
            var product_set = this.cookie.set(
              "rate_type",
              detail.rate[1].rate_type
            );
          }
          // var product_set = this.cookie.set("rate_type", detail.rate[0].rate_type);
        } else if (this.cookie.get("rate_type") != null && this.cookie.get("rate_type") != '') {
          if (detail.rate[0].is_rent != "2") {
            var newIdR = detail.rate[0].rate_type;
          } else {
            var newIdR = detail.rate[1].rate_type;
          }
          // var newIdR = detail.rate[0].rate_type;
          var productR;
          if (this.cookie.get("rate_type")) {
            productR = this.cookie.get("rate_type");
          } else {
            productR = [];
          }
          var coR;
          coR = newIdR.concat("," + productR);

          this.cookie.set("rate_type", coR);

        }
        //rate_type end

        this.cookie.set("product_id2", co);

        //start fetch product
          var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");
        var d1 = d.split(",");

        var dn = quotes.replace(/,""/g, "");
        //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty
        var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = dn;
        postData2['quantity']=dnQ;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");
        // this.adminservice.updateCartCount();
        this.adminService.fethcProductWishlist(postData2).subscribe(data => {
          if (data["status"] == "1") {
            // if (data["status"] == "1") {
            //   this.cart = data["wishlist"].length;
            // } else {
            //   this.cart = "0";
            // }
             this.count = data['wishlist'].length;
     this.adminService.cartCount.next(this.count);
     console.log(this.count)
   
             // this.adminservice.updateCartCount();
          }
        });
        //end fetch product
                    // this.adminservice.updateCartCount();
 // this.adminservice.updateCartCount();

        // location.reload();
        this.snackbar.open("Added to Cart successfully", "", {
          duration: 1000
        });
      }
    }
    } else {
      if (product.is_cart == "True") {
        this.snackbar.open("Already Exists in Cart", "", {
          duration: 1000
        });
      } else {
        this.adminService.addCart(postData).subscribe(data => {
          if (data["status"] == "1") {
     //          this.count = this.count+1;
     // this.adminservice.cartCount.next(this.count);
    // cart cunt start
            this.adminService.fetch_cart_count(postData).subscribe(data => {
              if (data["status"] == "1") {
                this.count = data['cart_count'];
                sessionStorage.setItem('cart_count',JSON.stringify(this.count))
                this.adminService.cartCount.next(this.count);
              }
            });
            // cart count end
               this.snackbar.open("Added to Cart", "", {
              duration: 1000
            });    
             // this.adminservice.updateCartCount();
this.ngOnInit();
           
            // this.adminservice.updateCartCount();
          } else if (data["status"] == "0") {
            this.snackbar.open("Already Exist in Cart", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }
}
