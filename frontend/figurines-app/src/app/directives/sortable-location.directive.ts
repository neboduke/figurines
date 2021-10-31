
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Location } from '../entity/location';


export type SortLocationColumn = keyof Location | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortLocationEvent {
    column: SortLocationColumn;
    direction: SortDirection;
}

@Directive({
  selector: 'th[sortableLocation]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class SortableLocationDirective {

  @Input() sortableLocation: SortLocationColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sortLocation = new EventEmitter<SortLocationEvent>();

  rotate_directions: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

  rotate() {
    this.direction = this.rotate_directions[this.direction];
    this.sortLocation.emit({column: this.sortableLocation, direction: this.direction});
  }

}
