import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CsvOverviewComponent} from './upload/components/csv-overview/csv-overview.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'upload', component: CsvOverviewComponent},
  {path: '  ', component: CsvOverviewComponent},
  {path: '**', component: CsvOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
