import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StockAPIService } from 'src/app/services/stock-api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-stock',
  template: `
  <app-price></app-price>
  <nav mat-tab-nav-bar  [tabPanel]="tabPanel">
    <a mat-tab-link *ngFor="let link of navLinks" [routerLink]="link.link" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">{{ link.label }}</a>
  </nav>
  <mat-tab-nav-panel #tabPanel>
    <router-outlet></router-outlet>
  </mat-tab-nav-panel>
  `,
  styles: [`
  a {
    text-decoration: none;
  }
  `]
})
export class StockComponent implements OnInit, OnDestroy {
  navLinks: any[];
  activeLinkIndex = -1;
  data:any;

  constructor(public stockapi: StockAPIService, public route: ActivatedRoute, public router: Router, public app: AppComponent){
    this.navLinks = [
      {
        label: 'Overview',
        link: './overview',
        index: 0
      }, {
        label: 'News',
        link: './news',
        index: 1
      }, {
        label: 'Company',
        link: './company',
        index: 2
      }, 
    ];
  }
  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.data = res;
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      let uid:any = params.get('stock');
      uid = uid.toUpperCase();
      this.getStockInfo(uid);

      // ADD STOCK TO HISTORY
      this.app.history = this.app.history.filter((ticker:any) => ticker != uid);
      this.app.history.push(uid);
      localStorage.setItem('history', JSON.stringify(this.app.history));
      
      let today = new Date().toISOString().slice(0, 10)
      console.log(today)
      this.stockapi.getTickerLastTrade(uid, '2023-09-28').subscribe(
        res => {
          console.log(res);
          
          this.lastTrade = res;
          this.lastTrade = this.lastTrade.results[0].o
          let n = Math.round(this.lastTrade * 100) / 100
          this.price = n.toFixed(2);

          // Connecting to stock websocket to get 15 min delayed data streamed to the site
          this.stocksWS = new WebSocket('wss://delayed.polygon.io/stocks')
          this.stocksWS.onopen = () => {
            this.stocksWS.send(`{"action":"auth","params":"${this.APIKEY}"}`) // Authorize
            this.stocksWS.send(`{"action":"subscribe", "params":"A.${uid}"}`); // Which stock to subscribe to
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
            }
          };
        },
        err => {
          console.log('HTTP Error', err);
        }
      );
    });
  }
  ngOnDestroy() {
    this.stocksWS.close();
  }

  APIKEY:any = 'TKVSXdx635Dera7_JxMwbX3fQBc1Q77t';
  stocksWS:any = {}
  price:any;
  lastTrade:any;

  stock:any = {
    details: {},
    dividends: [],
    financials: [],
    splits: [],
    news: [],
    snapshot: {}
  };
  getStockInfo(stock:any) {
    this.stockapi.getTickerDetails(stock).subscribe((data) => {
      this.stock.details = data;
      this.stock.details = this.stock.details.results;
    });
    this.stockapi.getTickerDividends(stock).subscribe((data) => {
      this.stock.dividends = data;
      this.stock.dividends = this.stock.dividends.results;
    });
    this.stockapi.getTickerSplits(stock).subscribe((data) => {
      this.stock.splits = data;
      this.stock.splits = this.stock.splits.results;
    });
    this.stockapi.getTickerFinancials(stock).subscribe((data) => {
      this.stock.financials = data;
      this.stock.financials = this.stock.financials.results;
    });
    this.stockapi.getTickerNews(stock).subscribe((data) => {
      this.stock.news = data;
      this.stock.news = this.stock.news.results;
    });
    console.log(this.stock);
    this.stockapi.getOverallStockData(stock).subscribe((data) => {
      this.stock.snapshot = data;
      this.stock.snapshot = this.stock.snapshot.ticker;
    });
  }

}
