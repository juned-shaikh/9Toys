import {BrowserModule,} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductComponent} from './components/product/product.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';

import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService} from './_services';
import  {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

import {NgxSpinnerModule} from "ngx-spinner";

import { WishlistComponent } from './components/wishlist/wishlist.component';

import {MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NewCartComponent } from './components/new-cart/new-cart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NewCheckoutComponent } from './components/new-checkout/new-checkout.component';
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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    ThankyouComponent,
    WishlistComponent,
    NewCartComponent,
    NewCheckoutComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    NgxSpinnerModule,
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
MatProgressBarModule


  ],
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
