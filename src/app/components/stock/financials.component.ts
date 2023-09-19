import { Component } from '@angular/core';
import { StockComponent } from './stock.component';

@Component({
  selector: 'app-financials',
  template: `
  <h2>Financials</h2>
  <div *ngIf="!stockComponent.stock.financials[0]">
    <p>No Financial Data Found</p>
  </div>
  <div class="MRSplit" *ngIf="stockComponent.stock.financials[0]">
    <p>{{ stockComponent.stock.financials[0].fiscal_year }} {{ stockComponent.stock.financials[0].fiscal_period }}</p>
    <div>
      <h3>Balance Sheet</h3>
      <p>Assets: {{ stockComponent.stock.financials[0].financials.balance_sheet.assets.value }}</p>
      <p>Liabilities: {{ stockComponent.stock.financials[0].financials.balance_sheet.liabilities.value }}</p>
      <p>Debt to Asset: {{ debtToAsset() }}%</p>
    </div>
    <div>
      <h3>Income Statement</h3>
      <p>Net Income: {{ stockComponent.stock.financials[0].financials.income_statement.net_income_loss.value }}</p>
      <p>Total Revenue: {{ stockComponent.stock.financials[0].financials.income_statement.revenues.value }}</p>
      <p>Operating Income: {{ stockComponent.stock.financials[0].financials.income_statement.operating_income_loss.value }}</p>
    </div>
    <div>
      <h3>Cash Flow</h3>
      <p>Operating: {{ stockComponent.stock.financials[0].financials.cash_flow_statement.net_cash_flow_from_operating_activities.value }}</p>
      <p>Investing: {{ stockComponent.stock.financials[0].financials.cash_flow_statement.net_cash_flow_from_investing_activities.value }}</p>
      <p>Financing: {{ stockComponent.stock.financials[0].financials.cash_flow_statement.net_cash_flow_from_financing_activities.value }}</p>
    </div>
  </div>
  `,
  styles: [``]
})
export class FinancialsComponent {
  constructor(public stockComponent: StockComponent) {}

  debtToAsset() {
    let percent:any = (this.stockComponent.stock.financials[0].financials.balance_sheet.liabilities.value / this.stockComponent.stock.financials[0].financials.balance_sheet.assets.value) * 100
    percent = percent.toFixed(2)
    return percent
  }
}
