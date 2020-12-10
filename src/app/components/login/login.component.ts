import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { first } from "rxjs/operators";
import { NinetoysserviceService } from "../../ninetoysservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AlertService, AuthenticationService } from "../../_services";


@Component({
  selector: 'mg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;
  signup;
  loading = false;
  submitted = false;

  registerForm: FormGroup;
  otpForm: FormGroup;
  otpResendForm: FormGroup;
  forgotForm: FormGroup;
  public visibility = true;
  signotp = false;
  user_num;
  returnUrl: string;
 
  get f() {
    return this.loginForm.controls;
  }
  
  constructor(
              private router: Router,
           
              private route: ActivatedRoute,
              
              private formBuilder: FormBuilder,
            
             private snackbar:MatSnackBar,
              private adminservice: NinetoysserviceService,
                 
              private authenticationService: AuthenticationService,
            ) {
  }

  ngOnInit(): void {
    
    sessionStorage.setItem("database", "9toys");
          
    // var host = location.origin;
    let l = location.origin;
    var c = l.split("//");
    var host = c[1];
    this.adminservice
    .hostlink({ host_name: host})
    .subscribe(data => {
      if (data["status"] == 1) {
        if (data["result"].comp_num == "01" && data['result'].name == "Signup"){
          this.signup = 1;
        }else{
          this.signup = 0;
        }
      }else{
        this.signup = 0;
      }
    });
    
    this.loading = true;
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
      // usertype_id : '2'
    });
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      // password: ['', Validators.required],
      usertype_id: "1"
    });
    this.otpForm = this.formBuilder.group(
      {
        // username: ['', Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        otp: ["", Validators.required],
        username: ["", Validators.required],
        usertype_id: "1"
      },
      { validator: this.PasswordValidator }
    );
    this.otpResendForm = this.formBuilder.group({
      // username: ['', Validators.required],
      password: ["", Validators.required],
      otp: ["", Validators.required],
      username: ["", Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl =
    this.route.snapshot.queryParams["returnUrl"] || "/Admin/login";
    this.loading = true;
  }
  onSubmitResendOtp() {
    let data = this.otpForm.value;
    if (
      this.otpForm.controls.username == null ||
      this.otpForm.controls.username.value == ""
    ) {
      this.snackbar.open("Please fill the username field. ", "", {
        duration: 3000
      });
    } else {
      this.loading = false;
      this.adminservice
        .ResendOtpVerification(data)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = true;
            if (data["status"] == 1) {
              this.signup = this.signup;
              this.loading = true;
              this.snackbar.open(
                "OTP is send to your email/mobile,please verify. ",
                "",
                {
                  duration: 3000
                }
              );
            } else {
              this.loading = true;
              this.snackbar.open(
                "Incorrect Credentials Please Try again ",
                "",
                {
                  duration: 3000
                }
              );
            }
          },
          error => {
            this.loading = true;
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
    }
  }
  get g() {
    return this.otpForm.controls;
  }
  onSubmit() {
    this.loading = false;
    if (this.signup == 1 || this.signup == 2 || this.signup == 4) {
      this.loading = true;
      this.signup = 0;
    } else {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        this.loading = true;
        return;
      }

      this.loading = false;
      let data = this.loginForm.value;
      this.authenticationService
        .login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {

            this.loading = true;
            if (data["status"] == 1) {
              this.snackbar.open("Login Succefull. ", "ok", {
                duration: 3000
              });

              sessionStorage.setItem("user_num", data["user_num"]);
              sessionStorage.setItem("access_token", data["access_token"]);
              sessionStorage.setItem("jwtoken", data["jwtoken"]);
              sessionStorage.setItem("usertype_id", data["usertype_id"]);
              sessionStorage.setItem("comp_num", data["comp_num"]);
              sessionStorage.setItem("username", data["username"]);
              sessionStorage.setItem("email", data["email"]);
              sessionStorage.setItem("mobile", data["mobile"]);
              sessionStorage.setItem("name", data ["name"]);
             
             
              if (data["comp_num"] == "0" && data["usertype_id"] == "1") {
             
                //this.router.navigate([""]);
              } else {
                this.ngOnInit();
                window.location.reload();
                this.router.navigate([""]);
              }
            } else {
              this.loading = true;
              this.snackbar.open(
                "Incorrect Credentials Please Try again ",
                "",
                {
                  duration: 3000
                }
              );
            }
          },
          error => {
            this.loading = true;
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
    }
  }
  onSubmitSign() {
    this.loading = false;
    if (this.signup == 0 || this.signup == 2) {
      this.signup = 1;
      this.loading = true;
    } else {
      this.loading = true;
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        this.loading = true;
        return;
      } else {
        // this.loading = true;
        this.loading = false;
        let data = this.registerForm.value;
        this.adminservice
          .registerVendor(data)
          .pipe(first())
          .subscribe(
            data => {
              this.loading = true;
              if (data["status"] == 1) {
                this.snackbar.open(". ", "", {
                  duration: 3000
                });
                this.loading = true;

                this.signup = 2;
                this.signotp = true;

                this.otpForm.controls.username = this.registerForm.controls.username;
                this.snackbar.open(
                  "OTP is send to your email/mobile,please verify. ",
                  "",
                  {
                    duration: 3000
                  }
                );

               
                this.router.navigate(["/Admin/login"]);
              } else {
                this.loading = true;
                this.snackbar.open("Already exist, Please Try another ", "", {
                  duration: 3000
                });
              }
            },
            error => {
              this.loading = true;
              this.snackbar.open(
                "Something Went wrong please try again. ",
                "",
                {
                  duration: 3000
                }
              );
            }
          );
      }
    }
  }
  onSubmitOTP() {
    // this.signup=false;
    this.loading = false;

    if (this.otpForm.invalid) {
      this.loading = true;
      return;
    }

    this.loading = false;
    let data = this.otpForm.value;
    this.authenticationService
      .otpVerified(
        this.g.username.value,
        this.g.password.value,
        this.g.otp.value,
        this.g.usertype_id.value,
        this.g.confirmPassword.value
      )
      .subscribe(
        data => {
          this.loading = true;
          if (data["status"] == 1) {
            this.signup = 0;
            this.loading = true;
            this.snackbar.open("OTP Verified and Login Successfull.", "", {
              duration: 3000
            });
             sessionStorage.setItem("user_num", data["user_num"]);
              sessionStorage.setItem("access_token", data["access_token"]);
              sessionStorage.setItem("jwtoken", data["jwtoken"]);
              sessionStorage.setItem("usertype_id", data["usertype_id"]);
              sessionStorage.setItem("comp_num", data["comp_num"]);
              sessionStorage.setItem("username", data["username"]);
              sessionStorage.setItem("email", data["email"]);
              sessionStorage.setItem("mobile", data["mobile"]);
              sessionStorage.setItem("name", data ["name"]);

              if (data["comp_num"] == "0" && data["usertype_id"] == "1") {
                this.router.navigate(["/Admin/add-company"]);
              } else {
                this.router.navigate(["/Admin/dashboard"]);
              }
            // this.snackbar.open("OTP Verified. Please Login.", "", {
            //   duration: 3000
            // });
          } else {
            this.loading = true;
            this.snackbar.open("Incorrect Credentials Please Try again ", "", {
              duration: 3000
            });
          }
        },
        error => {
          this.loading = true;
          this.snackbar.open("Something Went wrong please try again. ", "", {
            duration: 3000
          });
        }
      );
  }
  PasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    let password = control.get("password");
    let confirmPassword = control.get("confirmPassword");
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password &&
      confirmPassword &&
      password.value != confirmPassword.value
      ? { misMatch: true }
      : null;
  }
  passvible(){
    this.visibility = !this.visibility;
    
  }
  
  onSubmitResend() {
    if (this.signup == 0 || this.signup == 2 || this.signup == 1) {
      this.signup = 4;
      this.loading = true;
    } else {
      if (this.otpForm.invalid) {
        this.loading = true;
        return;
      }

      // this.loading = true;
      this.loading = false;
      let data = this.otpForm.value;
      this.adminservice
        .otpVerification(data)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = true;
            if (data["status"] == 1) {
              this.signup = this.signup;
              this.loading = true;
              this.snackbar.open(
                "OTP is send to your email,please verify. ",
                "",
                {
                  duration: 3000
                }
              );
            } else {
              this.loading = true;
              this.snackbar.open(
                "Incorrect Credentials Please Try again ",
                "",
                {
                  duration: 3000
                }
              );
            }
          },
          error => {
            this.loading = true;
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
    }
  }
  forgotPassword() {
    let postData = this.forgotForm.value;

  
      if (this.forgotForm.invalid) {
        alert("* fields are required.")
      }  
      else{
        this.loading=false;
        this.adminservice.forgotPassword(postData).subscribe(
          data => {
            this.loading=true;
            if (data["status"] == 1) {

             
              this.snackbar.open(data["msg"], "", {
                duration: 3000
              });
             
            } else {
               this.snackbar.open("Please Try Again", "", {
                duration: 3000
              });
            }
          },
          error => {
             this.loading=true;
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
        
      }
   
   
   
  }
   
}
