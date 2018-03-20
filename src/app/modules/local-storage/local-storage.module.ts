import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
]
})
export class LocalStorageModule { }


export function getLocalStorage() {
  return (typeof window !==  'undefined') ? window.localStorage : null;
}
