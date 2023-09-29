import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StockAPIService } from 'src/app/services/stock-api.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-company-details',
  template: `
  <div>
    <button [routerLink]="'/stock/' + this.uid + '/company'">Back to Stock</button>
    <div class="stock">
      <div *ngIf="this.stock.details.branding">
        <img *ngIf="this.stock.details.branding.icon_url" id="logo" [src]="this.stock.details.branding.icon_url + '?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t'" [alt]="this.stock.details.ticker + ' company logo'">
        <div class="imgback" *ngIf="this.stock.details.branding.icon_url == undefined || !this.stock.details.branding == undefined">{{ this.stock.details.name.slice(0, 1) }}HEY</div>
      </div>
      <h3>{{ this.stock.details.name }}</h3>
    </div>
    <ng-template #loading>
      <div class="loading">
        <div class="loader"></div>
      </div>
    </ng-template>
    <div class="details" *ngIf="this.stock.details.active; else loading">
      <div class="card">
        <p>Symbol</p>
        <p>{{ this.stock.details.ticker }}</p>
      </div>
      <div class="card">
        <p>List Date</p>
        <p>{{ getDate(this.stock.details.list_date) }}</p>
      </div>
      <div class="card">
        <p>Exchange</p>
        <p>{{ this.stock.details.primary_exchange }}</p>
      </div>
      <div class="card">
        <p>Employees</p>
        <p>{{ this.stock.details.total_employees.toLocaleString() }}</p>
      </div>
      <div class="card">
        <p>Profile</p>
        <p>{{ this.stock.details.description }}</p>
      </div>
    </div>
  </div>
  `,
  styles: [`
  #logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #000;
  }
  .stock {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .card {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 10px 0;
    border-top: 1px solid #000;
  }
  .card:first-child {
    border-top: none;
  }
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
  };

  uid:any;

  getStockInfo(stock:any) {
    this.stockapi.getTickerDetails(stock).subscribe((data) => {
      this.stock.details = data;
      this.stock.details = this.stock.details.results;
    });
    console.log(this.stock);
    
  }

  getDate(timestamp:any) {
    let date = dayjs(timestamp).format('MM/DD/YYYY');
    return date
  }
}
