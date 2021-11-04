import { Carrier } from "./carrier";
import { Chronology } from "./chronology";
import { Literature } from "./literature";
import { Location } from "./location";
import { Material } from "./material";

export class Figurine {
    figurineId: number | undefined;
    title: string | undefined ;
    descriptionIconography: string | undefined;
    descriptionIconology: string | undefined;
    dateAbs: number | undefined;
    materialDescription: string | undefined;
    exibitNr: string | undefined;
    keyword: string | undefined;
    chronology: Chronology | undefined;
    materials: Material[] | undefined ;
    literature: Literature[] | undefined;
    carrier: Carrier | undefined;
    location: Location | undefined;
    exibitLocation: Location | undefined;
    image: string | undefined;
    imageUrl: string | undefined;
    motif: string | undefined;
}
