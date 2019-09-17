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
  date: string = this.todoService.getDate();
  returnDescription: any;
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
  todoToEdit: any;
  eventToEdit: any;
  edit: any;
  todo_subscription: any;
  eventEdit: boolean;
  event_subscription: any;
  constructor(
    private todoService: TodoService,
    private eventService: EventService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.todoService
      .getTodo(this.todoService.getDate(), false)
      .subscribe(response => {
        response.forEach(todo => {
          todo.show = false;
          todo.completed = false;
          todo.edit = false;
        });
        this.todayTodoList = response;
      });
    this.eventService
      .getEvent(this.todoService.getDate(), false)
      .subscribe(response => {
        response.forEach(event => {
          event.call = false;
          event.weather = false;
          event.show = false;
        });
        this.todayEventList = response;
      });
    this.currentWeather("48226");
    this.todo_subscription = this.todoService.todoChange.subscribe(() => {
      console.log("Worked");
      this.todoService
        .getTodo(this.todoService.getDate(), false)
        .subscribe(response => (this.todayTodoList = response));
    });
    this.event_subscription = this.eventService.eventChange.subscribe(() => {
      console.log("Worked");
      this.eventService
        .getEvent(this.todoService.getDate(), false)
        .subscribe(response => (this.todayEventList = response));
    });
  }
  deleteTodo(i: number) {
    this.todayTodoList[i].completed = true;
    this.todoService.deleteTodo(
      this.todayTodoList[i].id,
      this.todoService.getDate(),
      false
    );
  }
  editTodo(i: number): void {
    this.edit = !this.edit;
    this.todoToEdit = this.todayTodoList[i];
    this.todoService.editTodo(this.todoToEdit);
  }
  deleteEvent(i: number): void {
    this.eventService.deleteEvent(
      this.todayEventList[i].id,
      this.todoService.getDate(),
      false
    );
  }
  editEvent(i: number): void {
    this.eventEdit = !this.eventEdit;
    this.eventToEdit = this.todayEventList[i];
    this.eventService.editEvent(this.eventToEdit);
  }
  callApi(i): void {
    this.getWeather(this.todayEventList[i].event_zip);
    this.todayEventList[i].call = !this.todayEventList[i].call;
    this.getTraffic(this.todayEventList[i]);
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
    });
  }
  convertKtoF(Kalvin: number): number {
    return Math.round((Kalvin - 273.15) * (9 / 5) + 32);
  }
  getTraffic(event): void {
    this.weatherService.getTrafficData(event).subscribe(response => {
      this.trafficData = response.rows[0].elements[0].duration.text;
    });
  }
  markCompleted(i): void {
    this.todayTodoList[i].completed = true;
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
  showInfo(i) {
    this.todayEventList[i].show = !this.todayEventList[i].show;
  }
}
