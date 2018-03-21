import { Component, OnInit, NgModuleFactory } from '@angular/core';
import { ImpostersService } from '../../services/imposters.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MountebankService } from '../../services/mountebank.service';

@Component({
  selector: 'app-json-page',
  templateUrl: './json-page.component.html',
  styleUrls: ['./json-page.component.css']
})
export class JsonPageComponent implements OnInit {

  currentImposter: any;
  message = '';
  displayData = 'fred';
  mounteBankSubmitForm: FormGroup;


  constructor(private impostersService: ImpostersService, fb: FormBuilder, private mounteBankService: MountebankService) {

    this.mounteBankSubmitForm = fb.group({
      mounteBankUrl: ['http://localhost:2525', Validators.required]
    });
    // this.mounteBankSubmitForm.valueChanges
    this.mounteBankSubmitForm.get('mounteBankUrl')
      .valueChanges
      .subscribe(this.handleUpdate.bind(this));

  }

  ngOnInit() {
    this.currentImposter = this.impostersService.getCurrentImposter();
    this.displayData = this.mounteBankService.translate(this.currentImposter, true);
  }

  handleUpdate(data) {
    //// console.log('data');
    // this.displayData = data;
  }


  postToMountebank() {
    console.log('post');

  }
  deleteFromMountebank() {
    console.log('delete');
  }

}
