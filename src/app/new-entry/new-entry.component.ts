import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { WeatherService } from "./../services/weather.service";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-entry",
  templateUrl: "./new-entry.component.html",
  styleUrls: ["./new-entry.component.css"]
})
export class NewEntryComponent implements OnInit, AfterViewInit {
  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  // @ViewChild("addresstext") addresstext: any;
  weatherData: any;
  trafficData: any;
  trafficString: any;
  showNewEntry: boolean = false;

  returnDescription: any;
  currentTemp: any;

  showForm: boolean = false;
  toDoList: any[];
  eventList: any[];

  constructor(
    private weatherService: WeatherService,
    private todoService: TodoService,
    private eventService: EventService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {}

  handleNewEntry(): void {
    this.showForm = false;
    this.showNewEntry = !this.showNewEntry;
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
  handletoggle() {
    if (this.showForm === false) {
      this.showForm = true;
    } else if (this.showForm === true) {
      this.showForm = false;
    }
    // this.showForm = !this.showForm;
    console.log("toggle");
  }
  getWeather(eventForm: NgForm): void {
    // console.log(eventForm.value.date, eventForm.value.time);
    this.weatherService
      .getWeatherData(eventForm.value.event_zip)
      .subscribe(response => {
        this.weatherData = response.weather[0].icon;
        this.returnDescription = response.weather[0].description;
        this.currentTemp = response.main.temp;
        console.log(this.returnDescription);
        console.log(this.currentTemp);
        console.log(this.weatherData);
      });
  }
  getTraffic(eventForm: NgForm): void {
    // console.log(eventForm.value.time, eventForm.value.date);
    // this.trafficString = trafficForm.value;
    // this.trafficString.replace(/\s/g, "+");
    this.weatherService.getTrafficData(eventForm.value).subscribe(response => {
      this.trafficData = response.rows[0].elements[0];
      console.log(this.trafficData);
    });
  }
}
// response.weather[0].icon
