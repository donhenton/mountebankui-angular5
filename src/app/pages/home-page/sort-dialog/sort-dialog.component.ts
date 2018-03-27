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
  containerRef;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  ok() {

    this.containerRef.processSort('ok', this.sortItems);
    this.bsModalRef.hide();
  }

  cancel() {

    this.containerRef.processSort('cancel', this.sortItems);
    this.bsModalRef.hide();
  }

}
