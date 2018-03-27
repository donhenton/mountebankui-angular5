import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImpostersService } from '../../services/imposters.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DecorateHelpComponent } from './../help/decorate-help/decorate-help.component';
import { InjectionHelpComponent } from './../help/injection-help/injection-help.component';
import { js_beautify } from 'js-beautify';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';
import { ModalOptions } from 'ngx-bootstrap';

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
  matchTypes = ['matches', 'equals', 'contains', 'not equals', 'not contains'];

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

  }

  /**
   * used by imposter selector
   * @param index
   */
  selectImposter(index) {
    this.currentImposterIdx = index;
    this.currentResponseIdx = 0;
  }

  /**
   * the routine used by the html (input) entries
   * to update localstorage with each input event
   * @param item
   * @param event
   */
  inputChange(item, event) {
    this.save();
  }

  /**
   * call the imposter service save and write to local storage
   */
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

  /**
   * compose display string for the imposter selection buttons
   * @param idx
   */
  composeImposterAlias(idx) {
    const imposter = this.currentCollection.imposters[idx];
    let verb = imposter.match.verb;
    if (imposter.match.injection.use) {
      verb = 'INJ';
    }
    return 'Item ' + (idx + 1) + ' (' + verb + ')';
  }

  /**
   * add an imposter to the collection
   */
  addImposter() {
    const newImposter = this.impostersService.createNewImposter();
    this.currentCollection.imposters.push(newImposter);
    this.save();
  }


  /**
   * remove an imposter from the collection
   */
  deleteImposter() {
    const doDelete = confirm('Delete this Imposter?');
    if (doDelete) {
      this.currentCollection.imposters.splice(this.currentImposterIdx, 1);
      this.currentImposterIdx = 0;
      this.currentResponseIdx = 0;
      this.save();
    }

  }

  /**
   * used by ngFor for indexing loops
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return index;
  }

  /**
   * possible callback for response/match criteria tab selection
   * @param type
   */
  tabSelect(type) {
    // console.log(type);
  }

  /**
   * determine if a string is valid json
   * @param data
   * @returns true if valid json
   */
  isJsonString(data) {

    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
  /**
   * formats json
   * @param type which area to format responseBody or body section of match
   * @param pretty true if you want pretty printing
   */
  formatJson(type: string, pretty: boolean) {
    let ref = null;
    if (type === 'responseBody') {
      ref = this.currentCollection.imposters[this.currentImposterIdx].responses[this.currentResponseIdx];
    } else {
      ref = this.currentCollection.imposters[this.currentImposterIdx].match.body_match;
    }
    // body
    if (this.isJsonString(ref.body)) {
      const jRef = JSON.parse(ref.body);
      if (pretty === true) {
        ref.body = JSON.stringify(jRef, null, '  ');
      } else {
        ref.body = JSON.stringify(jRef);
      }

    }
    this.save();
  }

  /**
   * format the decorate section which is javascript as a string
   * @param currentResponse
   */
  formatDecorate(currentResponse) {
    if (!currentResponse.decorate) {
      currentResponse.decorate = '';
    }

    currentResponse.decorate = js_beautify(currentResponse.decorate);
    this.save();
  }

  /**
   * display the various help dialogs
   *
   * @param type
   */
  doHelpDisplay(type) {

    const initialState = {};


    if (type === 'injection') {
      this.bsModalRef = this.modalService.show(InjectionHelpComponent, { initialState });

    }
    if (type === 'decorate') {
      this.bsModalRef = this.modalService.show(DecorateHelpComponent, { initialState });

    }
  }

  /**
   * called when swapping to injection for the current response section
   * @returns {undefined}
   */
  swapInjectionForResponse() {

    if (this.currentCollection.imposters[this.currentImposterIdx].responses[this.currentResponseIdx].injection.use) {
      // blank out the current response
      this.currentCollection.imposters[this.currentImposterIdx].responses[this.currentResponseIdx] =
        this.impostersService.getSampleResponse();
      this.currentCollection.imposters[this.currentImposterIdx].responses[this.currentResponseIdx].injection.use = true;
      this.save();
    }
  }

  /**
   * called when swapping to injection for the match section
   *
   * @returns {undefined}
   */
  swapInjectionForMatch() {
    if (this.currentCollection.imposters[this.currentImposterIdx].match.injection.use) {
      const responseCopy = JSON.parse(JSON.stringify(this.currentCollection.imposters[this.currentImposterIdx].responses));
      this.currentCollection.imposters[this.currentImposterIdx] =
        this.impostersService.createNewImposter();
      this.currentCollection.imposters[this.currentImposterIdx].responses = responseCopy;
      this.currentCollection.imposters[this.currentImposterIdx].match.injection.use = true;
    }
    this.save();
  }
  /**
    * format the inection section which is javascript as a string
    * @param injectionSourceParent the pointer to which section has the text to format
    */
  formatInjection(injectionSourceParent) {
    injectionSourceParent.body = js_beautify(injectionSourceParent.body);
    this.save();
  }

  /**
   * delete a response
   */
  deleteResponse() {
    const doDelete = confirm('Delete this Response?');
    if (doDelete) {
      this.currentCollection.imposters[this.currentImposterIdx]
        .responses.splice(this.currentResponseIdx, 1);
      this.currentResponseIdx = 0;
    }
    this.save();
  }
  /**
   * add a response
   */
  addResponse() {
    this.currentCollection.imposters[this.currentImposterIdx]
      .responses.push(
        this.impostersService.getSampleResponse());
    this.currentResponseIdx = this.currentResponseIdx + 1;
    this.save();
  }
  /**
   * called when moving thru the responses
   * @param idx
   */
  moveResponseTo(idx) {

    this.currentResponseIdx = idx;
  }


  ////////// sorting /////////////////////////////

  /**
   * compose a label for the individual imposters in the sorting dialog
   * @param idx
   */
  composeSortAlias(idx) {
    const imposter = this.currentCollection.imposters[idx];
    let verb = imposter.match.verb;
    if (imposter.match.injection.use) {
      verb = 'INJ';
    }
    const labelText = imposter.documentation;
    return '(' + verb + ')\n' + labelText;

  }


  /**
   * display the sorting dialog
   *
   */
  sortImposters() {
    const me = this;
    const sortItems =
      me.currentCollection.imposters.map((data, idx) => {
        return { 'id': idx, 'ref': data, 'text': me.composeSortAlias(idx) };
      });


    const initialState: ModalOptions = {};
    initialState.class = 'main-sort-dialog';
    initialState.initialState = { sortItems: sortItems, containerRef: this };
    this.bsModalRef = this.modalService.show(SortDialogComponent, initialState);

  }
  /**
   * call back for the sort dialog
   * @param type ok/cancel
   * @param sortResult the sorted array
   */
  public processSort(type, sortResult) {
    const me = this;
    if (type === 'ok') {

      const newList = sortResult.map(s => {
        return s.ref;
      });
      me.currentCollection.imposters = newList;
      me.save();

    }
  }

}
