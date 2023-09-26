import { Component } from '@angular/core';
import { StockComponent } from '../stock.component';

@Component({
  selector: 'app-company',
  template: `
  <app-about></app-about>
  <app-mrdividend *ngIf="stockComponent.stock.dividends[0]"></app-mrdividend>
  <app-splits *ngIf="stockComponent.stock.splits[0]"></app-splits>
  <app-financials *ngIf="stockComponent.stock.financials[0]"></app-financials>
  `,
  styles: [``]
})
export class CompanyComponent {
  constructor(public stockComponent: StockComponent) {}

}
