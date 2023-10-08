import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { StockAPIService } from 'src/app/services/stock-api.service';

@Component({
  selector: 'app-stocksearch',
  template: `
  <form>
    <input autofocus #searchForm (input)="startTypingTimer(searchForm.value)" type="search" name="search" id="search" placeholder="Search by Ticker or Name">
  </form>
  <mat-tab-group *ngIf="this.results.length == 0 && searchForm.value == ''">
    <mat-tab label="History">
      <div class="history tab">
        <div>
          <h2>History</h2>
          <button (click)="this.clearHistory()"><svg><use href="#trashIcon"></use></svg></button>
        </div>
        <p class="noFound" *ngIf="this.tickerHistory.length == 0">No History Found</p>
        <div *ngFor="let ticker of tickerHistory" class="card" [routerLink]="ticker.ticker + '/overview'">
          <p>{{ ticker.ticker }}</p>
          <p>{{ ticker.name }}</p>
        </div>
      </div>
    </mat-tab>
    <mat-tab label="Favorites">
      <div class="favorites tab">
        <div>
          <h2>Favorites</h2>
          <button (click)="this.clearFavorites()"><svg><use href="#trashIcon"></use></svg></button>
        </div>
        <div>
          <p class="noFound" *ngIf="this.tickerFavorites.length == 0">No Favorites Found</p>
          <div *ngFor="let ticker of this.tickerFavorites" class="card" [routerLink]="ticker.ticker + '/overview'">
            <p>{{ ticker.ticker }}</p>
            <p>{{ ticker.name }}</p>
          </div>
        </div>
      </div>
    </mat-tab>
  </mat-tab-group>
  <ng-template #loading>
    <div class="loading">
      <div class="loader"></div>
    </div>
  </ng-template>
  <div class="results" *ngIf="this.searching != true; else loading">
    <div *ngFor="let ticker of results" class="card" [routerLink]="ticker.ticker + '/overview'">
      <p>{{ ticker.ticker }}</p>
      <p>{{ ticker.name }}</p>
    </div>
  </div>
  <div class="noresults" *ngIf="this.results.length == 0 && searchForm.value != '' && this.searching == false && this.typingTimer == undefined">
    <p>No Results for {{ searchForm.value }}</p>
  </div>
  `,
  styles: [`
  .results {
    margin: 10px 0 0 0;
  }
  .tab {
    margin: 10px 0 0 0;
  }
  .tab > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card {
    display: grid;
    gap: 2px;
    border-bottom: 1px solid #000;
    padding: 10px 0;
    cursor: pointer;
  }
  .card > p:first-child {
    font-weight: 500;
  }
  input {
    width: 100%;
    padding: 5px;
    border-radius: 6px;
    border: 1px solid #000;
    font-size: 16px;
  }
  button {
    background-color: transparent;
    border: none;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  .noresults {
    text-align: center;
  }
  .noFound {
    text-align: center;
    margin: 10px 0 0 0;
  }
  mat-tab-group {
    margin: 10px 0 0 0;
  }
  `]
})
export class StockSearchComponent implements OnInit {
  constructor(public stockapi: StockAPIService, public app: AppComponent) {}
  ngOnInit() {
    if (this.app.history) {
      this.app.history.forEach((ticker:any) => {
        this.stockapi.searchSpecificTicker(ticker).subscribe((data) => {
          console.log(data);
          this.n = data;
          this.tickerHistory.push(this.n.results[0]);
        });
      });
    }
    if (this.app.favorites) {
      this.app.favorites.forEach((ticker:any) => {
        this.stockapi.searchSpecificTicker(ticker).subscribe((data) => {
          this.n2 = data;
          this.tickerFavorites.push(this.n2.results[0]);    
        });
      });
    }
  }

  typingTimer:any;
  doneTypingInterval:any = 1000;

  startTypingTimer(ticker:any) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.search(ticker);
      this.typingTimer = undefined;
    },this.doneTypingInterval);
  }
  search(ticker: any) {
    if (ticker == '') {
      this.results = [];
      this.n = {};
    }
    else {
      this.searching = true;
      this.stockapi.searchSpecificTicker(ticker).subscribe((data) => {
        
        this.results = data;
        this.results = this.results.results;
        console.log(this.results);
        this.stockapi.searchNameTicker(ticker).subscribe((data) => {
          this.searching = false;
          console.log(data);
          this.n = data;
          this.n = this.n.results;
          this.n.forEach((element:any) => {
            if (this.results[0]) {
              if (element.ticker != this.results[0].ticker) {
                this.results.push(element);
              }
            }
            else {
              this.results.push(element);
            }
          });
        });
      });
    }
  }

  clearHistory() {
    localStorage.setItem('history', JSON.stringify([]));
    this.app.history = [];
    this.tickerHistory = [];
  }
  clearFavorites() {
    localStorage.setItem('favorites', JSON.stringify([]));
    this.app.favorites = [];
    this.tickerFavorites = [];
  }

  results:any = [];
  n:any = {};
  n2:any = {};
  dataCount:any = 0;
  tickerHistory:any = [];
  tickerFavorites:any = [];

  searching:boolean = false;
}
