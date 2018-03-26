import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrls: ['./sort-dialog.component.css']
})
export class SortDialogComponent implements OnInit {

  sortItems = [];
  fred = [{id: 1, name: 'alpha'}, {id: 2, name: 'beta'}, {id: 3 , name: 'ted'}];

  @Output() resultOutput = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    console.log(this.sortItems);
  }

  ok() {
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }

}
