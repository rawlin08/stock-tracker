import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../../stock.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StockAPIService } from 'src/app/services/stock-api.service';

@Component({
  selector: 'app-past',
  template: `
  <button [routerLink]="'/stock/' + this.uid + '/company'">Back to Stock</button>
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
export class PastComponent implements OnInit {
  constructor(public stockComponent: StockComponent, public route: ActivatedRoute, public router: Router, public stockapi: StockAPIService) {
    this.navLinks = [
      {
        label: 'Dividends',
        link: './dividends',
        index: 0
      }, {
        label: 'Splits',
        link: './splits',
        index: 1
      } 
    ];
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('stock');
      this.uid = this.uid.toUpperCase();
      this.getStockInfo(this.uid);
    });
  }

  navLinks: any[];
  activeLinkIndex = -1;

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
