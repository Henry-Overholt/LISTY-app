import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../services/todo.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.component.html",
  styleUrls: ["./edit-todo.component.css"]
})
export class EditTodoComponent implements OnInit {
  todoList: any[];
  todoToEdit: any;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoToEdit = this.todoService.todoToEdit;
  }
  putTodo(form: NgForm, id: number): void {
    console.log(form.value);

    this.todoService.putTodo(form.value, id);
  }
}
