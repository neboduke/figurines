import { Figurine } from "./figurine";

export class Image {
    imageId!: number;
    imagePath?: string;
    imageTitle?: string;
    imageBase64?: string;
    imageSource?: string;
    figurine?: Figurine;
}
