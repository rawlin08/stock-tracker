import { Component } from '@angular/core';
import { PastComponent } from './past.component';

@Component({
  selector: 'app-past-splits',
  template: `
  <h3 class="dataNotFound" *ngIf="!this.pastComponent.stock.splits[0]">No Splits Data Found</h3>
  <table *ngIf="this.pastComponent.stock.splits[0]">
    <tr>
      <th>Execution Date</th>
      <th>Plan</th>
    </tr>
    <tr *ngFor="let element of this.pastComponent.stock.splits">
      <td>{{ element.execution_date }}</td>
      <td>{{ element.split_to }} for {{ element.split_from }}</td>
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
export class PastSplitsComponent {
  constructor(public pastComponent: PastComponent) {}
}
