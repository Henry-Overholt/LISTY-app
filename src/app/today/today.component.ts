import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  todoList: any[];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService
      .getTodo()
      .subscribe(response => (this.todoList = response));
  }
  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .subscribe(response => (this.todoList = response));
  }
}
