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
  completedTodo: any[];
  weatherData: any;
  currentTemp: any;
  trafficData: any;
  tomorrowWeatherData: any;
  tomorrowReturnDescription: any;
  tomorrowTemp: any;
  call: boolean;
  show: boolean;
  completed: boolean;
  tomorrow: string = this.todoService.getTomorrowDate();
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
    this.tomorrowWeather("48226");
    this.tomorrowTodoList.forEach(todo => {
      todo.show = false;
      todo.completed = false;
    });
    this.tomorrowEventList.forEach(event => {
      event.call = false;
      event.show = false;
    });
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id, this.todoService.getTomorrowDate(), false)
      .subscribe(response => (this.tomorrowTodoList = response));
  }
  callApi(i): void {
    this.getWeather(this.tomorrowEventList[i].event_zip);
    this.tomorrowEventList[i].call = !this.tomorrowEventList[i].call;
    this.getTraffic(this.tomorrowEventList[i]);
  }
  showInfo(i) {
    this.tomorrowEventList[i].show = !this.tomorrowEventList[i].show;
  }
  tomorrowWeather(zip: string): void {
    this.weatherService.getWeatherData(zip).subscribe(response => {
      this.tomorrowWeatherData = response.weather[0].icon;
      this.tomorrowReturnDescription = response.weather[0].description;
      this.tomorrowTemp = this.convertKtoF(response.main.temp);
    });
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
    return Math.round((Kalvin - 273.15) * (9 / 5) + 32);
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
  markCompleted(i): void {
    this.tomorrowTodoList[i].completed = true;
    this.postCompleted(i);
  }
  postCompleted(i): void {
    this.completedTodo.push(this.tomorrowTodoList[i]);
    console.log(this.completedTodo);
  }
  showExtra(i): void {
    this.tomorrowTodoList[i].show = !this.tomorrowTodoList[i].show;
  }
  showEventInfo(i): void {
    this.tomorrowEventList[i].show = !this.tomorrowEventList[i].show;
  }
}
