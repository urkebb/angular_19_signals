import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, linkedSignal, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PRODUCTS } from "./products";

@Component({
	selector: "app-root",
	imports: [CommonModule, RouterModule],
	standalone: true,
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	readonly products = signal(PRODUCTS.slice(0, 5));

	readonly selectedProduct = linkedSignal<string[], string>({
		source: this.products,
		computation: (products, prev) => {
			if (!prev) return products[0];
			if (products.includes(prev.value)) return prev.value;
			return products.at(-1) ?? products[0];
		}
	});

	addProduct(): void {
		this.products.update((products) => {
			const index = products.length;

			return PRODUCTS[index] ? [...products, PRODUCTS[index]] : products;
		});
	}

	removeProduct(): void {
		this.products.update((products) => products.slice(0, -1));
	}

	nextProduct(): void {
		this.selectedProduct.update((selected) => {
			const index = (this.products().indexOf(selected) + 1) % this.products().length;
			return this.products()[index];
		});
	}

	prevProduct(): void {
		this.selectedProduct.update((selected) => {
			const index = (this.products().indexOf(selected) - 1 + this.products().length) % this.products().length;
			return this.products()[index];
		});
	}
}
