import { Component, OnInit } from '@angular/core';
import { StockComponent } from './stock.component';
import { PastComponent } from './past.component';

@Component({
  selector: 'app-past-dividends',
  template: `
  <h3 class="dataNotFound" *ngIf="!this.pastComponent.stock.dividends[0]">No Dividend Data Found</h3>
  <table *ngIf="this.pastComponent.stock.dividends[0]">
    <tr>
      <th>Ex-Div Date</th>
      <th>Dividend Per Share</th>
      <th>Frequency</th>
    </tr>
    <tr *ngFor="let element of this.pastComponent.stock.dividends">
      <td>{{ element.ex_dividend_date }}</td>
      <td>{{ round(element.cash_amount) }} {{ element.currency }}</td>
      <td>{{ getFrequency(element.frequency) }}</td>
    </tr>
  </table>
  `,
  styles: [`
  table {
    width: 100%;
    margin: 10px 0 0 0;
  }
  table > tr {
    display: flex;
    justify-content: space-between;
    margin: 0 0 10px 0;
  }
  `]
})
export class PastDividendsComponent {
  constructor(public pastComponent: PastComponent) {}

  getFrequency(frequency:any) {
    let freq;
    switch(frequency) {
      case 12:
        freq = 'Monthly'
        break
      case 6:
        freq = 'Bi-Yearly'
        break
      case 4:
        freq = 'Quarterly'
        break
      case 1:
        freq = 'Yearly'
        break
      case 0:
        freq = 'Special'
    }
    return freq;
  }
  round(num: any) {
    let split = num.toString().split('.');
    if (!split[1] || split[1].length == 1 || split[1].length == 2 || split[1].length == 3) {
      return num
    }
    else {
      let n = Math.round(num * 10000) / 10000
      let a = n.toFixed(4);
      return a
    }
  }
}
