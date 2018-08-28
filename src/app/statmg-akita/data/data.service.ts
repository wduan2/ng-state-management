import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable, timer } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { Product } from './product';
import { ProductDetails } from './product-details';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    /** mock data */
    private mockProducts = [
        {
            id: 1,
            name: 'Javscript',
        } as Product,
        {
            id: 2,
            name: 'Angular',
        } as Product,
        {
            id: 3,
            name: 'Spring Boot',
        } as Product
    ];

    private mockProductDetails = [
        {
            productId: 1,
            desc: 'JavaScript, often abbreviated as JS, is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.',
            rate: 5
        } as ProductDetails,
        {
            productId: 2,
            desc: 'Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.',
            rate: 4
        } as ProductDetails,
        {
            productId: 3,
            desc: "Spring Boot is a lightweight framework that takes most of the work out of configuring Spring-based applications. In this tutorial, you'll learn how to use Spring Boot's starters, opinions, and executable JAR file structure to quickly create Spring-based applications that \"just run.\"",
            rate: 3
        } as ProductDetails,
    ];
    /** mock data */

    getProducts(): Observable<Product[]> {
        return timer(2000).pipe(
            mapTo(this.mockProducts)
        );
    }

    getProductDetails(productId: ID): Observable<ProductDetails> {
        return timer(2000).pipe(
            map(() => {
                return this.mockProductDetails.find((d) => d.productId === productId);
            })
        );
    }
}
