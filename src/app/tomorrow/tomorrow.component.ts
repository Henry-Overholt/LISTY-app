import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";

@Component({
  selector: "app-tomorrow",
  templateUrl: "./tomorrow.component.html",
  styleUrls: ["./tomorrow.component.css"]
})
export class TomorrowComponent implements OnInit {
  tomorrowTodoList: any[];
  tomorrowEventList: any[];
  constructor(
    private todoService: TodoService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.todoService
      .getTodo(this.todoService.getTomorrowDate(), false)
      .subscribe(response => (this.tomorrowTodoList = response));
    this.eventService
      .getEvent(this.todoService.getTomorrowDate(), false)
      .subscribe(response => (this.tomorrowEventList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.tomorrowTodoList = response));
  }
}
