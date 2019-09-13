import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";
import { WeatherService } from "./../services/weather.service";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  todayTodoList: any[];
  todayEventList: any[];
  returnDescription: any;
  date: string = this.todoService.getDate();
  weatherData: any;
  currentTemp: any;
  trafficData: any;
  show: boolean;
  completedTodo: any[];
  completed: boolean;
  currentWeatherData: any;
  todayReturnDescription: any;
  todayTemp: any;
  call: boolean;

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
    this.currentWeather("48226");
    this.todayTodoList.forEach(todo => {
      todo.show = false;
      todo.completed = false;
    });
    this.todayEventList.forEach(event => {
      event.call = false;
      event.weather = false;
      event.show = false;
    });
  }
  // moveCompleted(i: number): any[] {
  //   this.completedTodo.splice(i);
  //   this.todayTodoList.splice(i, 1);
  //   console.log(this.completedTodo);
  //   return this.todayTodoList;
  // }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id, this.todoService.getDate(), false)
      .subscribe(response => (this.todayTodoList = response));
  }
  callApi(i): void {
    this.getWeather(this.todayEventList[i].event_zip);
    this.todayEventList[i].call = !this.todayEventList[i].call;
    this.getTraffic(this.todayEventList[i]);
    console.log(i);
  }
  showInfo(i) {
    this.todayEventList[i].show = !this.todayEventList[i].show;
    console.log("bye");
  }
  currentWeather(zip: string): void {
    this.weatherService.getWeatherData(zip).subscribe(response => {
      this.currentWeatherData = response.weather[0].icon;
      this.todayReturnDescription = response.weather[0].description;
      this.todayTemp = this.convertKtoF(response.main.temp);
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
    this.todayTodoList[i].completed = true;
    this.postCompleted(i);
  }
  postCompleted(i): void {
    this.completedTodo.push(this.todayTodoList[i]);
    console.log(this.completedTodo);
  }
  showExtra(i): void {
    this.todayTodoList[i].show = !this.todayTodoList[i].show;
  }
  showEventInfo(i): void {
    this.todayEventList[i].show = !this.todayEventList[i].show;
  }
  showWeather(i): void {
    this.todayEventList[i].weather = !this.todayEventList[i].weather;
  }
}
