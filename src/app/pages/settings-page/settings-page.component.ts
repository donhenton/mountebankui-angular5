import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImpostersService } from '../../services/imposters.service';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  settingsForm: FormGroup;
  currentImposter: any;
  collectionItems: any[];
  currentCollectionIdx: number;
  collectionSelectorIdx = '0';

  constructor(private impostersService: ImpostersService, private fb: FormBuilder) {



  }

  ngOnInit() {
    this.currentImposter = this.impostersService.getCurrentImposter();
    this.currentCollectionIdx = this.currentImposter.id; // the index into the collection array
    this.collectionSelectorIdx = this.currentCollectionIdx.toString();
    this.collectionItems = this.impostersService.getCollectionItems();
    this.settingsForm = this.fb.group(this.getFromCurrentImposter());
    this.settingsForm
      .valueChanges
      .subscribe(this.sendToCurrentImposter.bind(this));


  }

  private sendToCurrentImposter(data) {

    // this performs a right hand merge for keys that are the same
    const merged = { ... this.currentImposter, ...data };
    this.currentImposter = merged;
    // console.log(`1\n\n ${JSON.stringify(this.currentImposter)}`);
    this.impostersService.update(this.currentCollectionIdx, merged);
    this.updateList();


  }

  private getFromCurrentImposter() {
    return {
      collectionSelectorIdx: this.collectionSelectorIdx,
      port: this.currentImposter.port,
      description: this.currentImposter.description,
      useCORs: (this.currentImposter.useCORs ? this.currentImposter.useCORs : false),
      CORsOrigin: (this.currentImposter.CORsOrigin ? this.currentImposter.CORsOrigin : 'default-stuff'),
      allowedCORsHeaders: (this.currentImposter.allowedCORsHeaders ? this.currentImposter.allowedCORsHeaders : 'default-stuff'),
      allowedCORsMethods: (this.currentImposter.allowedCORsMethods ? this.currentImposter.allowedCORsMethods : 'default-stuff'),
    };
  }

  trackByFn(index, item) {
    return item.id;
  }

  updateList() {
    this.collectionItems = this.impostersService.getCollectionItems();

  }

  changeCollection() {

    this.collectionSelectorIdx = this.settingsForm.get('collectionSelectorIdx').value;
    this.currentCollectionIdx = parseInt(this.collectionSelectorIdx, 10);
    this.impostersService.setCollectionTo(this.currentCollectionIdx);
    this.currentImposter = this.impostersService.getCurrentImposter();
    this.settingsForm.setValue(this.getFromCurrentImposter());

  }

  deleteCollection() {


    if (this.impostersService.getCollectionItems().length === 1) {
      alert('Cannot delete last item in collection');
      return;
    }
    const desc = this.currentImposter.description;
    const doDelete = confirm('Delete Collection \'' + desc + '\' ?');
    if (doDelete) {
      this.impostersService.deleteCollectionAt(this.currentCollectionIdx);
      this.currentCollectionIdx = 0;
      this.collectionSelectorIdx = this.currentCollectionIdx.toString();
      this.impostersService.setCollectionTo(this.currentCollectionIdx);
      this.currentImposter = this.impostersService.getCurrentImposter();
      this.collectionItems = this.impostersService.getCollectionItems();
      this.settingsForm.setValue(this.getFromCurrentImposter());
    }





  }

  createNewCollection() {

    this.impostersService.createNewCollection();
    this.currentImposter = this.impostersService.getCurrentImposter();
    this.collectionItems = this.impostersService.getCollectionItems();
    this.currentCollectionIdx = this.currentImposter.id; // the index into the collection array
    this.collectionSelectorIdx = this.currentCollectionIdx.toString();
    this.settingsForm.setValue(this.getFromCurrentImposter());

  }

}
