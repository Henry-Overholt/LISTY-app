import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";

@Component({
  selector: "app-tomorrow",
  templateUrl: "./tomorrow.component.html",
  styleUrls: ["./tomorrow.component.css"]
})
export class TomorrowComponent implements OnInit {
  tomorrowTodoList: any[];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService
      .getTodo("2019-09-11")
      .subscribe(response => (this.tomorrowTodoList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.tomorrowTodoList = response));
  }
}
