import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StockAPIService } from 'src/app/services/stock-api.service';

@Component({
  selector: 'app-company-details',
  template: `
  
  `,
  styles: [`
  
  `]
})
export class CompanyDetailsComponent implements OnInit {
  constructor(public route: ActivatedRoute, public router: Router, public stockapi: StockAPIService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('stock');
      this.uid = this.uid.toUpperCase();
      this.getStockInfo(this.uid);
    });
  }

  stock:any = {
    details: {},
    dividends: [],
    financials: [],
    splits: [],
    news: [],
    snapshot: {}
  };

  uid:any;

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
