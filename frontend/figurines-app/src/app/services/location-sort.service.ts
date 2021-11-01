import {Injectable, Input, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/directives/sortable.directive';
import { Location } from '../entity/location';
import { LocationService } from './location.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from '../entity/country';


interface SearchResult {
  locations: Location[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number  | undefined , v2: string | number | undefined) => 
                (v1 === undefined || v2 === undefined) ? 0 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(locations: any[], column: SortColumn, direction: string): Location[] {
  if (direction === '' || column === '') {
    return locations;
  } else {
    return [...locations].sort((a, b) => {
      //column = column == undefined?'':column;
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
    console.log('----SORT OTHERS ---')
    return locations;
  }
}

function matches(location: Location, term: string, pipe: PipeTransform) {
  return location.name?.toLowerCase().includes(term.toLowerCase())
    || location.place?.toLowerCase().includes(term.toLowerCase())
    || location.country?.name!.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class LocationSortService {
  locationsFromService: Location[] = [];
  
  private _loading = new BehaviorSubject<boolean>(true);
  private _search = new Subject<void>();
  private _locations = new BehaviorSubject<Location[]>([]);
  private _total = new BehaviorSubject<number>(0);


  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private locationService: LocationService,private pipe: DecimalPipe) {
    console.log('---- CONSTRUCTOR SORT SERVICE---')
    
    this.getLocationsX();
    this.start();

  }

  public  start(): void{
    console.log('---- START SORT SERVICE---')
    this._search.pipe(
      tap(() => this._loading.next(true)),
      debounceTime(200),
      switchMap(() => this.searchMethod()),
      delay(200),
      tap(() => this._loading.next(false))
    ).subscribe(result => {
      this._locations.next(result.locations);
      this._total.next(result.total);
    });

    this._search.next();

  }

  get locations() { return this._locations.asObservable(); }
  get total() { return this._total.asObservable(); }
  get loading() { return this._loading.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search.next();
  }

  private searchMethod(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let locations = sort(this.locationsFromService, sortColumn, sortDirection);

    // 2. filter
    locations= locations.filter(c => matches(c, searchTerm, this.pipe));
    const total = locations.length;
    console.log('---TOTAL:' + total + '---');

    // 3. paginate
    locations = locations.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({locations, total});
  }

  
  
  public getSortLocations(): Observable<Location[]>{
    return this.locations;
  }
  
  private getLocationsX():void{
    this.locationService.getLocations().subscribe(
        responseData => {
            this.locationsFromService = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
}
