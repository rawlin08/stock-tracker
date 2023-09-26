import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../../stock.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StockAPIService } from 'src/app/services/stock-api.service';

@Component({
  selector: 'app-past',
  template: `
  <button [routerLink]="'/stock/' + this.uid">Back to Stock</button>
  <mat-tab-group fitInkBarToContent dynamicHeight class="remove-border-bottom">
    <mat-tab label="Dividends"><app-past-dividends></app-past-dividends></mat-tab>
    <mat-tab label="Splits"><app-past-splits></app-past-splits></mat-tab>
  </mat-tab-group>
  `,
  styles: [``]
})
export class PastComponent implements OnInit {
  constructor(public stockComponent: StockComponent, public route: ActivatedRoute, public router: Router, public stockapi: StockAPIService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('stock');
      this.uid = this.uid.toUpperCase();
      this.getStockInfo(this.uid);
    });
  }

  stock:any = {
    dividends: [],
    splits: [],
  };

  uid:any;

  getStockInfo(stock:any) {
    this.stockapi.getTickerDividends(stock).subscribe((data) => {
      this.stock.dividends = data;
      this.stock.dividends = this.stock.dividends.results;
    });
    this.stockapi.getTickerSplits(stock).subscribe((data) => {
      this.stock.splits = data;
      this.stock.splits = this.stock.splits.results;
    });
  }
}
