import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutting',
  standalone: true
})
export class CuttingPipe implements PipeTransform {

  transform(text: string,limit:number): string {
   return text.split(' ').slice(0,limit).join(' ');
    
  }

}
