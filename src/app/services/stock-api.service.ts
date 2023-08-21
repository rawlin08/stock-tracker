import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerDividends(ticker: string) {
    return this.http.get(`https://api.polygon.io/v3/reference/dividends?ticker=${ticker}&limit=1000&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerSplits(ticker: string) {
    return this.http.get(`https://api.polygon.io/v3/reference/splits?ticker=${ticker}&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerFinancials(ticker: string) {
    return this.http.get(`https://api.polygon.io/vX/reference/financials?ticker=${ticker}&sort=filing_date&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`);
  }
  getTickerNews(ticker: string) {
    return this.http.get(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }

  getTickerLastTrade(ticker: string, todayDate: string) {
    return this.http.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/second/${todayDate}/${todayDate}?adjusted=true&sort=desc&limit=1&apiKey=TKVSXdx635Dera7_JxMwbX3fQBc1Q77t`)
  }
}
