import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ImpostersService {

  public static readonly LS_KEY = 'mountebank_collection';
  private currentCollectionIdx = 0;
  private collection: any[] = [];

  constructor(private localStorageService: LocalStorageService) {
    const ls = this.localStorageService.get(ImpostersService.LS_KEY);
    if (ls !== null) {
      this.collection = ls;
    } else {
      this.createNewCollection();

    }

  }

  createNewCollection() {
    const newCollection: any = {};
    const newIdx = this.collection.length;
    newCollection.port = 9999;
    newCollection.useCORs = false;
    newCollection.CORsOrigin = 'http://localhost:8383';
    newCollection.allowedCORsHeaders = 'application/json,Content-Type';
    newCollection.allowedCORsMethods = 'GET,POST,PUT,PATCH,DELETE';
    newCollection.id = newIdx;
    newCollection.description = 'New Imposter Description ' + newIdx;
    newCollection.imposters = [];

    const newImposter = this.createNewImposter();
    newCollection.imposters.push(newImposter);


    this.collection.push(newCollection);
    this.currentCollectionIdx = newIdx;
    this.save();

  }

  createNewImposter() {
    const newImposter: any = {};
    const newResponse = this.getSampleResponse();
    newImposter.responses =
      [newResponse];
    newImposter.match = {
      'path_match': {
        'type': 'equals',
        'value': 'path'
      },
      'injection': { 'use': false, 'body': '' },
      'verb': 'GET',
      'headers': [],
      'query_params': [],
      'body_match':
        {
          'type': 'equals',
          'body': ''
        }
    };

    return newImposter;
  }

  getSampleResponse() {
    return {
      'status': 200,
      'injection': { 'use': false, 'body': '' },
      'headers': [],
      'body': ''

    };
  }

  save() {
    this.localStorageService.set(ImpostersService.LS_KEY, this.collection);
  }

  getCurrentImposter() {

    return this.collection[this.currentCollectionIdx];

  }

  getCollectionItems() {
    const items = [];
    let cc = 0;
    const me = this;
    this.collection.forEach(function (data) {
      const i: any = {};
      i.id = cc;
      i.selected = false;
      if (cc === me.currentCollectionIdx) {
        i.selected = true;
      }
      i.description = data.description;
      items.push(i);
      cc = cc + 1;
    });

    return items;
  }

  deleteCollectionAt(idx) {
    // $log.debug("splice at "+idx+" "+collection.length)
    this.collection.splice(idx, 1);
    // $log.debug("collection now "+collection.length)
    this.save();
  }

  /**
   * set the new index into the collection
   * @param {type} newIdx
   * @returns {undefined}
   */
  setCollectionTo(newIdx) {
    this.currentCollectionIdx = newIdx;
  }

  exportCollection(): string {
    return  JSON.stringify(this.collection);

  }

  importCollection(collectionAsString: string) {
    this.collection = JSON.parse(collectionAsString);
    // save should occur through the watch
  }

}
