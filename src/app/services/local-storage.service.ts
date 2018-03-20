import { Injectable, Inject } from '@angular/core';
import { ILocalStorage } from './ilocal-storage';

@Injectable()
export class LocalStorageService implements ILocalStorage {

  private MOUNTEBANK_KEY = 'ls.mountebank_collection';
  // store under key ls.mountebank_collection
  constructor(@Inject('LOCALSTORAGE') private localStorage) {

  }


  set(key: string, item: Array<Object> | Object) {

    localStorage.setItem(key, JSON.stringify(item));
  }
  get(key: string): Object | Array<Object> {

    const r: string = localStorage.getItem(key);
    return JSON.parse(r);
  }

}
