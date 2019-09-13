import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
// import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) {}
  getTodo(date, gt): Observable<any> {
    const params = new HttpParams().set("date", date).set("gt", gt);
    return this.http.get(`http://localhost:5252/to_do`, { params });
  }
  postToDo(toDo: object): Observable<any> {
    console.log(toDo);
    return this.http.post("http://localhost:5252/to_do", toDo);
    // console.log(toDo);
  }
  deleteTodo(id: number, date, gt): Observable<any> {
    const params = new HttpParams().set("date", date).set("gt", gt);
    console.log(id);
    return this.http.delete(`http://localhost:5252/to_do/${id}`, { params });
  }
  getDate() {
    let d = new Date();
    let date =
      "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    console.log(date);
    return date;
  }
  getTomorrowDate() {
    let d = new Date();
    let date =
      "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + 1);
    console.log(date);
    return date;
  }
}
