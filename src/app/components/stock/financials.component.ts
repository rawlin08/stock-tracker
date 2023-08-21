import { Component } from '@angular/core';
import { StockComponent } from './stock.component';

@Component({
  selector: 'app-financials',
  template: `
  <h2>Financials</h2>
  <div *ngIf="!stockComponent.stock.financials[0]">
    <p>No Financial Data Found</p>
  </div>
  <div class="MRSplit" *ngIf="stockComponent.stock.financials[0]">
    <div>
      <h3>Balance Sheet</h3>

    </div>
    <div>
      <h3>Income Statement</h3>
    </div>
    <div>
      <h3>Cash Flow</h3>
    </div>
  </div>
  `,
  styles: [``]
})
export class FinancialsComponent {
  constructor(public stockComponent: StockComponent) {}
}
