import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAPIService {
  constructor(private http: HttpClient) {}

  getTodayStockData(ticker: string, date: string) {
    return this.http.get(`https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }

  getMarketStatus() {
    return this.http.get(`https://api.polygon.io/v1/marketstatus/now?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getMarketHolidays() {
    return this.http.get(`https://api.polygon.io/v1/marketstatus/upcoming?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  
  getTickerDetails(ticker: string) {
    ticker = ticker.toUpperCase();
    return this.http.get(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerDividends(ticker: string) {
    return this.http.get(`https://api.polygon.io/v3/reference/dividends?ticker=${ticker}&limit=1000&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerSplits(ticker: string) {
    return this.http.get(`https://api.polygon.io/v3/reference/splits?ticker=${ticker}&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerFinancials(ticker: string) {
    return this.http.get(`https://api.polygon.io/vX/reference/financials?ticker=${ticker}&timeframe=quarterly&limit=20&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerNews(ticker: string) {
    return this.http.get(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&limit=50&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }

  getTickerLastTrade(ticker: string, todayDate: string) {
    return this.http.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/second/${todayDate}/${todayDate}?adjusted=true&sort=desc&limit=1&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }

  getOverallStockData(ticker: string) {
    return this.http.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }

  searchSpecificTicker(ticker: string) {
    ticker = ticker.toUpperCase();
    return this.http.get(`https://api.polygon.io/v3/reference/tickers?ticker=${ticker}&market=stocks&active=true&limit=1&sort=ticker&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }
  searchNameTicker(ticker: string) {
    return this.http.get(`https://api.polygon.io/v3/reference/tickers?market=stocks&search=${ticker}&active=true&limit=100&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
 }
