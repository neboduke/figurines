import { Figurine } from "../entity/figurine";

export interface FigurineFormResult {
    literature?: Figurine ;
    crudType: string;
    status: boolean;
}
