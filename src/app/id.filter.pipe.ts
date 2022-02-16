import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idfilter',
  pure: false,
})
export class idFilterPipe implements PipeTransform {
  transform(value: any, filterNumber: number): any {
    if (value.length === 0) {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item.id == filterNumber) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
