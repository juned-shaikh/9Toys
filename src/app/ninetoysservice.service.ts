import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
// import { timer ,Subject, Observable } from 'rxjs';
import { timer, Subject, Observable, BehaviorSubject } from "rxjs";
import { environment } from '../environments/environment';
@Injectable({
  providedIn: "root"
})
export class NinetoysserviceService {
  constructor(private https: HttpClient) {}
  private options = {
    headers: new HttpHeaders().set(
      "Authorization",
      sessionStorage.getItem("jwtoken")
    )
  };
  buy: boolean = false;
  baseUrl = environment.baseUrl;
 uploadUrlApi = environment.UploadUrl; 

  public cartCount = new Subject<any>();
  public loginUpdateSubject = new Subject<any>();
  loginUpdateObservable$ = this.loginUpdateSubject.asObservable();
  cartCount$ = this.cartCount.asObservable();

  private productSource = new BehaviorSubject({});
  currentList = this.productSource.asObservable();
  public cartShow = new Subject<any>();
  cartShow$ = this.cartShow.asObservable();
  //***************************BULK UPLOAD APIS **********************************************

  changeProductList(list) {
    this.productSource.next(list);
  }
  image_upload(data) {
    return this.https.post(this.baseUrl + "bulk/image_upload_portal", data);
  }
  download_excel(data) {
    return this.https.post(this.baseUrl + "bulk/download_excel", data);
  }
  upload_excel(data) {
    return this.https.post(this.baseUrl + "bulk/upload_products", data);
  }
  all_category(data) {
    return this.https.post(this.baseUrl + "bulk/all_category", data);
  }
  zip_upload_portal(data) {
    return this.https.post(this.baseUrl + "bulk/zip_upload_portal", data);
  }

  //***************************CLIENT SITE APIS **********************************************
  loginuser(data) {
    return this.https.post(
       // 'https://www.ecomtrails.com/ecom_api/index.php/registration/login' ,

      "http://ecom.9toys.in/ecom_api/index.php/registration/login",
      data
    );
  }
  
  //  loginuser(data){
  //     return this.https.post("http://localhost/ecomTrailsC/index.php/registration/login", data);
  // }
  fetch_product_list_check(data){
    return this.https.post(this.baseUrl + "user/fetch_product_list_check", data);
  }
  register(data) {
    return this.https.post(this.baseUrl + "registration/register", data);
  }
  forgotPassword(data){
        return this.https.post(this.baseUrl + "registration/forgotPassword", data);

  }
  // add_product_variation_images(data){
  //    return this.https.post(this.baseUrl + "admin/add_product_variation_images", data);

  // }
   add_product_variation_images(data){
     return this.https.post(this.baseUrl + "admin/add_product_variation_images2", data);
// 
  }
  add_product_variation(data){
     return this.https.post(this.baseUrl + "admin/add_product_variation2", data);

  }
  // add_product_variation(data){
  //    return this.https.post(this.baseUrl + "admin/add_product_variation", data);

  // }
  updateclientname(data){
  return this.https.post(this.baseUrl + "profile/update_profile", data);
  }

  hostlink(data) {
    return this.https.post(this.baseUrl + "user/get_host_details", data);
  }
  search(data) {
    return this.https.post(this.baseUrl + "user/searching", data);
  }
  searching_ecom(data){
        return this.https.post(this.baseUrl + "user/searching_ecom", data);

  }

  newProducts(data) {
    return this.https.post(this.baseUrl + "user/newProducts", data);
  }
  topSellingProducts(data) {
    return this.https.post(this.baseUrl + "user/topSellingProducts", data);
  }
  topDiscountProducts(data) {
    return this.https.post(this.baseUrl + "user/topDiscountProducts", data);
  }
  viewProduct(data) {
    return this.https.post(this.baseUrl + "user/fetch_product", data);
  }
  fetch_categories(data) {
    return this.https.post(this.baseUrl + "user/fetch_categories", data);
  }

  fetch_categories_ecom(data) {
    return this.https.post(this.baseUrl + "user/fetch_categories_ecom", data);
  }
  allCategoryProductCount(data) {
    return this.https.post(this.baseUrl + "user/allCategoryProductCount", data);
  }
  fetch_product_list(data) {
    return this.https.post(this.baseUrl + "user/fetch_product_list", data);
  }
  similar_product(data) {
    return this.https.post(this.baseUrl + "user/similar_product", data);
  }
  // ***********************//////////cart api ////////////********************************** */
  updateCartCount() {
    this.cartCount.next();
  }

  loginUpdate() {
    this.loginUpdateSubject.next();
  }
  fetch_user_product_reviews(data){
        return this.https.post(this.baseUrl + "user_log/fetch_user_product_reviews", data);

  }
  insertReview(data) {
    return this.https.post(this.baseUrl + "user_log/insert_reviews", data);
  }
  fetchReview(data) {
    return this.https.post(this.baseUrl + "user/fetch_reviews", data);
  }
  
  check_order_product(data) {
    return this.https.post(this.baseUrl + "user_log/check_order_product", data);
  }

  fetchCart(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_cart", data);
  }
  updateCart(data) {
    return this.https.post(this.baseUrl + "user_log/update_cart", data);
  }
  addCart(data) {
    return this.https.post(this.baseUrl + "user_log/insert_cart", data);
  }
  deleteCart(data) {
    return this.https.post(this.baseUrl + "user_log/delete_cart", data);
  }

  getParticularCart(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_cart", data);
  }
  fetch_cart_count(data){
        return this.https.post(this.baseUrl + "user_log/fetch_cart_count", data);

  }
  fetch_cart_specific(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_cart_specific", data);
  }
  fetchWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_wishlist", data);
  }
  // updateWishlist(data){
  //   return this.https.post(this.baseUrl + "user_log/delete_wishlist", data);

  // }
  addWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/insert_wishlist", data);
  }
  deleteWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/delete_wishlist", data);
  }

  paymentList(data) {
    return this.https.post(
      this.baseUrl + "user_log/fetch_payment_method",
      data
    );
  }
  fetch_payment_method_specific(data){
    return this.https.post(
      this.baseUrl + "admin/fetch_payment_method_specific",
      data
    );
  }
  fetch_courier_method_specific(data){
    return this.https.post(
      this.baseUrl + "admin/fetch_courier_method_specific",
      data
    );
  }
   paymentListAdmin(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_payment_method",
      data
    );
  }
   courierListAdmin(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_courier_method",
      data
    );
  }
checkUserExist(data) {
    return this.https.post(
      this.baseUrl + "company/checkUserExist",
      data
    );
  }
  

  //withoutloginscart and wishlist apis*****************************

  addToWishlistWL(data) {
    return this.https.post(this.baseUrl + "user_log/insert_wishlist_all", data);
  }

  addToCartWL(data) {
    return this.https.post(this.baseUrl + "user_log/insert_cart_all", data);
  }

  fethcProductWishlist(data) {
    return this.https.post(this.baseUrl + "user/fetch_product_wishlist", data);
  }

  fetchBrands(data) {
    return this.https.post(
      this.baseUrl + "user/fetch_brand_all_for_comp",
      data
    );
  }
  fetchBrandsEcom(data) {
    return this.https.post( 
      this.baseUrl + "user/fetch_brand_all_for_comp_ecom",
      data
    );
  }
  cancel_order_by_user(data){
    return this.https.post(this.baseUrl + "order_vendor/cancel_order_by_user", data);
    
    }
    update_return_initiate(data){
      return this.https.post(this.baseUrl + "order_vendor/update_return_initiate", data);
      
      }
      returnInitiate(data) {
      return this.https.post(this.baseUrl + "admin/return_initiate", data);
      }
      reason_dropdown(data){
        return this.https.post(this.baseUrl + "user_log/reason_dropdown", data);
        
        }      
  fetch_customer_registration(data){
    return this.https.post(this.baseUrl + "associates/fetch_customer_registration", data);

  }
  otpGenerate(data) {
    return this.https.post(this.baseUrl + "user/otpGenerate", data);
  }
  otpVerificationUser(data) {
    return this.https.post(this.baseUrl + "user/otpVerification", data);
  }
  resendOtpVerify(data) {
    return this.https.post(this.baseUrl + "user/resendOtpVerify", data);
  }
  shipyari_awb_track_lifecycle(data){
    return this.https.post(this.baseUrl + "user_log/shipyari_awb_track_lifecycle", data);
    
    }
    print_invoice(data){
      return this.https.post("https://bun.ecomtrails.com/get_invoice", data,{responseType: "blob",
      observe: "response"});
      
      }
  //**********************************ADMIN APIS*************************************************

  //login and registration apis
  estimate_time_delivery(data){
    return this.https.post(this.baseUrl + "user/estimate_time_delivery", data);

  }
  otpVerification(data) {
    return this.https.post(this.baseUrl + "company/otpVerification", data);
  }
  ResendOtpVerification(data) {
    return this.https.post(this.baseUrl + "company/resendOtp", data);
  }
  login(data) {
    return this.https.post(this.baseUrl + "registration/login", data);
  }
  registerVendor(data) {
    return this.https.post(this.baseUrl + "company/registerVendor", data);
  }
  ifsc_api(data) {
    return this.https.post(this.baseUrl + "company/ifsc_api", data);
  }
  pincode_api(data){
        return this.https.post(this.baseUrl + "company/pincode_api", data);

  }
  pincode_country_state_city_api(data){
        return this.https.post(this.baseUrl + "company/pincode_country_state_city_api", data);

  }
  check_brand_exist(data){
    return this.https.post(this.baseUrl + "admin/check_brand_exist", data);
  }
  fetch_brand_all(data) {
    return this.https.post(this.baseUrl + "admin/fetch_brand_all", data);
  }
  fetch_product_tax_all(data) {
    return this.https.post(this.baseUrl + "admin/fetch_product_tax_all", data);
  }

  fetch_category_all(data) {
    return this.https.post(this.baseUrl + "admin/fetch_category_all", data);
  }
  fetch_category_all_ecom(data) {
    return this.https.post(this.baseUrl + "admin/fetch_category_all_ecom", data);
  }
  addProduct(data) {
    return this.https.post(this.baseUrl + "admin/add_product", data);
  }
  quick_add_product(data) {
    return this.https.post(this.baseUrl + "quick_admin/quick_add_product", data);
  }
  quick_update_product(data) {
    return this.https.post(this.baseUrl + "quick_admin/quick_update_product", data);
  }
  fetch_quick_product(data) {
    return this.https.post(this.baseUrl + "quick_admin/fetch_quick_product", data);
  }
  add_product_categories(data) {
    return this.https.post(this.baseUrl + "admin/add_product_categories", data);
  }
  countProductActiveness(data){
        return this.https.post(this.baseUrl + "admin/countProductActiveness", data);

  }
  add_product_tags(data) {
    return this.https.post(this.baseUrl + "admin/add_product_tags", data);
  }
  add_product_rates(data) {
    return this.https.post(this.baseUrl + "admin/add_product_rates", data);
  }
  add_product_specifications(data) {
    return this.https.post(
      this.baseUrl + "admin/add_product_specifications",
      data
    );
  }
  fetch_all_comp_tags(data) {
    return this.https.post(this.baseUrl + "admin/fetch_all_comp_tags", data);
  }
  add_product_images(data) {
    return this.https.post(this.baseUrl + "admin/add_product_images", data);
  }
  fetch_product_rates_all(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_product_rates_all",
      data
    );
  }

  //endof login registration apis

  //additionofcompany apis
  displayIns(data) {
    return this.https.post(
      this.baseUrl + "company_details/insert_company_display_information",
      data
    );
  }
  domainInsert(data){
     return this.https.post(
      this.baseUrl + "company_details/insert_company_domain_info",
      data
    );
  }
  buisnessIns(data) {
    return this.https.post(
      this.baseUrl + "company_details/insert_company_buisness_information",
      data
    );
  }
  bankIns(data) {
    return this.https.post(
      this.baseUrl + "company_details/insert_company_bank_information",
      data
    );
  }
  RegAddressIns(data) {
    return this.https.post(
      this.baseUrl + "company_details/insert_company_register_address",
      data
    );
  }

  displayUpdate(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_display_information",
      data
    );
  }
  buisnessUpdate(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_buisness_information",
      data
    );
  }
  bankUpdate(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_bank_information",
      data
    );
  }
  RegAddressUpdate(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_register_address",
      data
    );
  }

  //endofadditonof company apis
  viewCompanyDetailsInfo(data) {
    return this.https.post(
      this.baseUrl + "company_details/viewCompanyDetailsInfo",
      data
    );
  }
  viewCompDetailsInfo(data) {
    return this.https.post(
      this.baseUrl + "company_details/viewCompDetailsInfo",
      data
    );
  }
  kyc_all(data) {
    return this.https.post(this.baseUrl + "company_details/kyc_all", data);
  }
  update_company_display_information(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_display_information",
      data
    );
  }
  update_company_register_address(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_register_address",
      data
    );
  }
  update_company_bank_information(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_bank_information",
      data
    );
  }
  update_company_buisness_information(data) {
    return this.https.post(
      this.baseUrl + "company_details/update_company_buisness_information",
      data
    );
  }

  //state citycountry fetch apis ///
  getState(data) {
    return this.https.post(this.baseUrl + "profile/get_state", data);
  }
  getCity(data) {
    return this.https.post(this.baseUrl + "profile/get_city", data);
  }
  getCountry(data) {
    return this.https.post(this.baseUrl + "profile/get_country", data);
  }
  //************* */endofstatcountrycityapis
  //****************** */controllerapis

  CompanyList(data) {
    return this.https.post(this.baseUrl + "controller/get_company_all", data);
  }
  get_company_all_with_kyc(data) {
    return this.https.post(
      this.baseUrl + "controller/get_company_all_with_kyc",
      data
    );
  }
  add_company_commission(data){
    return this.https.post(this.baseUrl + "controller/add_company_commission", data);

  }
  VerifyCompany(data) {
    return this.https.post(this.baseUrl + "controller/verify_company", data);
  }
  VerifyCompanyBuisness(data) {
    return this.https.post(
      this.baseUrl + "controller/verify_company_buisness2",
      data
    );
  }
  VerifyCompanyBank(data) {
    return this.https.post(
      this.baseUrl + "controller/verify_company_bank2",
      data
    );
  }
  VerifyCompanyKyc(data) {
    return this.https.post(
      this.baseUrl + "controller/verify_company_kyc2",
      data
    );
  }
  verify_product(data) {
    return this.https.post(this.baseUrl + "controller/verify_product", data);
  }
  deverify_product(data) {
    return this.https.post(this.baseUrl + "controller/deverify_product", data);
  }
  fetch_tax(data) {
    return this.https.post(this.baseUrl + "controller/fetch_tax", data);
  }

  delete_tax(data) {
    return this.https.post(this.baseUrl + "controller/delete_tax", data);
  }
   duplicateProduct(data) {
    return this.https.post(this.baseUrl + "admin/duplicate_product", data);
  }
  update_tax(data) {
    return this.https.post(this.baseUrl + "controller/update_tax", data);
  }
  insert_tax(data) {
    return this.https.post(this.baseUrl + "controller/insert_tax", data);
  }

  //***************end of controllers apis */

  // ********************brandsrelatedapis ***********************************
  AddBrand(data) {
    return this.https.post(this.baseUrl + "admin/insert_brand", data);
  }
  AddBrandEcom(data) {
    return this.https.post(this.baseUrl + "admin/insert_brand_ecom", data);
  }
  FetchBrand(data) {
    return this.https.post(this.baseUrl + "admin/fetch_brand_all", data);
  }
  FetchBrandEcom(data) {
    return this.https.post(this.baseUrl + "admin/fetch_brand_all_ecom", data);
  }
fetch_brand_with_name(data){
      return this.https.post(this.baseUrl + "admin/fetch_brand_with_name", data);

}
  UpdateBrand(data) {
    return this.https.post(this.baseUrl + "admin/update_brand", data);
  }
  delete_brand(data) {
    return this.https.post(this.baseUrl + "admin/delete_brand", data);
  }
  delete_brand2(data){
        return this.https.post(this.baseUrl + "admin/delete_brand2", data);

  }
  fetch_brand_all_only_comp(data){
        return this.https.post(this.baseUrl + "admin/fetch_brand_all_only_comp", data);

  }
  fetch_brand_all_only_comp_ecom(data){
        return this.https.post(this.baseUrl + "admin/fetch_brand_all_only_comp_ecom", data);

  }
  fetch_brand(data) {
    return this.https.post(this.baseUrl + "admin/fetch_brand", data);
  }

  //*********************************end of brands */
  //*****************Start tags

  insert_tags(data) {
    return this.https.post(this.baseUrl + "admin/insert_tags", data);
  }
  update_tags(data) {
    return this.https.post(this.baseUrl + "admin/update_tags", data);
  }
  fetch_comp_tags(data) {
    return this.https.post(this.baseUrl + "admin/fetch_comp_tags", data);
  }
  delete_comp_tags(data) {
    return this.https.post(this.baseUrl + "admin/delete_comp_tags", data);
  }
  //*****************END Tags
  //***************************start of admin products
  fetch_product_all_active_comp(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_product_all_active_comp",
      data
    );
  }

  fetch_product_all_inactive_comp(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_product_all_inactive_comp",
      data
    );
  }
  fetch_product_all_pending_comp(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_product_all_pending_comp",
      data
    );
  }
  outofstock_all_comp(data) {
    return this.https.post(this.baseUrl + "admin/outofstock_all_comp", data);
  }
  instock_all_comp(data) {
    return this.https.post(this.baseUrl + "admin/instock_all_comp", data);
  }
  deactivate_product(data) {
    return this.https.post(this.baseUrl + "admin/deactivate_product", data);
  }
  activate_product(data) {
    return this.https.post(this.baseUrl + "admin/activate_product", data);
  }
  deletedProduct(data) {
    return this.https.post(this.baseUrl + "admin/delete_product", data);
  }
  getProduct(data) {
    return this.https.post(this.baseUrl + "admin/fetch_product", data);
  }
  fetch_subcategory_all_new(data) {
    return this.https.post(this.baseUrl + "user/fetch_subcategory_all", data);
    // return this.https.post("http://localhost/9toys/index.php/user/fetch_subcategory_all", data);

  }
  fetch_subcategory_all(data) {
    return this.https.post(this.baseUrl + "admin/fetch_subcategory_all", data);

  }
  fetch_parent_all(data) {
    return this.https.post(this.baseUrl + "admin/fetch_parent_all", data);
  }

  fetch_subcategory_all_new_ecom(data) {
    return this.https.post(this.baseUrl + "user/fetch_subcategory_all_ecom", data);
    // return this.https.post("http://localhost/9toys/index.php/user/fetch_subcategory_all", data);

  }
  fetch_subcategory_all_ecom(data) {
    return this.https.post(this.baseUrl + "admin/fetch_subcategory_all_ecom", data);

  }
  fetch_parent_all_ecom(data) {
    return this.https.post(this.baseUrl + "admin/fetch_parent_all_ecom", data);
  }

  update_product(data) {
    return this.https.post(this.baseUrl + "admin/update_product", data);
  }
  update_product_categories(data) {
    return this.https.post(
      this.baseUrl + "admin/update_product_categories",
      data
    );
  }
  update_product_tags(data) {
    return this.https.post(this.baseUrl + "admin/update_product_tags", data);
  }
  update_product_rates(data) {
    return this.https.post(this.baseUrl + "admin/update_product_rates", data);
  }
  update_product_specifications(data) {
    return this.https.post(
      this.baseUrl + "admin/update_product_specifications",
      data
    );
  }

  update_product_images(data) {
    return this.https.post(this.baseUrl + "admin/update_product_images", data);
  }
  //*************************END oadmin product
  //***********admin category start
  insert_category(data) {
    return this.https.post(this.baseUrl + "admin/insert_category", data);
  }
  insert_category_ecom(data) {
    return this.https.post(this.baseUrl + "admin/insert_category_ecom", data);
  }
  update_category(data) {
    return this.https.post(this.baseUrl + "admin/update_category", data);
  }
  delete_category(data) {
    return this.https.post(this.baseUrl + "admin/delete_category", data);
  }
  // delete_category2(data){
  //   return this.https.post(this.baseUrl + "admin/delete_category2", data);
  // }
  delete_category2(data){
    return this.https.post(this.baseUrl + "admin/hide_show_category", data);
  }
  delete_category_array(data) {
    return this.https.post(this.baseUrl + "admin/delete_category_array", data);
  }
  //*************END CATEGORY ADMIN

  //function to get images////////////////////////////////
  getImage(image): string {
    return this.uploadUrlApi + "product/gallery/images/" + image;
  }
  getFile(image): string {
    return this.uploadUrlApi + image;
  }

  getThumbnail1(thumbnail1): string {
    return this.uploadUrlApi + "product/gallery/thumbnail1/" + thumbnail1;
  }
  getIcon(icon, id): string {
    return this.uploadUrlApi + "company_" + id + "/icon_image_link/" + icon;
  }
  getSignature(icon, id): string {
    return (
      this.uploadUrlApi + "company_" + id + "/signature_image_link/" + icon
    );
  }

  getThumbnail2(thumbnail2): string {
    return this.uploadUrlApi + "product/thumbnail2/" + thumbnail2;
  }
  getGalleryImage(image): string {
    return this.uploadUrlApi + "product/gallery/images/" + image;
  }
  getGalleryThumbnail1(thumbnail1): string {
    return this.uploadUrlApi + "product/gallery/thumbnail1/" + thumbnail1;
  }
  getGalleryThumbnail2(thumbnail2): string {
    return this.uploadUrlApi + "product/gallery/thumbnail2/" + thumbnail2;
  }

  getbrandImage(image): string {
    return this.uploadUrlApi + "brand/image_location/" + image;
  }
  // viewCompanyDetails(data){
  //   return this.https.post(this.baseUrl + "company_details/viewCompanyDetails", data);
  // }

  //end*****************************************

  // Aman Verma *********************
  userprofile(data) {
    return this.https.post(
      this.baseUrl + "company_details/viewCompanyDetails",
      data
    );
  }
  viewCompanyDetail(data) {
    return this.https.post(
      this.baseUrl + "company_details/viewCompanyDetail",
      data
    );
  }

  checkCompanyStatus(data) {
    return this.https.post(this.baseUrl + "company/checkCompany", data);
  }
  //Start checkout
  insertAddress(data) {
    return this.https.post(this.baseUrl + "profile/insert_address", data);
  }
  updateAddress(data) {
    return this.https.post(this.baseUrl + "profile/update_address", data);
  }
  fetchAddress(data) {
    return this.https.post(this.baseUrl + "profile/fetchAddresses", data);
  }
  getAddressSpecific(data) {
    return this.https.post(this.baseUrl + "profile/getAddressSpecific", data);
  }

  reset_password(data) {
    return this.https.post(this.baseUrl + "profile/resetPassword", data);
  }
  get_profile(data) {
    return this.https.post(this.baseUrl + "profile/get_profile", data);
  }
  removeAddress(data) {
    return this.https.post(this.baseUrl + "profile/deleteAddress", data);
  }
  removeFromWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/delete_wishlist", data);
  }
  payment(data) {
    return this.https.post(this.baseUrl + "user_log/payment", data);
  }
  transaction_of_orders_razorpay(data) {
    return this.https.post(
      this.baseUrl + "user/transaction_of_order_razor_pay",
      data
    );
  }
  transaction_of_order_payumony_web(data){
     return this.https.post(
      this.baseUrl + "user/transaction_of_order_payumony_web",
      data
    );
  }
  paymentMethod(data) {
    return this.https.post(
      this.baseUrl + "user_log/fetch_payment_method",
      data
    );
  }
  payment_status_check(data) {
    return this.https.post(this.baseUrl + "user/payment_status_check", data);
  }

  // **********************order vendor apis********************************
  getOrdersPlaced(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_placed", data);
  }
  getOrdersConfirmed(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_confirm", data);
  }
  getOrdersLabelGenerate(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_labelled", data);
  }
  getOrdersRtd(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_rtd", data);
  }
  getOrdersHandovers(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_handover", data);
  }
  getOrdersRts(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_orders_ready_to_ship",
      data
    );
  }
  getOrdersdelivered(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_deliver", data);
  }
  getOrderStatus(data) {
    return this.https.post(this.baseUrl + "admin/fetch_status", data);
  }
  updateOrderStatus(data) {
    return this.https.post(this.baseUrl + "admin/updateOrderStatus", data);
  }
  //  updateOrderStatus2(data) {
  //   return this.https.post(this.baseUrl + "admin/updateOrderStatus2", data);
  // }
   updateOrderStatus2(data) {
    return this.https.post(this.baseUrl + "admin/updateOrderStatus2", data);
  }

  GetOrderDetailArray(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_orders_array_details",
      data
    );
  }
  orderDetail(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_order_detail", data);
  }
  // orderDetail(data) {
  //   return this.https.post(this.baseUrl + "user_log/fetch_order_details", data);
  // }

  orderStatus(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_order_status_flow", data);
  }
  updateMultipleOrderStatus(data) {
    return this.https.post(
      this.baseUrl + "admin/status_orders_array_update",
      data
    );
  }
  // updateMultiOrdersCourier(data) {
  //   return this.https.post(
  //     this.baseUrl + "admin/status_orders_array_update2",
  //     data
  //   );
  // }
  updateMultiOrdersCourier(data) {
    return this.https.post(
      this.baseUrl + "admin/status_orders_array_update2",
      data
    );
  }

  // ***************************endorder vendore apis *********************

  //end checkout
  //start order
  getOrdersHistory(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_orders", data);
  }
  // getOrdersDetail(data) {
  //   return this.https.post(this.baseUrl + "user_log/fetch_order_details", data);
  // }
  getOrdersDetail(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_order_detail", data);
  }
  orderrejected(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_rejected", data);
  }
  ordercancelled(data) {
    return this.https.post(this.baseUrl + "admin/fetch_orders_cancelled", data);
  }
  fetch_order_status_flow(data){
        return this.https.post(this.baseUrl + "user_log/fetch_order_status_flow", data);

  }

  fetch_orders_placed(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_placed", data);
  }

  fetch_orders_rtd(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_rtd", data);
  }
  fetch_orders_handover(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_handover", data);
  }
  fetch_orders_ready_toship(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_ready_toship", data);
  }
  fetch_orders_labelled(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_labelled", data);
  }
  fetch_orders_deliver(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_deliver", data);
  }
  fetch_orders_rejected(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_rejected", data);
  }
  fetch_orders_cancelled(data){
    return this.https.post(this.baseUrl + "order_vendor/fetch_orders_cancelled", data);
  }


  
  

  //end order user

  addqtyUpdateProduct(data) {
    return this.https.post(this.baseUrl + "admin/addqtyUpdateProduct", data);
  }
  subtractqtyUpdateProduct(data) {
    return this.https.post(
      this.baseUrl + "admin/subtractqtyUpdateProduct",
      data
    );
  }

  // *************companysettingapis******************************
  getCompSetting(data) {
    return this.https.post(
      this.baseUrl + "company/fetch_company_registry",
      data
    );
  }
  fetch_categories_list(data){
     return this.https.post(
      this.baseUrl + "user/fetch_categories_list",
      data
    );
  }
  fetch_product_comp_list(data){
    return this.https.post(
      this.baseUrl + "user/fetch_product_comp_list",
      data
    );
  }
  getparticularCompSetting(data) {
    return this.https.post(
      this.baseUrl + "user/fetch_particular_company_registry",
      data
    );
  }
  // 24/08/2020
  fetch_particular_company_registry_with_sno(data){
    return this.https.post(
      this.baseUrl + "company/fetch_particular_company_registry_with_sno",
      data
    );
  }
  addCompanyRegistry(data) {
    return this.https.post(this.baseUrl + "company/add_company_registry", data);
  }

  bannerImageUpload(data) {
    return this.https.post(this.baseUrl + "admin/banner_image_upload", data);
  }

  getCompnyBasicDetail(data) {
    return this.https.post(
      this.baseUrl + "user/get_company_basic_details",
      data
    );
  }

  fetch_banner_image(data) {
    return this.https.post(this.baseUrl + "user/fetch_banner_images", data);
  }
  fetch_media_links(data){
    return this.https.post(this.baseUrl + "user/fetch_media_link", data);    
  }
  fetch_company_tagline(data){
    return this.https.post(this.baseUrl + "user/fetch_company_tagline", data);    
  }
  fetch_company_type(data){
    return this.https.post(this.baseUrl + "user/fetch_company_type", data);
  }

  publish_company(data){
    return this.https.post(this.baseUrl + "user/publish_company", data);
  }
  get_host_link_of_comapny(data){
    return this.https.post(this.baseUrl + "user/get_host_link_of_comapny", data);

  }
  get_host_link(data){
        return this.https.post(this.baseUrl + "user/get_host_link", data);

  }
  updateCompanyRegistry(data) {
    return this.https.post(this.baseUrl + "company/update_comp_registry", data);
  }
  checkHostDetails(data){
    return this.https.post(this.baseUrl + "company/check_host_name_exist", data);

    
  }

  fetchParticularUserReview(data){
    return this.https.post(this.baseUrl + "user_log/fetch_user_product_reviews", data);

    
  }
  fetch_users(data){
    return this.https.post(this.baseUrl + "admin/view_users", data);
  }

  add_user(data){
    return this.https.post(this.baseUrl + "admin/add_user", data);

  }
  delete_users(data){
    return this.https.post(this.baseUrl + "admin/delete_users", data);

  }
  companywiseLoginReport(data){
    return this.https.post(this.baseUrl + "controller/get_company_wise_login_report", data);
  }
  get_company_list(data){
    return this.https.post(this.baseUrl + "controller/get_company_list", data);

  }
  monthWiseSale(data){
    return this.https.post(this.baseUrl + "admin/year_month_wise_sell", data);

  }

  // start for reports
getPickupReport(data) {
    return this.https.post(
      this.baseUrl + "reports/getPickupReport",
      data,
      { responseType: "blob", observe: "response" }
    );
  }
  orderReport(data) {
    return this.https.post(
      this.baseUrl + "reports/orderReport",
      data,
      { responseType: "blob", observe: "response" }
    );
  }
  orderReturnReport(data) {
    return this.https.post(
      this.baseUrl + "reports/orderReturnReport",
      data,
      { responseType: "blob", observe: "response" }
    );
  }
  getSalesReport(data) {
    return this.https.post(
      this.baseUrl + "reports/getSalesReport",
      data,
      { responseType: "blob", observe: "response" }
    );
  }
  //end for reports

  //login by otp start
  otpSendForLogin(data){
    return this.https.post(this.baseUrl + "registration/otpSendForLogin", data);

  }

  resendOtpForLogin(data){
    return this.https.post(this.baseUrl + "registration/resendOtpForLogin", data);

  }
  otpVerificationForLogin(data){
        return this.https.post(this.baseUrl + "registration/otpVerificationForLogin", data);

  }
  //otp login end
  fetch_category_specific(data){
        return this.https.post(this.baseUrl + "admin/fetch_category_specific", data);

  }
  print_labels(data){
    return this.https.post(this.baseUrl + "admin/print_labels", data);

  }
  print_menifests(data){
    return this.https.post(this.baseUrl + "admin/print_menifests", data);

  }

  //start coupen
   add_coupon(data) {
    return this.https.post(this.baseUrl + "admin/add_coupon", data);
  }
   fetch_coupons(data) {
    return this.https.post(this.baseUrl + "admin/fetch_coupons", data);
  }
  delete_coupon(data) {
    return this.https.post(this.baseUrl + "admin/delete_coupon", data);
  }
  update_coupon(data) {
    return this.https.post(this.baseUrl + "admin/update_coupon", data);
  }
  fetch_coupons_list_upcoming(data){
    return this.https.post(this.baseUrl + "admin/fetch_coupons_list_upcoming", data);
  }

  fetch_coupons_list_expire(data){
    return this.https.post(this.baseUrl + "admin/fetch_coupons_list_expire", data);
  }
  fetch_coupons_list_current(data){
    return this.https.post(this.baseUrl + "admin/fetch_coupons_list_current", data);
  }
  fetch_specific_coupon(data){
    return this.https.post(this.baseUrl + "admin/fetch_specific_coupon", data);
  }
  fetch_coupon_code(data) {
    return this.https.post(this.baseUrl + "admin/fetch_coupon_code", data);
  }
  //end coupen
  fetch_order_detail_without_token(data){
    return this.https.post(this.baseUrl + "user/fetch_order_detail_without_token", data);

  }
  fetch_order_with_orderrandomid(data){
    return this.https.post(this.baseUrl + "user/fetch_order_with_orderrandomid", data);

  }

  subscribe_topic(data){
    return this.https.post(this.baseUrl + "notification/topic_subscribe_notification", data);

  }

  unsubscribe_topic(data){
    return this.https.post(this.baseUrl + "notification/topic_unsubscribe_notification", data);

  } 
  bulk_list(data){
    return this.https.post(this.baseUrl + "bulk/fetch_file_table", data);

  }
upload(){
    return this.uploadUrlApi;
  }

  bannerAdd(data){
    return this.https.post(this.baseUrl + "admin/add_slider", data);
    // return this.https.post("http://localhost/9toys/index.php/admin/add_slider", data);

  }

  viewBannerall(data){
    return this.https.post(this.baseUrl + "admin/fetch_all_content_slider",data);
  }
  viewBannerbyType(data){
    return this.https.post(this.baseUrl + "admin/fetch_content_slider_byType",data);
  }

  deleteBanner(data){
    return this.https.post(this.baseUrl + "admin/delete_content_slider_image",data);

  }
  
  ninetoysBanner(data){
    return this.https.post(this.baseUrl + "user/fetch_all_content_slider",data);

  }

  //8/09/2020 for 9toys specification template
fetch_parameter_content_with_type(data){
    return this.https.post(this.baseUrl + "admin/fetch_parameter_content_with_type",data);

  }
  fetch_parameter_content_with_type_multi(data){
    return this.https.post(this.baseUrl + "admin/fetch_parameter_content_with_type_multi",data);

  }
  fetch_parameter_specification_content(data){
    return this.https.post(this.baseUrl + "admin/fetch_parameter_specification_content",data);

  }
  fetch_parameter_content_with_key_type(data){
    return this.https.post(this.baseUrl + "admin/fetch_parameter_content_with_key_type",data);

  }
  //8/09/2020 for 9toys specification template end

  parcel_inventories(data){
        return this.https.post(this.baseUrl + "order_vendor/parcel_inventories",data);

  }
  order_split(data){
        return this.https.post(this.baseUrl + "order_vendor/order_split",data);
  }
   updateOrderStatusVendor(data) {
    return this.https.post(this.baseUrl + "order_vendor/updateOrderStatus", data);
  }
  insert_product_visit_log(data){
        return this.https.post(this.baseUrl + "user/insert_product_visit_log", data);

  }
  productAnalysisDashboard(data){
     return this.https.post(this.baseUrl + "analysis/productAnalysisDashboard", data);

  }
 }
