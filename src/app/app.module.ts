import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { OverviewComponent } from './components/stock/overview.component';
import { AboutComponent } from './components/stock/about.component';
import { MRDividendComponent } from './components/stock/MRdividend.component';
import { FinancialsComponent } from './components/stock/financials.component';
import { SplitsComponent } from './components/stock/splits.component';
import { PastDividendsComponent } from './components/stock/past-dividends.component';
import { CompanyComponent } from './components/stock/company.component';
import { AboutStockComponent } from './components/stock/about-stock.component';
import { NewsComponent } from './components/stock/news.component';
import { PastComponent } from './components/stock/past.component';
import { PastSplitsComponent } from './components/stock/past-splits.component';
import { PastFinancialsComponent } from './components/stock/past-financials.component';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PriceComponent } from './components/stock/price.component';

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
        AboutStockComponent,
        NewsComponent,
        PastComponent,
        PastSplitsComponent,
        PastFinancialsComponent,
        PriceComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatSortModule,
        MatTableModule
    ]
})
export class AppModule { }
