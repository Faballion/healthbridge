import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContinentsComponent } from './components/continents/continents.component';
import { CountriesComponent } from './components/countries/countries.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent },
  { path: 'continents', component: ContinentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
