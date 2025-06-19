import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { WeatherComponent } from './weather/weather.component';
import { StaticComponent } from './static/static.component';

const routes: Routes = [
  { path: '', redirectTo: 'counter', pathMatch: 'full' }, // default route redirect
  { path: 'counter', component: CounterComponent },
  { path: 'vatavaran', component: WeatherComponent },
  { path: 'static', component: StaticComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
