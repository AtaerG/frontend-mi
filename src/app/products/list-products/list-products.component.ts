import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[] = [];
  filterSearchProduct:string = '';
  filterForm!: FormGroup;
  filterFormString:string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.products = this.route.snapshot.data['products'];
    this.filterForm = new FormGroup({
      'filter': new FormControl('todo')
    });
  }

  aplicarFiltro(){
    if(this.filterForm.valid){
      let form_values = this.filterForm.value;
      this.filterFormString = form_values['filter'];
    }
  }

}
