import {Injectable, Input, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/directives/sortable.directive';
import { Literature } from '../entity/literature';
import { LiteratureService } from './literature.service';
import { HttpErrorResponse } from '@angular/common/http';
import { State } from '../interfaces/state';

interface SearchResult {
  literature: Literature[];
  total: number;
}

const compare = (v1: string | number | Literature | undefined , v2: string | number | undefined) => 
                (v1 === undefined || v2 === undefined) ? 0 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(literature: any[], column: SortColumn, direction: string): Literature[] {
  if (direction === '' || column === '') {
    return literature;
  } else {
    return [...literature].sort((a, b) => {
      //column = column == undefined?'':column;
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
    console.log('----SORT OTHERS ---')
    return literature;
  }
}

function matches(literature: Literature, term: string, pipe: PipeTransform) {
  return literature.author?.toLowerCase().includes(term.toLowerCase()) 
    || literature.title?.toLowerCase().includes(term.toLowerCase());
    //|| literature.parentLiterature?.title!.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class LiteratureSortService {

  literatureFromService: Literature[] = [];
  
  private _loading = new BehaviorSubject<boolean>(true);
  private _search = new Subject<void>();
  private _literature = new BehaviorSubject<Literature[]>([]);
  private _total = new BehaviorSubject<number>(0);


  private _state: State = {
    page: 1,
    pageSize: 50,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private literatureService: LiteratureService,private pipe: DecimalPipe) {
    console.log('---- CONSTRUCTOR SORT SERVICE---')
    
    this.getLiteratureX();
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
      this._literature.next(result.literature);
      this._total.next(result.total);
    });

    this._search.next();

  }

  get literature() { return this._literature.asObservable(); }
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
    let literature = sort(this.literatureFromService, sortColumn, sortDirection);

    // 2. filter
    literature= literature.filter(c => matches(c, searchTerm, this.pipe));
    const total = literature.length;
    console.log('---TOTAL:' + total + '---');

    // 3. paginate
    literature = literature.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({literature, total});
  }

  
  
  /*public getSortLiterature(): Observable<Literature[]>{
    return this.literature;
  }*/
  
  private getLiteratureX():void{
    this.literatureService.getLiterature().subscribe(
        responseData => {
            this.literatureFromService = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
}
