import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ImpostersService {

  public static  readonly LS_KEY = 'mountebank_collection';
  private currentCollectionIdx = 0;
  private collection = [];

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
                'injection': { 'use': false, 'body': ''},
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
            'injection': { 'use': false, 'body': ''} ,
            'headers': [],
            'body': ''

        };
    }

  save() {
    this.localStorageService.set(ImpostersService.LS_KEY, this.collection);
  }


}
