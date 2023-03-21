import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValues'
})
export class EnumValuesPipe implements PipeTransform {

  transform(value: any): any[] {
    return Object.keys(value)
      .filter(e => !isNaN(+e))
      .map(o => ({ index: +o, name: value[o] }));
  }
}
