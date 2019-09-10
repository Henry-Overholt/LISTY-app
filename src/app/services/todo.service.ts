import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) {}

  postToDo(toDo: object): Observable<any> {
    console.log(toDo);
    return this.http.post("http://localhost:5252/to_do", toDo);
  }
}
