import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../stock.component';

@Component({
  selector: 'app-mrdividend',
  template: `
  <div class="container">
    <div class="heading" routerLink="past/dividends">
      <h2 class="title">Dividends</h2>
      <svg class="arrowIcon"><use href="#arrowRightIcon"></use></svg>
    </div>
    <div *ngIf="stockComponent.stock.dividends[0]">
      <div class="MRDiv">
        <div>
          <p>Dividend Per Share</p>
          <p>Ex-Div Date</p>
          <p>Pay Date</p>
          <p>Dividend Yield</p>
          <p>Frequency</p>
        </div>
        <div>
          <p>{{ stockComponent.stock.dividends[0].currency }} {{ round(stockComponent.stock.dividends[0].cash_amount) }}</p>
          <p>{{ stockComponent.stock.dividends[0].ex_dividend_date }}</p>
          <p>{{ stockComponent.stock.dividends[0].pay_date }}</p>
          <p>{{ getDivYield(stockComponent.price, stockComponent.stock.dividends[0].cash_amount) }}%</p>
          <p>{{ getFrequency(stockComponent.stock.dividends[0].frequency) }}</p>
        </div>
      </div>
      <div>
        <h3>To Get $100/month from {{ stockComponent.stock.details.ticker }}</h3>
        <p>Based on the current price and the most recent dividend, you would need <b>{{ neededShares }}</b> shares or about <b>{{ this.neededShares * this.stockComponent.price | currency }}</b> invested.</p>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .MRDiv {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .MRDiv > div:nth-child(2) {
    text-align: right;
  }
  `]
})
export class MRDividendComponent implements OnInit {
  constructor(public stockComponent: StockComponent) {}
  ngOnInit(): void {
    this.neededShares = Math.ceil(100 / this.stockComponent.stock.dividends[0].cash_amount);    
  }

  neededShares = 0;

  getFrequency(frequency:any) {
    let freq;
    switch(frequency) {
      case 12:
        freq = 'Monthly'
        break
      case 6:
        freq = 'Bi-Yearly'
        break
      case 4:
        freq = 'Quarterly'
        break
      case 1:
        freq = 'Yearly'
        break
    }
    return freq;
  }
  getDivYield(sp: number, div: number) {  
    let dy:any = div / sp;
    dy = dy * 100;
    dy = dy.toFixed(2)
    return dy
  }

  round(num: any) {
    let split = num.toString().split('.');
    if (split[1].length == 1 || split[1].length == 2 || split[1].length == 3) {
      return num
    }
    else {
      let n = Math.round(num * 10000) / 10000
      let a = n.toFixed(4);
      return a
    }
  }

}
