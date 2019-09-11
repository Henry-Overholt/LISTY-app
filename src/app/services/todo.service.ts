import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
// import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) {}
  getTodo(date): Observable<any> {
    const params = new HttpParams().set("date", date);
    return this.http.get(`http://localhost:5252/to_do`, { params });
  }
  postToDo(toDo: object): Observable<any> {
    console.log(toDo);
    return this.http.post("http://localhost:5252/to_do", toDo);
  }
  deleteTodo(id: number): Observable<any> {
    console.log(id);
    return this.http.delete(`http://localhost:5252/to_do/${id}`);
  }

  
}
