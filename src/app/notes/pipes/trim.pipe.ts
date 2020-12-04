import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
})
export class TrimPipe implements PipeTransform {
  public transform(value: string, maxLength: number): string {
    const dots = '...';

    if (value.length <= maxLength) {
      return value;
    }

    return value.substring(0, maxLength) + dots;
  }
}
