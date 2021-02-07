import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  catagoryId: number;

  products: Product[];
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {
    const hasCatagory: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCatagory) {
      //+ is used to convert string to number
      this.catagoryId = +this.route.snapshot.paramMap.get("id");
    } else {
      this.catagoryId = 1;
    }

    this.productService.getProductList(this.catagoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
