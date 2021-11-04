import { SortColumn } from "../directives/sortable.directive";
import { SortDirection } from "../directives/sortable.directive";

export interface State {
        page: number;
        pageSize: number;
        searchTerm: string;
        sortColumn: SortColumn;
        sortDirection: SortDirection;
}
