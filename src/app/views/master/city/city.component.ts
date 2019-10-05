import { Component, OnInit } from '@angular/core';
import { CityMaster } from '../../model/CityMaster';
import { CityService } from '../../service/cityService';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  title = 'materialApp';
  headerTitle = " Add City";
  citymst: CityMaster;
  stateId: number;
  cityName: string;
  cities: any[] = [];
  cityId: number;
  states: any[] = [];
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public loading = false;
  upcityName: string;
  upcityid: number;
  upstateId: number;
  upCreatedDate: Date;
  updatedCreatedBy: string;
  updatedBY: string;
  updatedDate: string;
  updatecity: string;
  modalRef: BsModalRef;

  constructor(private citySrvices: CityService, private toastr: ToastrService, private modalService: BsModalService) 
  { }

  ngOnInit() 
  {
    this.getStatesList();
  }

  getStatesList() {
    this.loading = true;
    this.citySrvices.getStatesList().subscribe((msg: any) => {
      this.loading = false;
      this.states = msg;

      console.log(msg);
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }
  getCityDetails() {
    this.loading = true;
    this.citySrvices.getCityDetails().subscribe((cities: any) => {
      this.cities = cities;
      console.log(this.cities);
    }, err => {
      this.cities = [];
      console.log(err);
    });
    this.loading = false;
  }

  closePopUP(): void {
    this.modalRef.hide();
  }

  onSubmit(form: NgForm, pageFlag) {
    let citymsg;
    let cityid;
    if (form.valid) {
      this.loading = true;
      this.citymst = new CityMaster;
      if (pageFlag === 'I') {
        citymsg = "Add City Successfully";
        this.citymst.createdBy = "Daud";
        this.citymst.createdDate = new Date();
        this.citymst.stateId = form.value.stateId;
        cityid = this.cityId;
      } else {
        citymsg = "Update City Successfully";
        this.citymst.cityID = this.upcityid;
        this.citymst.modifiedBy = "Daud";
        this.citymst.modifiedDate = new Date();
        this.citymst.stateId = this.upstateId;
        cityid = this.upstateId;
        this.citymst.createdBy = this.updatedCreatedBy;
        this.citymst.createdDate = this.upCreatedDate;
      }

      this.citymst.activeStatus = 1;
      this.citymst.cityName = form.value.cityName;

      this.citySrvices.saveCityDetail(this.citymst).subscribe((response: any) => {
        this.loading = false;
        this.getCityDetails();
        this.toastr.success(citymsg, 'City', {
          positionClass: 'toast-bottom-right'
        });
        if (pageFlag === 'U')
          this.closePopUP();

      }, err => {
        this.loading = false;
        this.toastr.error(err.error.message, 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        });
      });
    }
    form.reset();
    // console.log(JSON.stringify(this.skillmodel));
    // ...our form is valid, we can submit the data
  }

}
