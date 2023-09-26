import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { OverviewComponent } from './components/stock/overview.component';
import { AboutComponent } from './components/stock/company/about.component';
import { MRDividendComponent } from './components/stock/company/MRdividend.component';
import { FinancialsComponent } from './components/stock/company/financials.component';
import { SplitsComponent } from './components/stock/company/splits.component';
import { PastDividendsComponent } from './components/stock/company/past/past-dividends.component';
import { CompanyComponent } from './components/stock/company/company.component';
import { NewsComponent } from './components/stock/news.component';
import { PastComponent } from './components/stock/company/past/past.component';
import { PastSplitsComponent } from './components/stock/company/past/past-splits.component';
import { CandleChartComponent } from './components/stock/candle-chart.component';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PriceComponent } from './components/stock/price.component';
import { StockSearchComponent } from './components/stock/search.component';
import { IncomeStatementComponent } from './components/stock/income-statement.component';

// Outside Components
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CompanyDetailsComponent } from './components/stock/company/company-details.component';

@NgModule({
    declarations: [
        AppComponent,
        StockComponent,
        OverviewComponent,
        AboutComponent,
        MRDividendComponent,
        FinancialsComponent,
        SplitsComponent,
        PastDividendsComponent,
        CompanyComponent,
        NewsComponent,
        PastComponent,
        PastSplitsComponent,
        PriceComponent,
        StockSearchComponent,
        CandleChartComponent,
        IncomeStatementComponent,
        CompanyDetailsComponent,
    ],
    providers: [
        StockComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatSortModule,
        MatTableModule,
        CanvasJSAngularChartsModule
    ]
})
export class AppModule { }
