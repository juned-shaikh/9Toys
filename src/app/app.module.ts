import {BrowserModule,} from '@angular/platform-browser';
import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
// import {CartComponent} from './components/cart/cart.component';

 import {HttpClientModule} from "@angular/common/http";
// import {ProductComponent} from './components/product/product.component';
// import {ThankyouComponent} from './components/thankyou/thankyou.component';

import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule,NgModel} from "@angular/forms";
import {ToastrModule} from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService} from './_services';
import  {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';


import {FileSaver} from 'file-saver'

import { WishlistComponent } from './components/wishlist/wishlist.component';

import {MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NewCartComponent } from './components/new-cart/new-cart.component';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { LightboxModule } from "@ngx-gallery/lightbox";
import { GalleryModule } from "@ngx-gallery/core";
import { GallerizeModule } from '@ngx-gallery/gallerize';
import {ZoomComponent} from '../app/components/view-product/zoom.component'
import { PinchZoomModule } from 'ngx-pinch-zoom';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from '@angular/material/tabs'
import {MatRadioModule} from '@angular/material/radio'
// import {MatSelectModule} from '@angular/material/select';
import {CheckoutComponent} from './components/checkout/checkout.component'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
import {CheckoutStatusComponent} from './components/checkout-status/checkout-status.component'

import { CategoryPageComponent } from './components/category-page/category-page.component';
import {OurBrandComponent} from './components/our-brand/our-brand.component'
import {ToysComponent} from './components/toys/toys.component';
//import {WindowRefService} from './window-ref.service'
 // import { HeaderOneComponent } from './header-one/header-one.component';
 import {HomeProfileComponent} from './components/home-profile/home-profile.component'
 import {CustomerProfileComponent} from './components/customer-profile/customer-profile.component'
 import {OrderHistoryComponent} from './components/order-history/order-history.component'
 import {MatSortModule} from "@angular/material/sort"
 import{MatTableModule} from '@angular/material/table'
 import {SelectionModel} from '@angular/cdk/collections'
import {AccountInfoComponent} from './components/account-info/account-info.component'
import {OrderViewDetailsComponent} from './components/order-view-details/order-view-details.component'
import {MemberProfileComponent} from './components/member-profile/member-profile.component'
import {ClientaddressComponent} from './components/clientaddress/clientaddress.component';

import {NewHeaderComponent} from './components/new-header/new-header.component'
import {MatDividerModule} from '@angular/material/divider'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    // CartComponent,
   
    // ProductComponent,
    // ThankyouComponent,
    WishlistComponent,
    NewCartComponent,
  
    ViewProductComponent,
  
    CheckoutComponent,
    CheckoutStatusComponent
,
    ViewProductComponent,
    CategoryPageComponent,
    OurBrandComponent,
    ToysComponent,
    HomeProfileComponent,
    CustomerProfileComponent,
    MemberProfileComponent,
    AccountInfoComponent,
    OrderHistoryComponent,
    OrderViewDetailsComponent,
    ClientaddressComponent,
   
    NewHeaderComponent
    // HeaderOneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,

    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    MatIconModule,
   MatMenuModule,
   MatListModule,
   MatButtonModule,
   MatCardModule,
   MatExpansionModule,
   MatFormFieldModule, 
   MatListModule,
   MatMenuModule,
   MatSnackBarModule, 
   MatStepperModule,
   MatTooltipModule,
   MatInputModule,
   LightboxModule,
   GalleryModule,
   GallerizeModule,
   MatDialogModule,
   PinchZoomModule,
MatProgressBarModule, 
MatTabsModule,
MatRadioModule,
// MatSelectModule,
NgbModalModule,
MatSortModule,
MatTableModule,
MatDividerModule



  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ AlertService,
    AuthGuard,
    AuthenticationService,
    UserService,
   
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
