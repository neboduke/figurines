import {Directive, EventEmitter, Input, Output} from '@angular/core';

import { SortEvent } from '../interfaces/sort-event';
import { SortColumn } from '../interfaces/sort-event';
import { SortDirection } from '../interfaces/sort-event';

/*
--- went to sort-event interface---
export type SortColumn = keyof Chronology | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}*/

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableDirective {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate_directions: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

  rotate() {
    this.direction = this.rotate_directions[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
