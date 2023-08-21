import { Component, OnInit } from '@angular/core';
import { StockAPIService } from 'src/app/services/stock-api.service';

@Component({
  selector: 'app-stock',
  template: `
  <app-price></app-price>
  <mat-tab-group fitInkBarToContent dynamicHeight class="remove-border-bottom">
    <mat-tab label="Overview"><app-overview></app-overview></mat-tab>
    <mat-tab label="News"><app-news></app-news></mat-tab>
    <mat-tab label="Company"><app-company></app-company></mat-tab>
  </mat-tab-group>

  <app-past></app-past>
  `,
  styles: [``]
})
export class StockComponent implements OnInit {
  constructor(public stockapi: StockAPIService) {}
  ngOnInit() {
    this.getStockInfo();

    // Connecting to stock websocket to get 15 min delayed data streamed to the site
    this.stocksWS = new WebSocket('wss://delayed.polygon.io/stocks')
    this.stocksWS.onopen = () => {
      this.stocksWS.send(`{"action":"auth","params":"${this.APIKEY}"}`) // Authorize
      this.stocksWS.send(`{"action":"subscribe", "params":"A.${this.TESTSTOCK}"}`); // Which stock to subscribe to
    }
    this.stocksWS.onmessage = (data:any) => {

      // Grab data coming in and parse the stringed object
      let message = data;
      message = JSON.parse(message.data)
      console.log(message);

      // if the message being recieved is stock data, round the price to 2 decimal places and display on screen
      if (message[0].ev == "A") {
        let unroundedPrice = message[0].o
        console.log(unroundedPrice);
        let n = Math.round(unroundedPrice * 100) / 100
        this.price = n.toFixed(2);
      }
      else { // Message recieved was a connected, subscribed, or authorized completed message
        this.price = "--"
        let today = new Date().toISOString().slice(0, 10)
        console.log(today)
        this.stockapi.getTickerLastTrade(this.TESTSTOCK, '2023-08-18').subscribe((data) => {
          console.log(data);
          this.lastTrade = data;
          this.lastTrade = this.lastTrade.results[0].o
          let n = Math.round(this.lastTrade * 100) / 100
          this.price = n.toFixed(2);
        });
      }
    };

    

  }
  APIKEY:any = 'TKVSXdx635Dera7_JxMwbX3fQBc1Q77t';
  stocksWS:any = {}
  price:any;
  lastTrade:any;
  
  TESTSTOCK: string = 'SVOL';

  stock:any = {
    details: {},
    dividends: [],
    financials: [],
    splits: [],
    news: [],
    snapshot: {}
  };
  getStockInfo() {
    this.stockapi.getTickerDetails(this.TESTSTOCK).subscribe((data) => {
      this.stock.details = data;
      this.stock.details = this.stock.details.results;
    });
    this.stockapi.getTickerDividends(this.TESTSTOCK).subscribe((data) => {
      this.stock.dividends = data;
      this.stock.dividends = this.stock.dividends.results;
    });
    this.stockapi.getTickerSplits(this.TESTSTOCK).subscribe((data) => {
      this.stock.splits = data;
      this.stock.splits = this.stock.splits.results;
    });
    this.stockapi.getTickerFinancials(this.TESTSTOCK).subscribe((data) => {
      this.stock.financials = data;
      this.stock.financials = this.stock.financials.results;
    });
    this.stockapi.getTickerNews(this.TESTSTOCK).subscribe((data) => {
      this.stock.news = data;
      this.stock.news = this.stock.news.results;
    });
    console.log(this.stock);
    this.stockapi.getOverallStockData(this.TESTSTOCK).subscribe((data) => {
      this.stock.snapshot = data;
      this.stock.snapshot = this.stock.snapshot.ticker;
    });
  }

}
