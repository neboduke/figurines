import { Location } from "../entity/location";

export interface LocationFormResult {
    location: Location | undefined;
    crudType: string;
    status: boolean;
}
