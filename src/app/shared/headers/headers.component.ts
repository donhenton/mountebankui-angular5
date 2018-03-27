import { Component, OnInit, Input } from '@angular/core';
import { ImpostersService } from '../../services/imposters.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  @Input() headersArray: any[];
  @Input() keyLabel = 'Key';
  @Input() headerText = '';
  constructor(private impostersService: ImpostersService) { }

  ngOnInit() {
  }

  deleteResponseHeader(idx) {
    const doDelete = confirm('Delete this Header?');
    if (doDelete) {
      this.headersArray.splice(idx, 1);
      this.impostersService.save();
    }
  }
  addResponseHeader() {
    const newItem = { 'key': '', 'value': '' };
    this.headersArray.push(newItem);
    this.impostersService.save();

  }

  inputChange(obj, event) {
    this.impostersService.save();
  }



}
