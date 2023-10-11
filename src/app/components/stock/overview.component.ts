import { Component } from '@angular/core';
import { StockComponent } from './stock.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-overview',
  template: `
  <div *ngIf="stockComponent.stock.snapshot.min">
    <div class="container" *ngIf="stockComponent.stock.snapshot.day">
      <div class="col">
        <div>
          <h4>Open</h4>
          <p>{{ stockComponent.stock.snapshot.day.o ? stockComponent.stock.snapshot.day.o.toFixed(2) : '--' }}</p>
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
      <div class="col">
        <div>
          <h4>Prev Close</h4>
          <p>{{ stockComponent.stock.snapshot.prevDay.c ? stockComponent.stock.snapshot.prevDay.c.toFixed(2) : '--' }}</p>
        </div>
        <div>
          <h4>Volume</h4>
          <p>{{ stockComponent.stock.snapshot.day.v ? app.numToWord(stockComponent.stock.snapshot.day.v) : '--' }}</p>
        </div>
        <div>
          <h4>Prev Volume</h4>
          <p>{{ stockComponent.stock.snapshot.prevDay.v ? app.numToWord(stockComponent.stock.snapshot.prevDay.v) : '--' }}</p>
        </div>
      </div>
      <div class="col">
        <div *ngIf="stockComponent.stock.details.market_cap">
          <h4>Market Cap</h4>
          <p>{{ app.numToWord(stockComponent.stock.details.market_cap) }}</p>
        </div>
        <div>
          <h4>52 Week High</h4>
          <p>253.92</p>
        </div>
        <div>
          <h4>52 Week Low</h4>
          <p>101.53</p>
        </div>
      </div>
    </div>
  </div>
  
  `,
  styles: [`
  .container {
    display: grid;
    margin: 10px 0;
    gap: 15px;
    padding: 20px;
  }
  .col {
    width: 100%;
    display: grid;
    gap: 10px;
  }
  .col > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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
