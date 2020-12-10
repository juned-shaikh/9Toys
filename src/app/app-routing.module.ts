import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CartComponent} from "./components/cart/cart.component";

import {ProductComponent} from "./components/product/product.component";
import {ThankyouComponent} from "./components/thankyou/thankyou.component";
import {NewCartComponent} from "./components/new-cart/new-cart.component";

import {WishlistComponent} from "./components/wishlist/wishlist.component"
import {ViewProductComponent} from "./components/view-product/view-product.component"
import {CheckoutComponent} from './components/checkout/checkout.component'
import {CheckoutStatusComponent} from './components/checkout-status/checkout-status.component'
//import {CategoryPageComponent} from './components/category-page/category-page.component';
import {CategoryPageComponent} from "./components/category-page/category-page.component";
import {OurBrandComponent} from './components/our-brand/our-brand.component'
import {ToysComponent} from './components/toys/toys.component'
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import {CustomerProfileComponent} from './components/customer-profile/customer-profile.component'
import {OrderViewDetailsComponent} from './components/order-view-details/order-view-details.component'
import {OrderHistoryComponent} from './components/order-history/order-history.component'
import {ClientaddressComponent} from './components/clientaddress/clientaddress.component'
import {AccountInfoComponent} from './components/account-info/account-info.component'
import {MemberProfileComponent} from './components/member-profile/member-profile.component'
const routes: Routes = [

  {path: 'category-page', component:CategoryPageComponent },
   {path: 'category-page/:id1/:id', component:CategoryPageComponent },
   {path: 'category-page/:id', component:CategoryPageComponent },

  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
 
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path:"wishlist",
    component:WishlistComponent
  },{
    path:"new-cart",
    component:NewCartComponent
  },{
    path:"view-product/:id",
    component:ViewProductComponent
  },{
    path:"checkout",
    component:CheckoutComponent
  },{
    path:"checkout-status",
    component:CheckoutStatusComponent
  },{
    path:"our-brand",
    component:OurBrandComponent
  },
  { path: "shop/:id", 
     component:ToysComponent
    },
      { path: "shop/:id1/:id", 
      component:ToysComponent
 },{
   path:"My-Account",
   component:HomeProfileComponent,
   children:[
     {
       path:'',
       component:CustomerProfileComponent
     },
 {
   path:"customer-profile",
   component:CustomerProfileComponent
 },
 {
  path: "member-profile", component:MemberProfileComponent
},

//  {path : 'orders', 
//  loadChildren: () =>
//  import('./order/order.module').then(m => m.OrderModule)
// },
{
  path: "order-history",
 component:OrderHistoryComponent

},
{ path: "wishlist",
component:WishlistComponent
 },

{path: "manage-address", 
component:ClientaddressComponent

},
{path: "account-setting", 
component:AccountInfoComponent

},
{
path: "order-details/:id" ,
component:OrderViewDetailsComponent
},
   ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
