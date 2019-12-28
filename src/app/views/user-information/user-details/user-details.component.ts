import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { CityService } from '../../service/cityService';
import { Address } from '../../model/address.model';
import { AddressService } from '../../service/address.service';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  headerTitle: string = "Personal Details";
  addheaderTitle: string = "Address Details";
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-pencil';
  isCollapsed1: boolean = false;
  iconCollapse1: string = 'icon-pencil';
  userForm: FormGroup;
  isSubmitted = false;
  isAddrSubmitted = false;
  loading: boolean = false;
  fullname: string;
  mobno: string;
  email: string;
  isPerFlg: boolean = false;
  isAddressFlg: boolean = false
  cityList: any;
  addressForm: FormGroup;
  address: Address;
  userid: number;
  addr:string;
  constructor(private formBuiler: FormBuilder,
    private addressService: AddressService,
    private userService: UserService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private cityService: CityService) { }
  editEmplyeess() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.userid = user.userID;
  //  alert(this.userid);
    //alert(user.isPersonalFlag == null || user.isPersonalFlag === 'N');
    if (user.isPersonalFlag == null || user.isPersonalFlag === 'N') {
      this.isPerFlg = false;
      this.isCollapsed = false;
    }
    else {
      this.isPerFlg = true;
      this.isCollapsed = true;
    }

    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      fatherName: user.fatherName,
      gender: user.gender,
      dob: this.datepipe.transform(user.dob, 'yyyy-MM-dd'),
      maritial: user.maritialStatus,
      doj: this.datepipe.transform(user.doj, 'yyyy-MM-dd'),
      email: user.email,
      contactno: user.contactNo,
      guardian: user.gurdianContactNo,
      aadhaarno: user.aadhaarDetails,
      pancard: user.panCard,
      isPersonalFlag: 'Y'
    });
    this.fullname = user.firstName + " " + user.fatherName + " " + user.lastName;
    this.mobno = user.contactNo;
    this.email = user.email;
  }
    editAddress() {

    this.addressService.getUserAddress(this.userid).subscribe((response: any) => {
      this.isAddressFlg = true;
      this.isCollapsed1 = true;
      let stateName;
      this.cityList.forEach(element => {
        if (element.cityID == response.cityID)
          stateName = element.stateName;
      });
      this.addr =  response.addressDetails; 
      this.addressForm.setValue({
        addressDtl: response.addressDetails,
        city: response.cityID,
        pincode: response.pinCode,
        addressID: response.addressID,
        state: stateName
      });
     // alert(JSON.stringify(this.addressForm.value));
    }, err => {
      this.isAddressFlg = false;
      this.isCollapsed1 = false;
    });

  }
  ngOnInit() {

    this.userForm = this.formBuiler.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      fatherName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      maritial: ['', Validators.required],
      doj: ['', Validators.required],
      email: ['',],
      contactno: ['', Validators.required],
      guardian: ['', Validators.required],
      aadhaarno: ['', [Validators.minLength(12)]],
      isPersonalFlag: ['Y',],
      pancard: ['', [Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]]
    });
    this.addressForm = this.formBuiler.group({
      addressDtl: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['',],
      addressID: ['',]
    });
    this.editEmplyeess();
    this.getAllCity();
    this.editAddress();
  }
  getAllCity() {
    this.cityService.getCityDetails().subscribe((cityList: any) => {
      this.cityList = cityList;
    });
  }
  //^[A-Za-z]{5}[0-9]{4}[A-Za-z]$addformControls
  get addformControls() { return this.addressForm.controls; }
  get formControls() { return this.userForm.controls; }
  collapsed(event: any): void {
    // console.log(event);
  }
  expanded(event: any): void {
    // console.log(event);
  }
  toggleCollapse(flag): void {
    if (flag == 'P') {
      this.isCollapsed = !this.isCollapsed;
      this.iconCollapse = this.isCollapsed ? 'icon-pencil' : 'icon-close';
    }
    else {
      this.isCollapsed1 = !this.isCollapsed1;
      this.iconCollapse1 = this.isCollapsed1 ? 'icon-pencil' : 'icon-close';
    }
  }
  saveAddress() {
    this.isAddrSubmitted = true;
    if (this.addressForm.invalid) {
      return;
    }
    this.address = new Address;
    if(!this.isEmpty(this.addressForm.value.addressID))
    this.address.addressID = this.addressForm.value.addressID;
    this.address.activeStatus = 1;
    this.address.addressDetails = this.addressForm.value.addressDtl;
    this.address.pinCode = this.addressForm.value.pincode;
    // this.address.createdDate=new Date;
    //this.address.addressDetails = this.addressForm.

    this.addressService.saveAddressDetail(this.address, this.userid, this.addressForm.value.city).subscribe((res: any) => {
      this.toastr.success("Update record successfully", 'SUCCESS', {
        positionClass: 'toast-bottom-right'
      });
      this.editEmplyeess();
      this.editAddress();
      this.loading = false;
    }, err => {
      this.toastr.error(err.error.message, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
    });
  }

  userRegister() {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    //alert(JSON.stringify(this.userForm.value ));
    this.loading = true;
    this.userService.savePersonalDetails(JSON.stringify(this.userForm.value)).subscribe((response: any) => {
      this.toastr.success("Update record successfully", 'SUCCESS', {
        positionClass: 'toast-bottom-right'
      });

      sessionStorage.setItem("user", JSON.stringify(response));
      this.loading = false;
      //this.userForm.reset(); 
      this.editEmplyeess();
      this.editAddress();
    }, err => {
      this.toastr.error(err.error.message, 'Internal Errors', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
    });
  }

  onChange(obj) {
    this.cityList.forEach(element => {
      if (element.cityID == obj)
        this.addressForm.patchValue({ state: element.stateName });
    });
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
}
