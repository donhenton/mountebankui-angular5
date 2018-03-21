import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageModule } from '../modules/local-storage/local-storage.module';
import { ImpostersService } from './imposters.service';
import { LocalStorageService } from './local-storage.service';
import harness from './../../../testing/harness';

let lsService: LocalStorageService;
let imService: ImpostersService;

describe('ImpostersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpostersService, LocalStorageService],
      imports: [

        LocalStorageModule

      ],
    });
    lsService = TestBed.get(LocalStorageService);
    lsService.clear();
    imService = TestBed.get(ImpostersService);

    const collection = imService.getCollectionItems();
    if (collection.length === 1) {
      imService.createNewCollection();
      imService.setCollectionTo(0);
    }

  });

  it('should be created and initialized with default collection', () => {
    expect(imService).toBeTruthy();
    expect(lsService).not.toBeNull();
    const writtenToLS = lsService.get(ImpostersService.LS_KEY);
    expect(writtenToLS).not.toBeNull();


  });

  it('Should find current imposter', () => {

    const currentImposter = imService.getCurrentImposter();
    expect(currentImposter).not.toBeNull();


  });
  it('Should only be one item and be selected', () => {

    const collection = imService.getCollectionItems();
    expect(collection.length).toEqual(2);
    let item = collection[1];
    expect(item.id).toEqual(1);
    expect(item.description).toEqual('New Imposter Description 1');
    expect(item.selected).toBeFalsy();

    item = collection[0];
    expect(item.id).toEqual(0);
    expect(item.description).toEqual('New Imposter Description 0');
    expect(item.selected).toBeTruthy();


  });
  it('Should set to 2nd item', () => {
    imService.setCollectionTo(1);
    const collection = imService.getCollectionItems();
    expect(collection.length).toEqual(2);
    const item = collection[1];
    expect(item.id).toEqual(1);
    expect(item.description).toEqual('New Imposter Description 1');
    expect(item.selected).toBeTruthy();

    imService.setCollectionTo(0);
  });


  it('deleteCollection Test', () => {
    imService.setCollectionTo(0);
    imService.deleteCollectionAt(1);
    const collection = imService.getCollectionItems();
    expect(collection.length).toEqual(1);
    const item = collection[0];
    expect(item.id).toEqual(0);
    expect(item.description).toEqual('New Imposter Description 0');
    expect(item.selected).toBeTruthy();

  });


  it('Constructor finds load value', () => {
    const writtenToLS: any = lsService.get(ImpostersService.LS_KEY);
    const newService: ImpostersService = new ImpostersService(lsService);
    const items = newService.getCollectionItems();
    expect(items.length).toEqual(2);
  });




  it('Import/Export Test', () => {
    const collectionBeforeStr: string = imService.exportCollection();
    imService.setCollectionTo(0);
    imService.deleteCollectionAt(1);

    const exportedStuff = imService.exportCollection();

    const expectedStuffObj = harness.getHarness().imposterTest.newCollection;

    const expectedStuff: string = harness.stringify(expectedStuffObj);
    // console.log('exported\n\n\n' + exportedStuff + '\n\n\n');
    // console.log('expected\n\n\n' + expectedStuff + '\n\n\n');
    // console.log(typeof expectedStuff);
    const dist = harness.getEditDistance(exportedStuff, expectedStuff);
    expect(dist).toEqual(0);

    // now put it back
    // console.log(typeof collectionBeforeStr);
    imService.importCollection(collectionBeforeStr);
    const collection = imService.getCollectionItems();
    expect(collection.length).toEqual(2);

  });

});
