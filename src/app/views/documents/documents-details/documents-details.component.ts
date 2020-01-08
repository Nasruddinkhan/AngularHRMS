import { Component, OnInit } from '@angular/core';
import { DocumentmasterService } from '../../service/documentmaster.service';
import { UserdocumentService } from '../../service/userdocument.service';
import { ToastrService } from 'ngx-toastr';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Component({
  selector: 'app-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.scss']
})
export class DocumentsDetailsComponent implements OnInit {

  p: number = 1;
  initialPageSize: number = 5;
  documentype: string;
  courseName: string;
  docTypeList = [];
  conTypeList=[]
  eduDocList = [];
  userId:number;
  loading: boolean = false;
  edudocFlag:boolean = false;
  customFile='Choose file';
  fileContent:any;
   isFileChk:boolean=false;
  constructor(private documentService:DocumentmasterService,
    private toastr:ToastrService,
    private userDocService:UserdocumentService) { 
      this.conTypeList=[{"id":".jpg","value":"JPG"},{"id":".png","value":"PNG"},{"id":".jpeg","value":"JPEG"},{"id":".pdf","value":"PDF"}]
    }

 async ngOnInit() {
  var user = JSON.parse(sessionStorage.getItem("user"));
  this.userId = user.userID;
   this.getDocumentType();
    this.getAlleducationList();
  }
  enableFile(){alert(4554);
    this.isFileChk=true;
  }
  hideUploadDoc(){
    this.isFileChk=false;
  }
 async getDocumentType(){
 await this.documentService.findAllDocuments().then((res:any)=>{
  this.docTypeList = res;

 });
  }
 async getAlleducationList(){
   this.edudocFlag=false;
   this.userDocService.getOnLoadDropDowns(this.userId).then((res:any)=>{
    this.eduDocList= res;
   },err=>{
    this.toastr.error(err.error.message, 'Internal Error', {
      positionClass: 'toast-bottom-right'
    });
   })
 
  }
  checkEducationDoc(eductionDoc:string){
   // alert(eductionDoc);
    if(eductionDoc == 'EDU'){
      this.edudocFlag=true;
    }else{
      this.edudocFlag=false;
    }
  }
  fileEvent(fileInput){
    let file = fileInput.target.files[0];
    alert(file);
  this.customFile=file.name;
 
}
onSubmit(newUserDocumentForm){
  alert(JSON.stringify(newUserDocumentForm.value));
  return false;
}
}
