import { Component } from '@angular/core';
import * as rxjs from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { OnInit } from '@angular/core/';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms/';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  isSubmitted  =  false;
  loading :boolean = false;
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  constructor(private formBuilder: FormBuilder) { }
  public ngOnInit(): void {
  
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
       
      });
      this.registrationForm  =  this.formBuilder.group({
        firstname: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        middlename:['']
    });
  }
  get f() { return this.registrationForm.controls; }
  register() {
    console.log(211);
    this.isSubmitted = true;    

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value))
}
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  
  public triggerSnapshot(): void {
    this.trigger.next();
  }

 

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


}
