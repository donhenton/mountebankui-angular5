import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImpostersService } from '../../services/imposters.service';

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
  currentImposterItemIndex;

  constructor(private impostersService: ImpostersService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.currentCollection = this.impostersService.getCurrentImposter();
    this.currentCollectionIdx = this.currentCollection.id; // the index into the collection array
    this.collectionSelectorIdx = this.currentCollectionIdx.toString();
    this.collectionItems = this.impostersService.getCollectionItems();
    this.currentImposterItemIndex = 0;
    this.homeForm = this.fb.group(this.getFromCurrentImposter());

    this.homeForm
      .valueChanges
      .subscribe(this.sendToCurrentImposter.bind(this));

   // console.log(JSON.stringify(this.currentCollection.imposters[0]));
  }

  selectImposter(index) {
    this.currentImposterItemIndex = index;
    this.homeForm.setValue(this.getFromCurrentImposter());
  }

  getFromCurrentImposter() {
    return {

      collectionSelectorIdx: this.collectionSelectorIdx,
      documentation: this.currentCollection.imposters[this.currentImposterItemIndex].documentation
    };
  }

  /**
   * handle form data changes
   * @param data
   */
  sendToCurrentImposter(data) {
     const merged = { ... this.currentCollection, ...data };
     this.currentCollection = merged;
    console.log(`1\n\n ${JSON.stringify(this.currentCollection)}`);
    this.impostersService.update(this.currentCollectionIdx, merged);
     this.collectionItems = this.impostersService.getCollectionItems();

  }

  /**
   * handle the collection change events
   * @param ev
   */
  changeCollection() {

    this.collectionSelectorIdx = this.homeForm.get('collectionSelectorIdx').value;
    this.currentImposterItemIndex = 0;
    this.currentCollectionIdx = parseInt(this.collectionSelectorIdx, 10);
    this.impostersService.setCollectionTo(this.currentCollectionIdx);
    this.currentCollection = this.impostersService.getCurrentImposter();
    this.homeForm.setValue(this.getFromCurrentImposter());

  }

  composeImposterAlias (idx) {
      const imposter  = this.currentCollection.imposters[idx];
       let verb = imposter.match.verb;
      if (imposter.match.injection.use) {
          verb = 'INJ';
       }
      return 'Item ' + (idx + 1) + ' (' + verb + ')';
  }


  composeSortAlias(idx) {
    const imposter  = this.currentCollection.imposters[idx];
    let verb = imposter.match.verb;
    if (imposter.match.injection.use) {
        verb = 'INJ';
    }
    const labelText = imposter.documentation;
    return  '(' + verb + ')\n' + labelText ;

  }

  addImposter() {

  }

  sortImposters() {

  }

  deleteImposter() {


  }

  trackByFn(index, item) {
    return index;
  }

}
