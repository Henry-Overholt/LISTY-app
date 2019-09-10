import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";

@Component({
  selector: "app-upcoming",
  templateUrl: "./upcoming.component.html",
  styleUrls: ["./upcoming.component.css"]
})
export class UpcomingComponent implements OnInit {
  upcomingTodoList: any[];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService
      .getTodo("2019-09-12")
      .subscribe(response => (this.upcomingTodoList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.upcomingTodoList = response));
  }
}
