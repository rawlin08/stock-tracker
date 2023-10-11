import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { StockAPIService } from 'src/app/services/stock-api.service';

@Component({
  selector: 'app-stocksearch',
  template: `
  <form>
    <label for="search"><svg class="searchIcon"><use href="#searchIcon"></use></svg></label>
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
        <div *ngFor="let ticker of tickerHistory" class="card">
          <div [routerLink]="ticker.ticker + '/overview'">
            <div class="noBrand" *ngIf="!this.ticker.branding">
              <p>{{ ticker.name.slice(0,1) }}</p>
            </div>
            <img *ngIf="this.ticker.branding" id="logo" [src]="this.ticker.branding.icon_url + '?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t'" [alt]="ticker.ticker + ' company logo'">
            <div>
              <p>{{ ticker.ticker }}</p>
              <p>{{ ticker.name }}</p>
            </div>
          </div>
          <button (click)="toggleFavorite(ticker.ticker)"><svg><use attr.href="#{{ checkFavorite(ticker.ticker) ? 'favoriteFillIcon' : 'favoriteOutlineIcon' }}"></use></svg></button>
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
          <div *ngFor="let ticker of this.tickerFavorites" class="card">
            <div [routerLink]="ticker.ticker + '/overview'">
              <div class="noBrand" *ngIf="!this.ticker.branding">
                <p>{{ ticker.name.slice(0,1) }}</p>
              </div>
              <img *ngIf="this.ticker.branding" id="logo" [src]="this.ticker.branding.icon_url + '?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t'" [alt]="ticker.ticker + ' company logo'">
              <div>
                <p>{{ ticker.ticker }}</p>
                <p>{{ ticker.name }}</p>
              </div>
            </div>
            <button (click)="toggleFavorite(ticker.ticker)"><svg><use attr.href="#{{ checkFavorite(ticker.ticker) ? 'favoriteFillIcon' : 'favoriteOutlineIcon' }}"></use></svg></button>
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
    <div *ngFor="let ticker of results" class="card">
      <div [routerLink]="ticker.ticker + '/overview'">
        <div class="noBrand" *ngIf="!this.ticker.branding">
          <p>{{ ticker.name.slice(0,1) }}</p>
        </div>
        <img *ngIf="this.ticker.branding && this.ticker.branding.icon_url" id="logo" [src]="this.ticker.branding.icon_url + '?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t'" [alt]="ticker.ticker + ' company logo'">
        <div>
          <p>{{ ticker.ticker }}</p>
          <p>{{ ticker.name }}</p>
        </div>
      </div>
      <button (click)="toggleFavorite(ticker.ticker)"><svg><use attr.href="#{{ checkFavorite(ticker.ticker) ? 'favoriteFillIcon' : 'favoriteOutlineIcon' }}"></use></svg></button>
    </div>
  </div>
  <div class="noresults" *ngIf="this.results.length == 0 && searchForm.value != '' && this.searching == false && this.typingTimer == undefined">
    <p>No Results for {{ searchForm.value }}</p>
  </div>
  `,
  styles: [`
  .mdc-tab__text-label {
    color: var(--textColor);
  }
  .noBrand {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #000;
  }
  .noBrand > p {
    font-size: 20px;
  }
  #logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #000;
  }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--headerBackgroundColor);
    padding: 10px 0;
    cursor: pointer;
  }
  .card > p:first-child {
    font-weight: 500;
  }
  .card > div {
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
  }
  input {
    width: 100%;
    padding: 10px 5px;
    border-radius: 6px;
    border: none;
    font-size: 16px;
    background-color: var(--headerBackgroundColor);
    color: var(--textColor);
  }
  input:focus {
    outline: none;
  }
  form {
    display: flex;
    align-items: center;
    box-shadow: 0 0 5px 4px #0000001a;
    background-color: var(--headerBackgroundColor);
    border-radius: 6px;
  }
  form > label {
    display: flex;
    align-items: center;
  }
  .searchIcon {
    padding: 0 0 0 5px;
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
        this.stockapi.getTickerDetails(ticker).subscribe((data) => {
          console.log(data);
          this.n = data;
          this.tickerHistory.push(this.n.results);
        });
      });
    }
    if (this.app.favorites) {
      this.app.favorites.forEach((ticker:any) => {
        this.stockapi.getTickerDetails(ticker).subscribe((data) => {
          this.n2 = data;
          this.tickerFavorites.push(this.n2.results);
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
    this.results = [];
    this.n = {};
    if (ticker != '') {
      this.searching = true;
      this.stockapi.getTickerDetails(ticker).subscribe(
        res => {
          let results:any = res;
          this.results.push(results.results);
          console.log(this.results);
          this.stockapi.searchNameTicker(ticker).subscribe(
            res => {
              this.searching = false;
              this.n = res;
              this.n = this.n.results;
              console.log(this.n);
              this.n.forEach((element:any) => {
                if (this.results[0]) {
                  if (element.type != 'PFD') {
                    if (element.ticker != this.results[0].ticker) {
                      this.stockapi.getTickerDetails(element.ticker).subscribe((data) => {
                        let results:any = data;
                        this.results.push(results.results);
                      });
                    }
                  }
                }
                else {
                  if (element.type != 'PFD') {
                    this.stockapi.getTickerDetails(element.ticker).subscribe((data) => {
                      let results:any = data;
                      this.results.push(results.results);
                    });
                  }
                }
              });
          },
          err => {
            console.log('THERES AN ERROR DAWG', err);
          }
        );
        },
        err => {
          console.log('ERROR MAN', err);
          this.stockapi.searchNameTicker(ticker).subscribe(
            res => {
              this.searching = false;
              this.n = res;
              this.n = this.n.results;
              console.log(this.n);
              this.n.forEach((element:any) => {
                if (this.results[0]) {
                  if (element.type != 'PFD') {
                    if (element.ticker != this.results[0].ticker) {
                      this.stockapi.getTickerDetails(element.ticker).subscribe((data) => {
                        let results:any = data;
                        this.results.push(results.results);
                      });
                    }
                  }
                }
                else {
                  if (element.type != 'PFD') {
                    this.stockapi.getTickerDetails(element.ticker).subscribe((data) => {
                      let results:any = data;
                      this.results.push(results.results);
                    });
                  }
                }
              });
              console.log(this.results);
              
          },
          err => {
            console.log('THERES AN ERROR DAWG', err);
          }
        );
        }
      );
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

  checkFavorite(ticker:any):any {  
    if (this.app.favorites) {
      if (this.app.favorites.includes(ticker)) {
        return true
      }
      else {
        return false
      }
    }
  }
  toggleFavorite(selectedTicker:any) {
    if (this.app.favorites) {
      if (this.app.favorites.includes(selectedTicker)) { // if ticker is already in favorites
        this.app.favorites = this.app.favorites.filter((ticker:any) => ticker != selectedTicker);
        this.tickerFavorites = this.tickerFavorites.filter((stock:any) => stock.ticker != selectedTicker);
        localStorage.setItem('favorites', JSON.stringify(this.app.favorites));
      }
      else { // if ticker is being added to favorites
        this.app.favorites.push(selectedTicker);
        this.stockapi.getTickerDetails(selectedTicker).subscribe((data) => {
          this.n2 = data;
          this.tickerFavorites.push(this.n2.results);
        });
        localStorage.setItem('favorites', JSON.stringify(this.app.favorites));
      }
    }
    console.log(this.app.favorites);
  }

  results:any = [];
  n:any = {};
  n2:any = {};
  dataCount:any = 0;
  tickerHistory:any = [];
  tickerFavorites:any = [];

  searching:boolean = false;
}
