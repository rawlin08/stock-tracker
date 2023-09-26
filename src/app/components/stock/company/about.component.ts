import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../stock.component';

@Component({
  selector: 'app-about',
  template: `
  <div class="container">
    <div *ngIf="stockComponent.stock.details.branding">
      <img *ngIf="stockComponent.stock.details.branding.icon_url" id="logo" [src]="stockComponent.stock.details.branding.icon_url + '?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t'" [alt]="stockComponent.stock.details.ticker + ' company logo'">
      <div class="imgback" *ngIf="stockComponent.stock.details.branding.icon_url == undefined || !stockComponent.stock.details.branding == undefined">{{ stockComponent.stock.details.name.slice(0, 1) }}HEY</div>
    </div>
    <div>
      <div>
        <h3>{{ stockComponent.stock.details.name }}</h3>
      </div>
      <p id="desc">{{ stockComponent.stock.details.description }}</p>
    </div>
  </div>
  `,
  styles: [`
  #logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .container {
    display: flex;
    gap: 10px;
  }
  .container > div {
    margin: 10px 0 0 0;
    max-width: 100%;
  }
  #desc {
    margin: 10px 0 0 0;
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 100%; 
    height: 3.5em; 
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
