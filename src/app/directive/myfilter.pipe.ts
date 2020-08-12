import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyfilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (filter["search"] == "") {
      return items;
    } else {
      let temp = [];
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < filter["searchCol"].length; j++) {
          if (items[i][filter["searchCol"][j]].toString().toLowerCase().indexOf(filter["search"].toLowerCase()) !== -1) {
            temp.push(items[i]);
            break;
          }
        }
      }
      return temp;
    }

  }

}
