import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-decorate-help',
  templateUrl: './decorate-help.component.html',
  styleUrls: ['./decorate-help.component.css']
})
export class DecorateHelpComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
