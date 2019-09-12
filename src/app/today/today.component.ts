import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";
import { WeatherService } from "./../services/weather.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  todayTodoList: any[];
  todayEventList: any[];
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
    // this.todoService.sortTodo();
    this.todoService
      .getTodo(this.todoService.getDate(), false)
      .subscribe(response => (this.todayTodoList = response));
    this.eventService
      .getEvent(this.todoService.getDate(), false)
      .subscribe(response => (this.todayEventList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.todayTodoList = response));
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
