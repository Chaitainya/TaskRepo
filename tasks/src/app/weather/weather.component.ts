import { Component, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any[] = [];
  weatherDetails: any;
  foreCastInfo: any;
  @ViewChild('refresh') refresh: ElementRef<any> | undefined;
  // toggleAlert: boolean = false;
  // alertMessage: string = '';

  constructor(
    private weatherService: WeatherService,
    private toasterService: ToasterService
  ) { }

  getWeather(refreshIndex?: number) {
    const weatherFound = this.weatherData.findIndex((city) => city.name === this.city) === -1 ? false : true;
    if (!weatherFound) {
      this.weatherService.getWeatherByCity(this.city).subscribe((data) => {

        // This logic is to add only 9 recent searches older ones will be removed
        if(this.weatherData?.length === 8) {
          this.weatherData.pop();
        }
        // If refreshIndex is provided, add the data at the specified index
        if (refreshIndex) {
          this.weatherData.splice(refreshIndex, 0, data);
        } else { // else add the data at the beginning
          this.weatherData.unshift(data);
        }
        this.showWeatherDetails(data);
        console.log("Weather Data", this.weatherData);
        this.city = "";
      }, (error) => {
        console.error(error);
        if (error.status === 404) {
          // this.toggleAlert = true;
          // this.alertMessage = error?.error?.message || "City not found";
          this.toasterService.toggleToaster(true);
        }
      });
    } else {
      // this.toggleAlert = true;
      // this.alertMessage = "Weather already fetched for " + this.city;
      this.toasterService.toggleToaster(true);
    }
  }

  clearRecentSearches() {
    this.weatherData = [];
    this.weatherDetails = null;
  }

  showWeatherDetails(city: any) {
    setTimeout(() => {
      this.refresh?.nativeElement.classList.add('refresh');
      setTimeout(() => {
        this.refresh?.nativeElement.classList.remove('refresh');
      },200)
    },100)
    this.weatherDetails = city;
    this.weatherService.getForecastByCity(city?.name).subscribe(
      (data) => {
        this.foreCastInfo = data.list.filter((item: any) =>
          item.dt_txt.includes('12:00:00')
        );  
        console.log(this.foreCastInfo, "foreCastInfo");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  refreshCity(city: string, index: number) {
    // setTimeout(() => {
    //   this.refresh?.forEach((item, i) => {
    //     if (i === index) {
    //       item.nativeElement.classList.add('refresh');
    //     }
    //   })
    // },100)
    this.city = city;
    this.weatherData = this.weatherData.filter((city) => city.name !== this.city);
    this.getWeather(index);
  }

  removeCity(city: string) {
    this.weatherData = this.weatherData.filter((item) => item.name !== city);
    if (this.weatherData?.length === 0) {
      this.clearRecentSearches();
    }
  }

  getDate(dt_txt: string): string {
    return dt_txt.split(" ")[0].split("-")[2]; // Eg: 2025-06-18 21:00:00
  }

  getDayOfWeek(dt_txt: string): string {
    const date = new Date(dt_txt);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  isToday(dt_txt: string): boolean {
    const date = new Date(dt_txt);
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
}
