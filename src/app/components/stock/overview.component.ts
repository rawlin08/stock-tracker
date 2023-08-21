import { Component } from '@angular/core';
import { StockComponent } from './stock.component';

@Component({
  selector: 'app-overview',
  template: `
  <h1>hello im overview</h1>
  `,
  styles: []
})
export class OverviewComponent {
  constructor(public stockComponent: StockComponent) {}
}
