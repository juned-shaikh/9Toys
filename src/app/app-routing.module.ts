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
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
