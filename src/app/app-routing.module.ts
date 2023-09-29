import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSearchComponent } from './components/stock/search.component';
import { StockComponent } from './components/stock/stock.component';
import { OverviewComponent } from './components/stock/overview.component';
import { NewsComponent } from './components/stock/news.component';
import { CompanyComponent } from './components/stock/company/company.component';
import { PastComponent } from './components/stock/company/past/past.component';
import { CompanyDetailsComponent } from './components/stock/company/company-details.component';

const routes: Routes = [
  { path: 'stock', title: 'Stock Search', component: StockSearchComponent },
  { path: 'stock/:stock', component: StockComponent, children: [
    {
      path: 'overview', // child route path
      component: OverviewComponent, // child route component that the router renders
    },
    {
      path: 'news',
      component: NewsComponent, // another child route component that the router renders
    },
    {
      path: 'company', // child route path
      component: CompanyComponent, // child route component that the router renders
    }
  ], },
  { path: 'stock/:stock/company/past', component: PastComponent },
  { path: 'stock/:stock/company/company-details', component: CompanyDetailsComponent },
  { path: 'stock/:stock', redirectTo: '/stock/:stock/overview' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
