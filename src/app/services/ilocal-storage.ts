export interface ILocalStorage {
    set(key: string, item: any | Array<any>)  ;
    get(key: string): any | Array<any>;
    setPrefix(ps: string);
    clear();
    removeItem(key: string);
}
