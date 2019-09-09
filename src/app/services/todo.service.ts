import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  // newTodo: object;
  constructor(private http: HttpClient) {}
  getTodo(): Observable<any> {
    return this.http.get("http://localhost:5252/to_do");
  }
  postTodo(newTodo: object): Observable<any> {
    console.log(newTodo);
    return this.http.post("http://localhost:5252/to_do", newTodo);
  }
  putTodo(): void {}
  deleteTodo(): void {}
}
