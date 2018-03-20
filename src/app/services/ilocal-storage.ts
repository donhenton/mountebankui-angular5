export interface ILocalStorage {
    set(key: string, item: object | Array<object>)  ;
    get(key: string): object | Array<object>;

}
