import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dimension'
})
export class DimensionPipe implements PipeTransform {

  transform(figurine: any): string {
    if (!figurine) return '';

    let dimensions = [];
    if (figurine.dimensionY) dimensions.push(`Höhe: ${figurine.dimensionY}`);
    if (figurine.dimensionX) dimensions.push(`Breite: ${figurine.dimensionX}`);
    if (figurine.dimensionZ) dimensions.push(`Tiefe: ${figurine.dimensionZ}`);

    return dimensions.join(' | ');

  }
}
