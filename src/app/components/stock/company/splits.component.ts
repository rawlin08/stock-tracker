import { Component } from '@angular/core';
import { StockComponent } from '../stock.component';

@Component({
  selector: 'app-splits',
  template: `
  <div class="container">
    <div class="heading" routerLink="past/splits">
      <h2>Splits</h2>
      <svg class="arrowIcon"><use href="#arrowRightIcon"></use></svg>
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
