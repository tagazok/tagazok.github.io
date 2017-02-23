import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    const filter = args;
    return value;
    // return value.filter(item => item.title.indexOf(args[0].title) !== -1);
  }
}
