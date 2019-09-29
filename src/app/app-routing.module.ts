import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CsvOverviewComponent} from './upload/components/csv-overview/csv-overview.component';

const routes: Routes = [
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
