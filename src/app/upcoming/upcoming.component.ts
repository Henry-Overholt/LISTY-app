import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";
import { WeatherService } from "./../services/weather.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-upcoming",
  templateUrl: "./upcoming.component.html",
  styleUrls: ["./upcoming.component.css"]
})
export class UpcomingComponent implements OnInit {
  upcomingTodoList: any[];
  upcomingEventList: any[];
  returnDescription: any;
  weatherData: any;
  currentTemp: any;
  show: boolean = false;
  constructor(
    private todoService: TodoService,
    private eventService: EventService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.todoService
      .getTodo(this.todoService.getTomorrowDate(), true)
      .subscribe(response => (this.upcomingTodoList = response)),
      this.eventService
        .getEvent(this.todoService.getTomorrowDate(), true)
        .subscribe(response => (this.upcomingEventList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.upcomingTodoList = response));
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
  showInfo() {
    this.show = !this.show;
    console.log("bye");
  }
  convertKtoF(Kalvin: number): number {
    return (Kalvin - 273.15) * (9 / 5) + 32;
  }
}
