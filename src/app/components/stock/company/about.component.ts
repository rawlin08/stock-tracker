import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../stock.component';

@Component({
  selector: 'app-about',
  template: `
  <div class="container">
    <div class="heading" routerLink="company-details">
      <h2 class="title">Profile</h2>
      <svg class="arrowIcon"><use href="#arrowRightIcon"></use></svg>
    </div>
    <div>
      <div *ngIf="stockComponent.stock.details.branding">
        <img *ngIf="stockComponent.stock.details.branding.icon_url" id="logo" [src]="stockComponent.stock.details.branding.icon_url + '?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t'" [alt]="stockComponent.stock.details.ticker + ' company logo'">
        <div class="imgback" *ngIf="stockComponent.stock.details.branding.icon_url == undefined || !stockComponent.stock.details.branding == undefined">{{ stockComponent.stock.details.name.slice(0, 1) }}HEY</div>
      </div>
      <div>
        <div class="companyName">
          <h3>{{ stockComponent.stock.details.name }}</h3>
        </div>
        <p id="desc">{{ stockComponent.stock.details.description }}</p>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .companyName {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .container {
    padding: 10px;
  }
  .container > div {
    display: flex;
    gap: 10px;
  }
  #desc {
    font-size: 14px;
    -webkit-line-clamp: 4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 10px 0;
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 100%; 
  }
  .imgback {
    background-color: blue;
    color: white;
  }
  `]
})
export class AboutComponent implements OnInit {
  constructor(public stockComponent: StockComponent) {}
  ngOnInit(): void {
    
  }
}
