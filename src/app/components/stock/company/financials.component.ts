import { Component } from '@angular/core';
import { StockComponent } from '../stock.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-financials',
  template: `
  <div class="container">
    <div class="heading">
      <h2>Financials</h2>
    </div>
    <div class="MRSplit" *ngIf="stockComponent.stock.financials[0]">
      <div class="income">
        <h2>Income Statement</h2>
        <div class="data">
          <div>
            <h3>Item (USD)</h3>
            <h4>Total Revenue</h4>
            <h4>Net Income</h4>
            <h4>Operating Income</h4>
          </div>
          <div class="scroll">
            <div class="card" *ngFor="let year of stockComponent.stock.financials">
              <h3>{{ year.fiscal_year }} {{ year.fiscal_period }}</h3>
              <p>{{ year.financials.income_statement ? year.financials.income_statement.revenues ? app.numToWord(year.financials.income_statement.revenues.value) : '0.00' : '0.00' }}</p>
              <p>{{ year.financials.income_statement ? year.financials.income_statement.net_income_loss ? app.numToWord(year.financials.income_statement.net_income_loss.value) : '0.00' : '0.00' }}</p>
              <p>{{ year.financials.income_statement ? year.financials.income_statement.operating_income_loss ? app.numToWord(year.financials.income_statement.operating_income_loss.value) : '0.00' : '0.00' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="balance">
        <h2>Balance Sheet</h2>
        <div class="data">
          <div>
            <h3>Item (USD)</h3>
            <h4>Total Assets</h4>
            <h4>Total Liabilities</h4>
            <h4>Debt to Asset</h4>
          </div>
          <div class="scroll">
            <div class="card" *ngFor="let year of stockComponent.stock.financials">
              <h3>{{ year.fiscal_year }} {{ year.fiscal_period }}</h3>
              <p>{{ year.financials.balance_sheet ? year.financials.balance_sheet.assets ? app.numToWord(year.financials.balance_sheet.assets.value) : '0.00' : '0.00' }}</p>
              <p>{{ year.financials.balance_sheet ? year.financials.balance_sheet.liabilities ? app.numToWord(year.financials.balance_sheet.liabilities.value) : '0.00' : '0.00' }}</p>
              <p>{{ year.financials.balance_sheet ? year.financials.balance_sheet.assets && year.financials.balance_sheet.liabilities ? debtToAsset(year.financials.balance_sheet.liabilities.value, year.financials.balance_sheet.assets.value) : '0' : '0' }}%</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cash">
        <h2>Cash Flow</h2>
        <div class="data">
          <div>
            <h3>Item (USD)</h3>
            <h4>Operating</h4>
            <h4>Investing</h4>
            <h4>Financing</h4>
          </div>
          <div class="scroll">
            <div class="card" *ngFor="let year of stockComponent.stock.financials">
              <h3>{{ year.fiscal_year }} {{ year.fiscal_period }}</h3>
              <p>{{ year.financials.cash_flow_statement ? year.financials.cash_flow_statement.net_cash_flow_from_operating_activities ? app.numToWord(year.financials.cash_flow_statement.net_cash_flow_from_operating_activities.value) : '0.00' : '0.00' }}</p>
              <p>{{ year.financials.cash_flow_statement ? year.financials.cash_flow_statement.net_cash_flow_from_investing_activities ? app.numToWord(year.financials.cash_flow_statement.net_cash_flow_from_investing_activities.value) : '0.00' : '0.00' }}</p>
              <p>{{ year.financials.cash_flow_statement ? year.financials.cash_flow_statement.net_cash_flow_from_financing_activities ? app.numToWord(year.financials.cash_flow_statement.net_cash_flow_from_financing_activities.value) : '0.00' : '0.00' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  h3 {
    font-size: 14px;
    font-weight: 500;
  }
  h4 {
    font-size: 16px;
    font-weight: 600;
  }
  .scroll {
    overflow: scroll;
    display: flex;
    gap: 10px;
  }
  .data {
    display: flex;
  }
  .data > div:first-child {
    min-width: 140px;
  }
  .card {
    min-width: 100px;
  }
  .card > h3, .card > p {
    text-align: right;
  }
  .income, .balance, .cash {
    padding: 20px 0;
    border-top: 1px solid #000;
  }
  .data > div:first-child, .card {
    /* container surrounding the table */
  }
  .data > div:first-child > h4, .card > p {
    /* individual data tabs */
    margin: 10px 0 0 0;
  }
  `]
})
export class FinancialsComponent {
  constructor(public stockComponent: StockComponent, public app: AppComponent) {}

  debtToAsset(liabilities:any, assets:any) {
    let percent:any = (liabilities / assets) * 100
    percent = percent.toFixed(2)
    return percent
  }
}
