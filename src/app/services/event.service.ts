import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class EventService {
  eventToEdit: any;
  edit: boolean = false;
  eventChange: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}
  getEvent(date, gt): Observable<any> {
    const params = new HttpParams().set("date", date).set("gt", gt);
    return this.http.get(`http://localhost:5252/event`, { params });
  }
  postEvent(eventItem: object): Observable<any> {
    console.log(eventItem);
    return this.http.post("http://localhost:5252/event", eventItem).pipe(
      tap(() => {
        this.eventChange.next("create");
      })
    );
  }
  putEvent(event: object, id: number): void {
    this.http.put(`http://localhost:5252/event/${id}`, event).subscribe(() => {
      this.eventChange.next("edit");
    });
  }

  deleteEvent(id: number, date, gt): void {
    const params = new HttpParams().set("date", date).set("gt", gt);
    this.http
      .delete(`http://localhost:5252/event/${id}`, { params })
      .subscribe(() => {
        this.eventChange.next("delete");
      });
  }
  navigateToHome(): void {
    this.router.navigate(["home"]);
  }
  editEvent(event): void {
    this.edit = !this.edit;
    console.log(this.edit);
    this.eventToEdit = event;
  }
}
