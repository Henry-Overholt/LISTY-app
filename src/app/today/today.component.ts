import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  todaytodoList: any[];
  tomorrowTodoList: any[];
  upcomingTodoList: any[];
  constructor(
    private todoService: TodoService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.todoService
      .getTodo("2019-09-10")
      .subscribe(response => (this.todaytodoList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.todaytodoList = response));
  }
}
