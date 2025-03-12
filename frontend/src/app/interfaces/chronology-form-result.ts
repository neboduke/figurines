import { Chronology } from "../entity/chronology";


export interface ChronologyFormResult {
  chronology: Chronology | undefined;
  crudType: string;
  status: boolean;
}