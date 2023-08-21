import { Component } from '@angular/core';
import { StockComponent } from './stock.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-overview',
  template: `
  <div *ngIf="stockComponent.stock.snapshot.min">
    <h3>Today ({{ app.getDate(stockComponent.stock.snapshot.min.t).today }})</h3>
    <div class="container" *ngIf="stockComponent.stock.snapshot.day">
      <div>
        <h4>Open</h4>
        <p>{{ stockComponent.stock.snapshot.day.o ? stockComponent.stock.snapshot.day.o.toFixed(2) : '--' }}</p>
      </div>
      <div>
        <h4>Close</h4>
        <p>{{ stockComponent.stock.snapshot.day.c ? stockComponent.stock.snapshot.day.c.toFixed(2) : '--' }}</p>
      </div>
      <div>
        <h4>Volume</h4>
        <p>{{ stockComponent.stock.snapshot.day.v ? app.numToWord(stockComponent.stock.snapshot.day.v) : '--' }}</p>
      </div>
      <div>
        <h4>High</h4>
        <p>{{ stockComponent.stock.snapshot.day.h ? stockComponent.stock.snapshot.day.h.toFixed(2) : '--' }}</p>
      </div>
      <div>
        <h4>Low</h4>
        <p>{{ stockComponent.stock.snapshot.day.l ? stockComponent.stock.snapshot.day.l.toFixed(2) : '--' }}</p>
      </div>
    </div>
    <h3>Previous Open Day ({{ app.getDate(stockComponent.stock.snapshot.min.t).yesterday }})</h3>
    <div class="container" *ngIf="stockComponent.stock.snapshot.prevDay">
      <div>
        <h4>Open</h4>
        <p>{{ stockComponent.stock.snapshot.prevDay.o ? stockComponent.stock.snapshot.prevDay.o.toFixed(2) : '--' }}</p>
      </div>
      <div>
        <h4>Close</h4>
        <p>{{ stockComponent.stock.snapshot.prevDay.c ? stockComponent.stock.snapshot.prevDay.c.toFixed(2) : '--' }}</p>
      </div>
      <div>
        <h4>Volume</h4>
        <p>{{ stockComponent.stock.snapshot.prevDay.v ? app.numToWord(stockComponent.stock.snapshot.prevDay.v) : '--' }}</p>
      </div>
      <div>
        <h4>High</h4>
        <p>{{ stockComponent.stock.snapshot.prevDay.h ? stockComponent.stock.snapshot.prevDay.h.toFixed(2) : '--' }}</p>
      </div>
      <div>
        <h4>Low</h4>
        <p>{{ stockComponent.stock.snapshot.prevDay.l ? stockComponent.stock.snapshot.prevDay.l.toFixed(2) : '--' }}</p>
      </div>
    </div>
    <h3>Overall</h3>
    <div class="container">
      <div>
        <h4>52 Week High</h4>
        <p></p>
      </div>
      <div>
        <h4>52 Week Low</h4>
        <p></p>
      </div>
      <div *ngIf="stockComponent.stock.details.market_cap">
        <h4>Market Cap</h4>
        <p>{{ app.numToWord(stockComponent.stock.details.market_cap) }}</p>
      </div>
    </div>
  </div>
  
  `,
  styles: [`
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px);
    margin: 10px 0;
    gap: 10px;
  }
  h3:first-child {
    margin: 10px 0 0 0;
  }
  `]
})
export class OverviewComponent {
new: any;
  constructor(public stockComponent: StockComponent, public app: AppComponent) {}
}
