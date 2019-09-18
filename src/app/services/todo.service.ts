import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  edit: boolean;
  todoToEdit: any;
  todoChange: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}
  getTodo(date, gt): Observable<any> {
    const params = new HttpParams().set("date", date).set("gt", gt);
    return this.http.get(`${environment.listyApis}/to_do`, { params });
  }
  postToDo(toDo: object): Observable<any> {
    console.log(toDo);
    return this.http.post(`${environment.listyApis}/to_do`, toDo).pipe(
      tap(() => {
        this.todoChange.next("create");
      })
    );
    // console.log(toDo);
  }
  putTodo(todo: object, id: number): void {
    this.http
      .put(`${environment.listyApis}/to_do/${id}`, todo)
      .subscribe(() => {
        this.todoChange.next("edit");
      });
    this.edit = !this.edit;
  }
  deleteTodo(id: number, date, gt): void {
    const params = new HttpParams().set("date", date).set("gt", gt);
    this.http
      .delete(`${environment.listyApis}/to_do/${id}`, { params })
      .subscribe(() => {
        this.todoChange.next("delete");
      });
  }
  editTodo(todo): void {
    this.edit = !this.edit;
    console.log(this.edit);
    this.todoToEdit = todo;
  }
  getDate() {
    let d = new Date();
    let date =
      "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return date;
  }
  getTomorrowDate() {
    let d = new Date();
    let date =
      "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + 1);
    return date;
  }
  getYesterdayDate() {
    let d = new Date();
    let date =
      "" + d.getFullYear() + "-" + (d.getMonth() - 1) + "-" + (d.getDate() + 1);
    return date;
  }
  navigateToHome(): void {
    this.router.navigate(["home"]);
  }
}
