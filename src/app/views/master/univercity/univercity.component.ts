import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-univercity',
  templateUrl: './univercity.component.html',
  styleUrls: ['./univercity.component.scss']
})
export class UnivercityComponent implements OnInit {
  univercityList=[];
  p: number = 1;
  initialPageSize: number = 5;
  univercityID: string;
  univercityName: string;
  modalRef: BsModalRef;
  loading: boolean = false;
  deletUnivercityID:string;
  constructor(private modalService: BsModalService,
    private toastr:ToastrService) { }
  ngOnInit() {
  }
}
