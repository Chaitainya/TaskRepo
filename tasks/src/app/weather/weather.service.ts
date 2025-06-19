import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private currentWeather = 'https://api.openweathermap.org/data/2.5/weather';
  private weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.currentWeather}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getForecastByCity(city: string): Observable<any> {
    const url = `${this.weatherForecast}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
