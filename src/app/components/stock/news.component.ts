import { Component } from '@angular/core';
import { StockComponent } from './stock.component';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-news',
  template: `
  <h3 *ngIf="!stockComponent.stock.news[0]">No News for {{ stockComponent.stock.details.ticker }}</h3>
  <div *ngIf="stockComponent.stock.news[0]">
    <article *ngFor="let article of stockComponent.stock.news">
      <div>
        <a [href]="article.article_url"><h4>{{ article.title }}</h4></a>
        <p>{{ article.description }}</p>
        <div class="publisher">
          <img [src]="article.publisher.favicon_url" alt="">
          <p>{{ article.publisher.name }} - {{ getDate(article.published_utc) }}</p>
        </div>
      </div>
      <div class="articleImage">
        <img [src]="article.image_url" [alt]="">
      </div>
    </article>
  </div>
  `,
  styles: [`
  article {
    display: flex;
    padding: 10px 0;
    border-top: 1px solid gray;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .articleImage > img {
    width: 100px;
    height: auto;
    border-radius: 8px;
  }
  p:nth-child(2) {
    margin: 10px 0;
    font-size: 0.85em;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  p:last-child {
    font-size: 0.75em;
    color: var(--textColor);
    opacity: 0.7;
  }
  h4 {
    font-size: 16px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  a {
    text-decoration: none;
  }
  .publisher {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .publisher > img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .tickers {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, 50px)
  }
  .tickers > button {
    border: none;
    background-color: transparent;
  }
  `]
})
export class NewsComponent {
  constructor(public stockComponent: StockComponent) {}
  
  getDate(date:any) {
    return dayjs(date).fromNow();
  }

  trackByFn(index:any, item:any) {
    return item.uniqueValue
  }
}
