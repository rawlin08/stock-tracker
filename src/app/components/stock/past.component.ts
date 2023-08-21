import { Component } from '@angular/core';
import { StockComponent } from './stock.component';

@Component({
  selector: 'app-past',
  template: `
  <mat-tab-group fitInkBarToContent dynamicHeight class="remove-border-bottom">
    <mat-tab label="Dividends"><app-past-dividends></app-past-dividends></mat-tab>
    <mat-tab label="Splits"><app-past-splits></app-past-splits></mat-tab>
    <mat-tab label="Financials"><app-past-financials></app-past-financials></mat-tab>
  </mat-tab-group>
  `,
  styles: [``]
})
export class PastComponent {
  constructor(public stockComponent: StockComponent) {}
}
