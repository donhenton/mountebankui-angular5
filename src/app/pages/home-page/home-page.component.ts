import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImpostersService } from '../../services/imposters.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DecorateHelpComponent } from './../help/decorate-help/decorate-help.component';
import { InjectionHelpComponent } from './../help/injection-help/injection-help.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  errorMessage: any = '';
  homeForm: FormGroup;
  currentCollection: any;
  collectionItems: any[];
  currentCollectionIdx: number;
  collectionSelectorIdx = '0';
  currentImposterIdx;
  currentResponseIdx = 0;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private impostersService: ImpostersService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.currentCollection = this.impostersService.getCurrentImposter();
    this.currentCollectionIdx = this.currentCollection.id; // the index into the collection array
    this.collectionSelectorIdx = this.currentCollectionIdx.toString();
    this.collectionItems = this.impostersService.getCollectionItems();
    this.currentImposterIdx = 0;
    this.homeForm = this.fb.group({ collectionSelectorIdx: '0' });


    this.homeForm
      .valueChanges
      .subscribe(this.changeCollection.bind(this));

    // console.log(JSON.stringify(this.currentCollection.imposters[0]));
  }

  /**
   * used by imposter selector
   * @param index
   */
  selectImposter(index) {
    this.currentImposterIdx = index;
    this.currentResponseIdx = 0;
  }

  inputChange(item, event) {
    this.save();
  }

  save() {
    this.impostersService.save();
  }

  /**
   * handle the collection change events
   * @param ev
   */
  changeCollection() {

    this.collectionSelectorIdx = this.homeForm.get('collectionSelectorIdx').value;
    this.currentImposterIdx = 0;
    this.currentCollectionIdx = parseInt(this.collectionSelectorIdx, 10);
    this.impostersService.setCollectionTo(this.currentCollectionIdx);
    this.currentCollection = this.impostersService.getCurrentImposter();
  }

  composeImposterAlias(idx) {
    const imposter = this.currentCollection.imposters[idx];
    let verb = imposter.match.verb;
    if (imposter.match.injection.use) {
      verb = 'INJ';
    }
    return 'Item ' + (idx + 1) + ' (' + verb + ')';
  }


  composeSortAlias(idx) {
    const imposter = this.currentCollection.imposters[idx];
    let verb = imposter.match.verb;
    if (imposter.match.injection.use) {
      verb = 'INJ';
    }
    const labelText = imposter.documentation;
    return '(' + verb + ')\n' + labelText;

  }

  addImposter() {
    const newImposter = this.impostersService.createNewImposter();
    this.currentCollection.imposters.push(newImposter);
    this.save();
  }

  sortImposters() {

  }

  deleteImposter() {
    const doDelete = confirm('Delete this Imposter?');
    if (doDelete) {
      this.currentCollection.imposters.splice(this.currentImposterIdx, 1);
      this.currentImposterIdx = 0;
      this.currentResponseIdx = 0;
      this.save();
    }

  }

  trackByFn(index, item) {
    return index;
  }

  tabSelect(type) {
    console.log(type);
  }

  ////////////// fill these in ///////////////////////

  isJsonString(data) {
    return true;
  }
  formatJson(type: string, pretty: boolean) {

  }

  formatDecorate(currentResponse) {
    if (!currentResponse.decorate) {
      currentResponse.decorate = '';
    }
    // currentResponse.decorate = js_beautify(currentResponse.decorate);
  }

  doHelpDisplay(type) {

    const initialState = {};


    if (type === 'injection') {
      this.bsModalRef = this.modalService.show(InjectionHelpComponent, { initialState });

    }
    if (type === 'decorate') {
      this.bsModalRef = this.modalService.show(DecorateHelpComponent, { initialState });

    }
  }

  swapInjectionForResponse() {

  }

  formatInjection(stuff) {

  }


  /// reponse CRUD
  deleteResponse() {

  }

  addResponse() {


  }
  moveResponseTo(idx) {

  }

}
