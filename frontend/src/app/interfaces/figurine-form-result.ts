import { Figurine } from "../entity/figurine";

export interface FigurineFormResult {
    figurine?: Figurine ;
    crudType: string;
    status: boolean;
}
