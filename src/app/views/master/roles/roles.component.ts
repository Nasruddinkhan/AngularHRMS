import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  headerTitle:string="Add role";
  rolename:string;
  constructor() { }

  ngOnInit() {
  }

}
