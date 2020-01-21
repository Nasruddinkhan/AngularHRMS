import { Component, OnInit , TemplateRef} from '@angular/core';
import { DocumentmasterService } from '../../service/documentmaster.service';
import { UserdocumentService } from '../../service/userdocument.service';
import { ToastrService } from 'ngx-toastr';
import { UserUploadDoc } from '../../model/userdoc.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PreviewApplicationComponent } from '../preview-application/preview-application.component';
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
  file:string;
  p: number = 1;
  contentType:String;
  initialPageSize: number = 5;
  documentype: string;
  courseName: string;
  docTypeList = [];
  conTypeList=[]
  eduDocList = [];
  documentList=[];
  userId:number;
  deluserDocID:number;
  loading: boolean = false;
  edudocFlag:boolean = false;
  customFile='Choose file';
  fileContent:any;
  modalRef: BsModalRef;
   isFileChk:boolean=false;
  constructor(private documentService:DocumentmasterService,
    private toastr:ToastrService,private route:Router, private modalService: BsModalService,
    private userDocService:UserdocumentService) { 
      this.conTypeList=[{"id":".jpg","value":"JPG"},{"id":".jpeg","value":"JPEG"},{"id":".pdf","value":"PDF"}]
    }

 async ngOnInit() {
  var user = JSON.parse(sessionStorage.getItem("user"));
  this.userId = user.userID;
   await this.getDocumentType();
   await  this.getAlleducationList();
   await  this.getAllDocuments();
   this.checkDropDownsBens();
  }
  
  enableFile(){
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
  async getAllDocuments(){
    this.loading = false;
    await this.userDocService.getAllDocuments(this.userId).then((res:any)=>{
      this.documentList= res;
     },err=>{
      this.documentList=[];
     })
  }
 async getAlleducationList(){
   this.edudocFlag=false;
   await this.userDocService.getOnLoadDropDowns(this.userId).then((res:any)=>{
    this.eduDocList= res;
   },err=>{
    this.toastr.error(err.error.message, 'Internal Error', {
      positionClass: 'toast-bottom-right'
    });
    this.route.navigate(['/user/education']);
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
    let f = fileInput.target.files[0];
    alert(JSON.stringify(fileInput));
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(f);
    this.customFile=f.name;
 
}
_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.file= btoa(binaryString);
         console.log(  this.file);
 }
async onSubmit(newUserDocumentForm:NgForm){
  if(newUserDocumentForm.valid){
  let userdoc = new UserUploadDoc;
  userdoc.file=this.file;
  userdoc.fileName=this.customFile;
  userdoc.userId = this.userId;
  userdoc.contentType = newUserDocumentForm.value.contentType;
  userdoc.documentID=newUserDocumentForm.value.documentype;
  this.loading=true;
  await this.userDocService.uploadDocuments(userdoc).then((response:any)=>{
    this.toastr.success('File upload successfully', 'SUCCESS', {
      positionClass: 'toast-bottom-right'
    });

    newUserDocumentForm.reset();
    
    this.loading=false;
  },err=>{
    this.loading=false;
    this.toastr.error(err.error.message, 'Internal Error', {
      positionClass: 'toast-bottom-right'
    });
    
  });
    this.hideUploadDoc();
    await this.getDocumentType();
    await this.getAlleducationList();
    await this.getAllDocuments();
    this.checkDropDownsBens();
  }
}
openDocumentModal(template: TemplateRef<any>, delusrdocID) {
  this.deluserDocID=delusrdocID;
  this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
}
decline(): void {
  this.modalRef.hide();
}
confirm(): void {
  this.deleteDocument();
  this.modalRef.hide();
}
downloadDocument(doc){
  //alert(doc.contentType.toLowerCase() );
  if (doc.contentType.toLowerCase() == "pdf") {
    var iframe = "<iframe width='100%' height='100%' src='data:application/pdf;base64," + doc.file + "'></iframe>"
    var x = window.open("resume.pdf", "viewer");
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }else{
    if (doc.contentType.toLowerCase() == "jpg") {
      var iframe = "<iframe width='100%' height='100%' src='data:image/jpg;base64," + doc.file + "'></iframe>"
      var x = window.open("profile.pdf", "viewer");
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    }else if(doc.contentType.toLowerCase() == "jepg"){
      var iframe = "<iframe width='100%' height='100%' src='data:image/jepg;base64," + doc.file + "'></iframe>"
      var x = window.open("profile.pdf", "viewer");
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    }
    else if(doc.contentType.toLowerCase() == "png"){
      var iframe = "<iframe width='100%' height='100%' src='data:image/png;base64," + doc.file + "'></iframe>"
      var x = window.open("profile.pdf", "viewer");
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    }
  }
}

async deleteDocument(){
  this.loading=true;
  await this.userDocService.deleteDocuments(this.deluserDocID, this.userId).then((msg: any) => {
    this.loading = false;
    this.toastr.success(this.deluserDocID + ' has been  successfully', 'Delete Documents', {
      positionClass: 'toast-bottom-right'
    });
    
  }, err => {
    
    this.loading = false;
    this.toastr.error(err.msg, 'Internal Errors', {
      positionClass: 'toast-bottom-right'
    });
    this.docTypeList=[];
    this.documentList=[];
  });
  
    await this.hideUploadDoc();
    await this.getDocumentType();
    await this.getAlleducationList();
    await this.getAllDocuments();
    this.checkDropDownsBens();
}

async checkDropDownsBens(){
  if(this.documentList.length ==0)
    await this.getDocumentType();
  if(this.documentList.length !==0){
   this.documentList.forEach(edu=>{
  /*   const index :any= this.docTypeList.filter(cor=> cor.documentID == edu.docID);
     alert(JSON.stringify(index));
     this.docTypeList.splice(index, 1);*/
     for (let obj of this.docTypeList) {
      if (obj.documentID ===edu.docID) {
         this.docTypeList.splice(this.docTypeList.indexOf(obj), 1);
          break;
      }
  }
  });
 }
 }
 openPreviewApplication(){
  this.modalRef = this.modalService.show(PreviewApplicationComponent, {
    animated: true,
    class:'modal-lg',
  });
  this.modalRef.content.closeBtnName = 'Close';
}
 
}
