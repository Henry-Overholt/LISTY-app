import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./../services/weather.service";
import { NgForm } from "@angular/forms";
import { TodoService } from "../services/todo.service";
import { EventService } from "../services/event.service";

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
  toDoList: any[];
  eventList: any[];

  constructor(
    private weatherService: WeatherService,
    private todoService: TodoService,
    private eventService: EventService
  ) {}

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

  postTodo(form: NgForm): void {
    this.todoService.postToDo(form.value).subscribe(response => {
      this.toDoList = response;
      form.reset();
    });
  }

  postEvent(form: NgForm): void {
    this.eventService.postEvent(form.value).subscribe(response => {
      this.eventList = response;
      form.reset();
    });
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
