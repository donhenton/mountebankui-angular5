import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-injection-help',
  templateUrl: './injection-help.component.html',
  styleUrls: ['./injection-help.component.css']
})
export class InjectionHelpComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
