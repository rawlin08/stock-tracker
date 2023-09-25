import { Component } from '@angular/core';
import { PastComponent } from './past.component';

@Component({
  selector: 'app-past-financials',
  template: `
  <div class="MRSplit" *ngIf="pastComponent.stock.financials[0]">
    <p>{{ pastComponent.stock.financials[0].fiscal_year }} {{ pastComponent.stock.financials[0].fiscal_period }}</p>
    <div>
      <h3>Balance Sheet</h3>
      <p>Assets: {{ pastComponent.stock.financials[0].financials.balance_sheet.assets.value }}</p>
      <p>Liabilities: {{ pastComponent.stock.financials[0].financials.balance_sheet.liabilities.value }}</p>
      <p>Debt to Asset: {{ debtToAsset() }}%</p>
    </div>
    <div>
      <h3>Income Statement</h3>
      <p>Net Income: {{ pastComponent.stock.financials[0].financials.income_statement.net_income_loss.value }}</p>
      <p>Total Revenue: {{ pastComponent.stock.financials[0].financials.income_statement.revenues.value }}</p>
      <p>Operating Income: {{ pastComponent.stock.financials[0].financials.income_statement.operating_income_loss.value }}</p>
    </div>
    <div>
      <h3>Cash Flow</h3>
      <p>Operating: {{ pastComponent.stock.financials[0].financials.cash_flow_statement.net_cash_flow_from_operating_activities.value }}</p>
      <p>Investing: {{ pastComponent.stock.financials[0].financials.cash_flow_statement.net_cash_flow_from_investing_activities.value }}</p>
      <p>Financing: {{ pastComponent.stock.financials[0].financials.cash_flow_statement.net_cash_flow_from_financing_activities.value }}</p>
    </div>
  </div>
  `,
  styles: [``]
})
export class PastFinancialsComponent {
  constructor(public pastComponent: PastComponent) {}

  debtToAsset() {
    let percent:any = (this.pastComponent.stock.financials[0].financials.balance_sheet.liabilities.value / this.pastComponent.stock.financials[0].financials.balance_sheet.assets.value) * 100
    percent = percent.toFixed(2)
    return percent
  }
}
