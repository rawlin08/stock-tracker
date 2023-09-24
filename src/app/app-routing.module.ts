import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSearchComponent } from './components/stock/search.component';
import { StockComponent } from './components/stock/stock.component';
import { OverviewComponent } from './components/stock/overview.component';
import { NewsComponent } from './components/stock/news.component';
import { CompanyComponent } from './components/stock/company.component';
import { PastComponent } from './components/stock/past.component';

const routes: Routes = [
  { path: 'stock', title: 'Stock Search', component: StockSearchComponent },
  { path: 'stock/:stock', component: StockComponent },
  { path: '**', redirectTo: 'stock', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
