import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./../services/weather.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-entry",
  templateUrl: "./new-entry.component.html",
  styleUrls: ["./new-entry.component.css"]
})
export class NewEntryComponent implements OnInit {
  weatherData: any;
  trafficData: any;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  getWeather(eventForm: NgForm): void {
    this.weatherService
      .getWeatherData(eventForm.value.zip)
      .subscribe(response => {
        this.weatherData = response.weather[0].icon;
        console.log(this.weatherData);
      });
  }
  getTraffic(trafficForm: NgForm): void {
    this.weatherService
      .getTrafficData(trafficForm.value)
      .subscribe(response => {
        this.trafficData = response;
        console.log(this.trafficData);
      });
  }
}
// response.weather[0].icon
