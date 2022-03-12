import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'productFind'
})
export class ProductFindPipe implements PipeTransform {

  transform(products: Product[], filterByName: string, filterByTag:string): Product[] {
    let products_new:Product[] = products;
    const filterName = filterByName && filterByName ? filterByName.toLocaleLowerCase() : null;
    const filterTag = filterByTag && filterByTag ? filterByTag.toLocaleLowerCase() : null;
    if (filterName) {
      products_new =  products.filter(product => product.name.toLocaleLowerCase().includes(filterName))
    }
    if(filterTag != null && filterTag != 'todo'){
      products_new  = products_new.filter(product => product.tag.toLocaleLowerCase().includes(filterTag))
    }
    return products_new;
  }
}
