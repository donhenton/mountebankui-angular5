import { Injectable, Inject } from '@angular/core';
import { ILocalStorage } from './ilocal-storage';

@Injectable()
export class LocalStorageService implements ILocalStorage {

  private preFix = '';

  // store under key ls.mountebank_collection
  constructor(@Inject('LOCALSTORAGE') private localStorage) {

  }

  setPrefix(ps: string) {

      this.preFix = ps;

  }

  clear() {
    localStorage.clear();

  }

  removeItem(key: string) {

    this.localStorage.removeItem(`${this.preFix}.${key}`);
  }

  set(key: string, item: Array<any> | any) {

    localStorage.setItem(`${this.preFix}.${key}`, JSON.stringify(item));
  }
  get(key: string): any | Array<any> {

    const r: string = localStorage.getItem(`${this.preFix}.${key}`);
    return JSON.parse(r);
  }

}
