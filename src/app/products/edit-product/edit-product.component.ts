import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product!: any;
  image:any;
  editProdForm!: FormGroup;
  constructor(private route: ActivatedRoute,private router:Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'].product;
    this.image = this.product.image_url;
    this.editProdForm! = new FormGroup({
      'name': new FormControl(this.product.name, [Validators.required]),
      'price': new FormControl(this.product.price, [Validators.required, Validators.min(1)]),
      'description': new FormControl(this.product.description, [Validators.required]),
      'amount': new FormControl(this.product.amount, [Validators.required, Validators.min(0)]),
      'tag': new FormControl(this.product.tag,[Validators.required]),
      'visible': new FormControl(this.product.visible, [Validators.required]),
      'image_url': new FormControl(this.image),
    });
  }

  editProduct(){
    let form_values = this.editProdForm.value;
    if(this.editProdForm.valid){
      this.productService.editProduct(this.product.id,form_values['name'],form_values['price'],form_values['description'],form_values['amount'],form_values['image_url'],form_values['tag'], form_values['visible']).subscribe({
        next: (re)=> {
          console.log(re);
          this.router.navigate(['/products']).then(() => {
            window.location.reload();
          });
        },
        error: error => {
          console.log(error);
        },
      })
    }

  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      console.log(reader.result as string);
      this.image = reader.result as string;
      this.editProdForm.patchValue({
        'image_url': this.image
      })
  });
 }
}
