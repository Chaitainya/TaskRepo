import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { WeatherComponent } from './weather/weather.component';
import { StaticComponent } from './static/static.component';

const routes: Routes = [
  { path: '', component: CounterComponent }, // default route
  { path: 'weather', component: WeatherComponent }, // navigated by button
  { path: 'static', component: StaticComponent }, // exact URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
