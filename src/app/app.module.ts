import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { HttpClientModule } from '@angular/common/http';
import { OverviewComponent } from './components/stock/overview.component';
import { AboutComponent } from './components/stock/about.component';
import { MRDividendComponent } from './components/stock/MRdividend.component';
import { FinancialsComponent } from './components/stock/financials.component';
import { SplitsComponent } from './components/stock/splits.component';
import { PastDividendsComponent } from './components/stock/past-dividends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { CompanyComponent } from './components/stock/company.component';
import { AboutStockComponent } from './components/stock/about-stock.component';
import { NewsComponent } from './components/stock/news.component';

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
        NewsComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule
    ]
})
export class AppModule { }
