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
  trafficString: any;
  showNewEntry: boolean = false;
  showTodo: boolean = false;
  showEvent: boolean = false;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  handleNewEntry(): void {
    this.showNewEntry = !this.showNewEntry;
  }
  handleTypeForm(form: NgForm): void {
    this.showNewEntry = !this.showNewEntry;

    if (form.value.entryType === "To-do") {
      this.showTodo = !this.showTodo;
    } else if (form.value.entryType === "Event") {
      this.showEvent = !this.showEvent;
    }
  }
  postTodo(todoForm: NgForm): void {
    console.log(todoForm.value);
    this.showTodo = false;
  }
  handleEventForm() {
    console.log("form was requested");
  }

  getWeather(eventForm: NgForm): void {
    console.log(eventForm.value.date, eventForm.value.time);
    this.weatherService
      .getWeatherData(eventForm.value.eventZip)
      .subscribe(response => {
        this.weatherData = response;
        console.log(this.weatherData);
      });
  }
  getTraffic(eventForm: NgForm): void {
    console.log(eventForm.value.time, eventForm.value.date);
    // this.trafficString = trafficForm.value;
    // this.trafficString.replace(/\s/g, "+");
    this.weatherService.getTrafficData(eventForm.value).subscribe(response => {
      this.trafficData = response.rows[0].elements[0];
      console.log(this.trafficData);
    });
  }
}
// response.weather[0].icon
