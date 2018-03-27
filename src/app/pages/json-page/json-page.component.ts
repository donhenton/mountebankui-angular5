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
  mounteBankUrl = 'http://localhost:2525';
  baseMessageClass = 'emphasis pull-right';
  messageClasses = '';


  constructor(private impostersService: ImpostersService, fb: FormBuilder, private mounteBankService: MountebankService) {

    this.mounteBankSubmitForm = fb.group({
      mounteBankUrl: [this.mounteBankUrl, Validators.required]
    });

    this.mounteBankSubmitForm.get('mounteBankUrl')
      .valueChanges
      .subscribe(this.handleUpdate.bind(this));

  }

  ngOnInit() {
    this.currentImposter = this.impostersService.getCurrentImposter();
    this.displayData = this.mounteBankService.translate(this.currentImposter, true);
  }

  handleUpdate(data) {
    this.mounteBankUrl = data;
  }


  postToMountebank() {
    const success = this.handleSuccess.bind(this);
    const error = this.handleError.bind(this);

    this.mounteBankService
      .postToMountebank(this.mounteBankUrl, this.displayData)
      .subscribe(success, error);

  }
  deleteFromMountebank() {
    const success = this.handleSuccess.bind(this);
    const error = this.handleError.bind(this);
    this.mounteBankService
      .deleteFromMountebank(this.mounteBankUrl, this.currentImposter.port)
      .subscribe(success, error);
  }


  handleSuccess(response) {

    // data is the return body
    // status in int return code

    if (response.status === 201) {
      // successful add
      this.messageClasses = this.baseMessageClass + ' text-success';
      this.message = 'Successful add to Mountebank';
    }
    if (response.status === 200) {
      // successful delete
      this.messageClasses = this.baseMessageClass + ' text-success';
      this.message = 'Successfully removed from Mountebank';
    }

  }

  handleError(error) {
    this.message = 'General Error';
    this.messageClasses = this.baseMessageClass + ' text-danger';

    switch (error.status) {

      case -1:
        this.message = 'Error: problem posting to Mountebank. ' +
          'Mountebank server may need --allow-Injection mode';
        break;
      case 400:
        this.message += ' only one submission per session';
        break;
      case 0:
        this.message += ' server may not be started';
        break;
      default:
        this.message = 'Error: ' + error.status + ' ' +
          error.statusText;
    }
  }


}
