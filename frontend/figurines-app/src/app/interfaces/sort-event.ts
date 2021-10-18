import { Chronology } from "../entity/chronology";
import { Location } from "../entity/location";

export type SortColumn = keyof Chronology  | '';
export type SortDirection = 'asc' | 'desc' | '';
//const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}
