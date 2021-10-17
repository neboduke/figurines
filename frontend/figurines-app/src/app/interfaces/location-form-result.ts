import { Location } from "../entity/location";

export interface LocationFormResult {
    chronology: Location | undefined;
    crudType: string;
    status: boolean;
}
