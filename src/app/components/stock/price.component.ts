import { Component } from '@angular/core';
import { StockComponent } from './stock.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-price',
  template: `
  <div class="ticker">
    <h2>{{ stockComponent.stock.details.ticker }}</h2>
    <p>{{ stockComponent.stock.details.name }}</p>
  </div>
  <div class="price" *ngIf="stockComponent.stock.snapshot.prevDay && stockComponent.price != '--'">
    <div *ngIf="stockComponent.price" class="currentPrice">
      <h1>{{ stockComponent.price }}</h1> 
      <p>{{ stockComponent.price > stockComponent.stock.snapshot.prevDay.c ? '+' : '' }}{{ round(stockComponent.price - stockComponent.stock.snapshot.prevDay.c) }} ({{ stockComponent.price > stockComponent.stock.snapshot.prevDay.c ? '+' : '-' }}{{ getPriceChange(stockComponent.stock.snapshot.prevDay.c, stockComponent.price) }}%)</p>
    </div>
    <div class="hlv" *ngIf="stockComponent.stock.details.market_cap && stockComponent.stock.snapshot.day">
      <div>
        <h4>H/L</h4>
        <p>{{ stockComponent.stock.snapshot.day.h.toFixed(2) }} - {{ stockComponent.stock.snapshot.day.l.toFixed(2) }}</p>
      </div>
      <div>
        <h4>Vol.</h4>
        <p>{{ app.numToWord(stockComponent.stock.snapshot.day.v) }}</p>
      </div>
      <div>
        <h4>Mkt Cap</h4>
        <p>{{ app.numToWord(stockComponent.stock.details.market_cap) }}</p>
      </div>
    </div>
    <div class="hlv" *ngIf="!stockComponent.stock.details.market_cap && stockComponent.stock.snapshot.day">
      <div>
        <h4>High</h4>
        <p>{{ stockComponent.stock.snapshot.day.h.toFixed(2) }}</p>
      </div>
      <div>
        <h4>Low</h4>
        <p>{{ stockComponent.stock.snapshot.day.l.toFixed(2) }}</p>
      </div>
      <div>
        <h4>Vol.</h4>
        <p>{{ app.numToWord(stockComponent.stock.snapshot.day.v) }}</p>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .price {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    align-items: center;
  }
  .hlv > div {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  `]
})
export class PriceComponent {
  constructor(public stockComponent: StockComponent, public app: AppComponent) {}

  getPriceChange(prevClose: number, currPrice: number) {
    let percent:any;
    if (currPrice > prevClose) {
      let i = currPrice - prevClose;
      i = i / prevClose;
      percent = i * 100;
    }
    else {
      let i = prevClose - currPrice;
      i = i / prevClose;
      percent = i * 100;
    }
    percent = Math.round(percent * 100) / 100
    percent = percent.toFixed(2);
    return percent
  }
  round(num: any) {
    let split = num.toString().split('.');
    if (split[1].length == 1 || split[1].length == 2 || split[1].length == 3) {
      return num
    }
    else {
      let n = Math.round(num * 100) / 100
      let a = n.toFixed(2);
      return a
    }
  }
}
