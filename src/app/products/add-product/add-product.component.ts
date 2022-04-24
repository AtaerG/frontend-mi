import { Component, createNgModuleRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  image:any;
  addProdForm!: FormGroup;

  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.addProdForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.min(1)]),
      'description': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.min(0)]),
      'tag': new FormControl('salon', [Validators.required]),
      'image_url': new FormControl(null, Validators.required),
    });
  }

  createProduct(){
    let form_values = this.addProdForm.value;
    if(this.addProdForm.valid){
      console.log(form_values['image_url'])
      this.productService.addProduct(form_values['name'],form_values['price'],form_values['description'],form_values['amount'],form_values['image_url'],form_values['tag']).subscribe({
        next: ()=> {
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
      this.addProdForm.patchValue({
        'image_url': this.image
      })
    });
    }


}
