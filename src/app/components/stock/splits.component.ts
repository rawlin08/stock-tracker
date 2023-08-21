import { Component } from '@angular/core';
import { StockComponent } from './stock.component';

@Component({
  selector: 'app-splits',
  template: `
  <h2>Splits</h2>
  <div *ngIf="!stockComponent.stock.splits[0]">
    <p>No Split Data Found</p>
  </div>
  <div class="MRSplit" *ngIf="stockComponent.stock.splits[0]">
    <div>
      <p>Split Ratio</p>
      <p>Execution Date</p>
    </div>
    <div>
      <p>{{ stockComponent.stock.splits[0].split_to }} for {{ stockComponent.stock.splits[0].split_from }}</p>
      <p>{{ stockComponent.stock.splits[0].execution_date }}</p>
    </div>
  </div>
  `,
  styles: [`
  .MRSplit {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .MRSplit > div:nth-child(2) {
    text-align: right;
  }
  `]
})
export class SplitsComponent {
  constructor(public stockComponent: StockComponent) {}
}
