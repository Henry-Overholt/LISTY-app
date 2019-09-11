import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { EventService } from "./../services/event.service";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  todoList: any[];
  todayTodoList: any[];
  tomorrowTodoList: any[];
  upcomingTodoList: any[];
  todayEventList: any[];
  constructor(
    private todoService: TodoService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    // this.todoService.sortTodo();
    this.todoService
      .getTodo(this.todoService.getDate(), false)
      .subscribe(response => (this.todayTodoList = response));
    this.eventService
      .getEvent(this.todoService.getDate(), false)
      .subscribe(response => (this.todayEventList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.todayTodoList = response));
  }
}
