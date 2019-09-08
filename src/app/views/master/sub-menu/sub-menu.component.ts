import { Component, OnInit } from '@angular/core';

/**
 * Created By, Nasruddin Khan
 * Created Date Sep 9, 2019 
 */
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  headerTitle:string = 'Add Sub Menu';
  constructor() { }

  ngOnInit() {
  }

}
