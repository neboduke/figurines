import {Injectable, Input, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from '../interfaces/sort-event';
import { Chronology } from '../entity/chronology';
import { ChronologyService } from './chronology.service';
import { HttpErrorResponse } from '@angular/common/http';


interface SearchResult {
  chronologies: Chronology[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | undefined , v2: string | number | undefined) => 
                (v1 === undefined || v2 === undefined) ? 0 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(chronologies: Chronology[], column: SortColumn, direction: string): Chronology[] {
  if (direction === '' || column === '') {
    return chronologies;
  } else {
    return [...chronologies].sort((a, b) => {
      //column = column == undefined?'':column;
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
    console.log('----SORT OTHERS ---')
    return chronologies;
  }
}

function matches(chronology: Chronology, term: string, pipe: PipeTransform) {
  return chronology.name?.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(chronology.yearFrom!=null?chronology.yearFrom:0).includes(term)
    || pipe.transform(chronology.yearTo!=null?chronology.yearTo:0).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class ChronologySortService {
  chronologiesFromService: Chronology[] = [];
  
  private _loading = new BehaviorSubject<boolean>(true);
  private _search = new Subject<void>();
  private _chronologies = new BehaviorSubject<Chronology[]>([]);
  private _total = new BehaviorSubject<number>(0);


  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private chronologyService: ChronologyService,private pipe: DecimalPipe) {
    console.log('---- CONSTRUCTOR SORT SERVICE---')
    
    this.getChronologiesX();
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
      this._chronologies.next(result.chronologies);
      this._total.next(result.total);
    });

    this._search.next();

  }

  get chronologies() { return this._chronologies.asObservable(); }
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
    let chronologies = sort(this.chronologiesFromService, sortColumn, sortDirection);

    // 2. filter
    chronologies= chronologies.filter(c => matches(c, searchTerm, this.pipe));
    const total = chronologies.length;
    console.log('---TOTAL:' + total + '---');

    // 3. paginate
    chronologies = chronologies.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({chronologies, total});
  }

  
  
  public getSortChronologies(): Observable<Chronology[]>{
    return this.chronologies;
  }
  
  private getChronologiesX():void{
    this.chronologyService.getChronologies().subscribe(
        responseData => {
            this.chronologiesFromService = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
}

