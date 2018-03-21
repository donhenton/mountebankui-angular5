import { Component, OnInit } from '@angular/core';
import { ImpostersService } from '../../services/imposters.service';


@Component({
  selector: 'app-import-page',
  templateUrl: './import-page.component.html',
  styleUrls: ['./import-page.component.css']
})
export class ImportPageComponent implements OnInit {

  message = '';
  baseMessageClass = 'emphasis pull-right';
  messageClasses = '';
  collectionJSON: any;

  constructor(private impostersService: ImpostersService) { }

  ngOnInit() {


    this.collectionJSON = this.impostersService.exportCollection();
    this.messageClasses = this.baseMessageClass + ' text-success';

  }

  collectionChange(ev: any) {
     this.message = '';
     this.collectionJSON = ev.target.value;
  }

  saveCollection()  {

    this.impostersService.importCollection(this.collectionJSON);
    this.message = 'Successfully Imported';

  }

}
