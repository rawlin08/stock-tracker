import { Component } from '@angular/core';
import { StockComponent } from './stock.component';

@Component({
  selector: 'app-news',
  template: `
  <h3 *ngIf="!stockComponent.stock.news[0]">No News for {{ stockComponent.stock.details.ticker }}</h3>
  <div *ngIf="stockComponent.stock.news[0]">
    <article *ngFor="let article of stockComponent.stock.news">
      <div>
        <a [href]="article.article_url"><h4>{{ article.title }}</h4></a>
        <p>{{ article.description }}</p>
        <p>{{ article.author }} - {{ article.published_utc }}</p>
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
    max-height: 200px;
  }
  .articleImage > img {
    width: 100px;
    height: auto;
    border-radius: 8px;
  }
  p:nth-child(2) {
    margin: 10px 0;
    font-size: 0.85em;
    max-height: 100px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  p:last-child {
    font-size: 0.75em;
    color: gray;
  }
  h4 {
    font-size: 1em;
  }
  a {
    text-decoration: none;
  }
  `]
})
export class NewsComponent {
  constructor(public stockComponent: StockComponent) {}
}
