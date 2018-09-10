import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string;
    
    _lsitFilter: string;
    get listFilter(): string {
        return this._lsitFilter;
    }
    set listFilter(value:string) {
        this._lsitFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
        this.listFilter = '';
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }


    toggleImage():void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProduct().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },    
            error => this.errorMessage = <any>error
        );
    }
}