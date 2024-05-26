import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Iproduct[],term:string): Iproduct[] {
    return products.filter((item) =>item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
