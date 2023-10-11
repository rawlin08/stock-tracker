import { Component, OnInit } from '@angular/core';
import { StockComponent } from './stock.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-price',
  template: `
  <header>
    <div class="ticker">
      <div>
        <h2>{{ stockComponent.stock.details.ticker ? stockComponent.stock.details.ticker : '--' }}</h2>
        <div>
          <button routerLink="/stock"><svg><use href="#searchIcon"></use></svg></button>
          <button (click)="toggleFavorite()"><svg><use attr.href="#{{ checkFavorites() ? 'favoriteFillIcon' : 'favoriteOutlineIcon' }}"></use></svg></button>
        </div>
      </div>
      <p>{{ stockComponent.stock.details.name }}</p>
    </div>
  </header>
  <div class="price container">
    <div class="currentPrice">
      <h1>{{ stockComponent.price != undefined ? stockComponent.price : '--' }}</h1> 
      <p *ngIf="stockComponent.price && stockComponent.stock.snapshot.prevDay"><svg class="upDownArrow"><use [attr.href]="stockComponent.price > stockComponent.stock.snapshot.prevDay.c ? '#arrowUpIcon' : '#arrowDownIcon'"></use></svg> {{ stockComponent.price > stockComponent.stock.snapshot.prevDay.c ? '+' : '' }}{{ round(stockComponent.price - stockComponent.stock.snapshot.prevDay.c) }} ({{ stockComponent.price > stockComponent.stock.snapshot.prevDay.c ? '+' : '-' }}{{ getPriceChange(stockComponent.stock.snapshot.prevDay.c, stockComponent.price) }}%)</p>
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
  .currentPrice > p {
    display: flex;
    align-items: center;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
  .ticker {
    width: 100%;
  }
  .ticker > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  button {
    background-color: transparent;
    border: none;
  }
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
export class PriceComponent implements OnInit {
  constructor(public stockComponent: StockComponent, public app: AppComponent) {}
  ngOnInit(): void {}
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
    if (!split[1]) {
      return `${num}.00`
    } 
    else if (split[1].length == 1 || split[1].length == 2 || split[1].length == 3) {
      return num
    }
    else {
      let n = Math.round(num * 100) / 100
      let a = n.toFixed(2);
      return a
    }
  }
  checkFavorites():any {
    if (this.app.favorites) {
      if (this.app.favorites.includes(this.stockComponent.stock.details.ticker)) {
        return true
      }
      else {
        return false
      }
    }
  }
  toggleFavorite() {
    if (this.app.favorites) {
      if (this.app.favorites.includes(this.stockComponent.stock.details.ticker)) { // if ticker is already in favorites
        this.app.favorites = this.app.favorites.filter((ticker:any) => ticker != this.stockComponent.stock.details.ticker);
        localStorage.setItem('favorites', JSON.stringify(this.app.favorites))
      }
      else { // if ticker is being added to favorites
        this.app.favorites.push(this.stockComponent.stock.details.ticker);
        localStorage.setItem('favorites', JSON.stringify(this.app.favorites));
      }
    }
    console.log(this.app.favorites);
  }
}
