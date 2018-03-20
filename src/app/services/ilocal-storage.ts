export interface ILocalStorage {
    set(key: string, item: any | Array<any>)  ;
    get(key: string): any | Array<any>;

}
