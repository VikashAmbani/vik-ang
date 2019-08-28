import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vlang'
})
export class VlangPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
