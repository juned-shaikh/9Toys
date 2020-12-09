import { Component, OnInit } from '@angular/core';
import { NinetoysserviceService } from '../../ninetoysservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.scss']
})
export class HomeProfileComponent implements OnInit {
  public access_token=sessionStorage.getItem('access_token');
  public user_num=sessionStorage.getItem('user_num');  
  public comp_num=sessionStorage.getItem('comp_num');
  public comp_num_new=sessionStorage.getItem('comp_num_new');
    public usertype_id=sessionStorage.getItem('usertype_id');  
buis_update=false;
  public comp_id = sessionStorage.getItem('comp_num');
  public data = {access_token:this.access_token, comp_num:this.comp_num}
  userdata;
  public changepasssbox =false;
  public shownamebox = false;
  Changepassword:FormGroup;
  updateprofile:FormGroup;
cust_reg_enable=false;
  constructor(
    private adminService: NinetoysserviceService,
    private router:Router,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute,
    private formbuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.compSettingsCustReg();
    this.fetch_customer();
    this.adminService.get_profile({access_token:this.access_token,user_num:this.user_num, comp_num:this.comp_num_new}).subscribe(data=>{
      if(data['status']==1){ 
        this.userdata = data['result'];
        // this.userdata = data['current']['buisnessInfo'];  
        // this.pickupaddress = data['current']['pickupAddress'] ;
        // this.regaddress = data['current']['registerAddress']
        // this.bank = data['current']['bankDetails']; 
        
        
      }
      else if(data['status']==10){
      sessionStorage.clear();
       this.snackbar.open('Multiple login with this ID has been detected, Logging you out. ','' ,{
                duration: 5000,
                horizontalPosition:'center',
        });      
      this.router.navigate(['/login']);
      }

      else if(data['status']== 0){

      }
   
    }
    );
  }
  logout() {
    var res = confirm("Are you sure you want to logout.");
     if(res){
      localStorage.setItem("flag1", "0");
      sessionStorage.clear();
      var rtoken = sessionStorage.getItem('noti_token');
      var topic = "user_"+sessionStorage.getItem('user_num');
      
      
      this.adminService.unsubscribe_topic({topic_name : topic , token : rtoken}).subscribe(data =>{
        if(data['status']=='1'){
          console.log("topic unsubscribed successfully")
  
        }else{
          console.log("topic not unsubscribed")
        }
      })
      this.router.navigate(["/home"]);
     }

  }

  compSettingsCustReg() {
    this.adminService
      .fetch_particular_company_registry_with_sno({ comp_num: this.comp_num_new,s_no:21})
      .subscribe(data => {
     


        if (data["status"] == 1) {
          // if(data['data'].length>0){
          //   for(let k=0;k<data['data'].length;k++){
              // if(data['data'][k].s_no==14 || data['data'][k].s_no=='14'){
                if(data['data'].value==1 || data['data'].value=='1'){
                  this.cust_reg_enable=true;
                }
              // }
          //   }
          // }
         }
      });
  }

fetch_customer(){
      let postData = {
        user_num:this.user_num,
        access_token:this.access_token,
        comp_num:this.comp_num_new
      };
      console.log(postData);

      this.adminService.fetch_customer_registration(postData).subscribe(
        data => {
          if (data["status"] == 1) {
           
          
if(data["result"].buisness_no!='0' && data["result"]!=null && data["result"].buisness_no!=null && data["result"].buisness_no!='null' && data["result"].buisness_no!='0'){
  this.buis_update=true;
  
             }
             else{
             
 
 
             }
          } else {

           
          }
        },
        error => {

         
        }
      );
    }



}
