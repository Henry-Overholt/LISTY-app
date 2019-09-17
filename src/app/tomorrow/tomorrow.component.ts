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
  tomorrow: string = this.todoService.getTomorrowDate();
  returnDescription: any;
  weatherData: any;
  currentTemp: any;
  trafficData: any;
  show: boolean;
  completedTodo: any[];
  completed: boolean;
  tomorrowWeatherData: any;
  tomorrowReturnDescription: any;
  tomorrowTemp: any;
  call: boolean;
  todo_subscription: any;
  todoToEdit: any;
  eventToEdit: any;
  edit: any;
  event_subscription: any;
  eventEdit: boolean;

  constructor(
    private todoService: TodoService,
    private eventService: EventService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.todoService
      .getTodo(this.todoService.getTomorrowDate(), false)
      .subscribe(response => {
        response.forEach(todo => {
          todo.show = false;
          todo.completed = false;
          todo.edit = false;
        });
        this.tomorrowTodoList = response;
      });
    this.eventService
      .getEvent(this.todoService.getTomorrowDate(), false)
      .subscribe(response => {
        response.forEach(event => {
          event.call = false;
          event.show = false;
          event.weather = false;
        });
        this.tomorrowTodoList = response;
      });
    this.tomorrowWeather("48226");
    this.todo_subscription = this.todoService.todoChange.subscribe(() => {
      console.log("Worked");
      this.todoService
        .getTodo(this.todoService.getTomorrowDate(), false)
        .subscribe(response => (this.tomorrowTodoList = response));
    });
    this.event_subscription = this.eventService.eventChange.subscribe(() => {
      console.log("Worked");
      this.eventService
        .getEvent(this.todoService.getTomorrowDate(), false)
        .subscribe(response => (this.tomorrowEventList = response));
    });
  }

  deleteTodo(i: number) {
    this.tomorrowTodoList[i].completed = true;
    this.todoService.deleteTodo(
      this.tomorrowTodoList[i].id,
      this.todoService.getTomorrowDate(),
      false
    );
  }
  editTodo(i: number): void {
    this.edit = !this.edit;
    this.todoToEdit = this.tomorrowTodoList[i];
    this.todoService.editTodo(this.todoToEdit);
  }
  deleteEvent(i: number): void {
    this.eventService.deleteEvent(
      this.tomorrowEventList[i].id,
      this.todoService.getDate(),
      false
    );
  }
  callApi(i): void {
    this.getWeather(this.tomorrowEventList[i].event_zip);
    this.tomorrowEventList[i].call = !this.tomorrowEventList[i].call;
    this.getTraffic(this.tomorrowEventList[i]);
  }
  editForm(i: number): void {
    this.tomorrowTodoList[i].edit = !this.tomorrowTodoList[i].edit;
  }
  editEvent(i: number): void {
    this.eventEdit = !this.eventEdit;
    this.eventToEdit = this.tomorrowEventList[i];
    this.eventService.editEvent(this.eventToEdit);
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
    this.weatherService.getTrafficData(event).subscribe(response => {
      this.trafficData = response.rows[0].elements[0].duration.text;
      console.log(this.trafficData);
    });
  }
  markCompleted(i): void {
    this.tomorrowTodoList[i].completed = true;
    // this.postCompleted(i);
  }
  showExtra(i): void {
    this.tomorrowTodoList[i].show = !this.tomorrowTodoList[i].show;
  }
  showEventInfo(i): void {
    this.tomorrowEventList[i].show = !this.tomorrowEventList[i].show;
  }
  showWeather(i): void {
    this.tomorrowEventList[i].weather = !this.tomorrowEventList[i].weather;
  }
}
