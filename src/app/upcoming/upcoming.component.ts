import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";
import { WeatherService } from "./../services/weather.service";

@Component({
  selector: "app-upcoming",
  templateUrl: "./upcoming.component.html",
  styleUrls: ["./upcoming.component.css"]
})
export class UpcomingComponent implements OnInit {
  upcomingEventList: any[];
  trafficData: any;
  show: boolean;
  call: boolean;
  eventToEdit: any;
  eventEdit: boolean;
  event_subscription: any;
  edit: boolean;
  constructor(
    private todoService: TodoService,
    private eventService: EventService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.eventService
      .getEvent(this.todoService.getTomorrowDate(), true)
      .subscribe(response => {
        response.forEach(event => {
          event.call = false;
          event.weather = false;
          event.show = false;
        });
        this.upcomingEventList = response;
      });
    this.event_subscription = this.eventService.eventChange.subscribe(() => {
      console.log("Worked");
      this.eventService
        .getEvent(this.todoService.getTomorrowDate, true)
        .subscribe(response => (this.upcomingEventList = response));
    });
  }
  deleteEvent(i: number): void {
    this.eventService.deleteEvent(
      this.upcomingEventList[i].id,
      this.todoService.getDate(),
      true
    );
  }
  editEvent(i: number): void {
    this.eventEdit = !this.eventEdit;
    this.eventToEdit = this.upcomingEventList[i];
    this.eventService.editEvent(this.eventToEdit);
  }
  callApi(i): void {
    this.upcomingEventList[i].call = !this.upcomingEventList[i].call;
    this.getTraffic(this.upcomingEventList[i]);
  }
  showInfo(i) {
    this.upcomingEventList[i].show = !this.upcomingEventList[i].show;
  }
  getTraffic(event): void {
    this.weatherService.getTrafficData(event).subscribe(response => {
      this.trafficData = response.rows[0].elements[0].duration.text;
      console.log(this.trafficData);
    });
  }
  showEventInfo(i): void {
    this.upcomingEventList[i].show = !this.upcomingEventList[i].show;
  }
}
