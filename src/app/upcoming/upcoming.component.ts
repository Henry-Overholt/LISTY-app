import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";

@Component({
  selector: "app-upcoming",
  templateUrl: "./upcoming.component.html",
  styleUrls: ["./upcoming.component.css"]
})
export class UpcomingComponent implements OnInit {
  upcomingTodoList: any[];
  upcomingEventList: any[];
  constructor(
    private todoService: TodoService,
    private eventService: EventService
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
}
