import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialChar',
  standalone: true
})
export class RemoveSpecialCharPipe implements PipeTransform
{

  transform(value: string, ...args: unknown[]): string
  {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
