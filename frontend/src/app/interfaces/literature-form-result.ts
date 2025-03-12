import { Literature } from "../entity/literature";
export interface LiteratureFormResult {
    literature: Literature | undefined;
    crudType: string;
    status: boolean;
}
