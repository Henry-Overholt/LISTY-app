import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";
import { WeatherService } from "./../services/weather.service";

@Component({
  selector: "app-tomorrow",
  templateUrl: "./tomorrow.component.html",
  styleUrls: ["./tomorrow.component.css"]
})
export class TomorrowComponent implements OnInit {
  tomorrowTodoList: any[];
  tomorrowEventList: any[];
  returnDescription: any;
  weatherData: any;
  currentTemp: any;
  trafficData: any;
  constructor(
    private todoService: TodoService,
    private eventService: EventService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.todoService
      .getTodo(this.todoService.getTomorrowDate(), false)
      .subscribe(response => (this.tomorrowTodoList = response));
    this.eventService
      .getEvent(this.todoService.getTomorrowDate(), false)
      .subscribe(response => (this.tomorrowEventList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.tomorrowTodoList = response));
  }
  callApi(event): void {
    this.getWeather(event.event_zip);
    this.getTraffic(event);
    console.log(event);
  }
  getWeather(zip: string): void {
    // console.log(eventForm.value.date, eventForm.value.time);
    this.weatherService.getWeatherData(zip).subscribe(response => {
      this.weatherData = response.weather[0].icon;
      this.returnDescription = response.weather[0].description;
      this.currentTemp = this.convertKtoF(response.main.temp);
      console.log(this.returnDescription);
      console.log(this.currentTemp);
      console.log(this.weatherData);
    });
  }
  convertKtoF(Kalvin: number): number {
    return (Kalvin - 273.15) * (9 / 5) + 32;
  }
  getTraffic(event): void {
    // console.log(eventForm.value.time, eventForm.value.date);
    // this.trafficString = trafficForm.value;
    // this.trafficString.replace(/\s/g, "+");
    this.weatherService.getTrafficData(event).subscribe(response => {
      this.trafficData = response.rows[0].elements[0].duration.text;
      console.log(this.trafficData);
    });
  }
}
