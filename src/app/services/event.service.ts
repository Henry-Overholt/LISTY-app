import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

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
    return this.http.get(`${environment.listyApis}/event`, { params });
  }
  postEvent(eventItem: object): Observable<any> {
    console.log(eventItem);
    return this.http.post(`${environment.listyApis}/event`, eventItem).pipe(
      tap(() => {
        this.eventChange.next("create");
      })
    );
  }
  putEvent(event: object, id: number): void {
    this.http
      .put(`${environment.listyApis}/event/${id}`, event)
      .subscribe(() => {
        this.eventChange.next("edit");
      });
    this.edit = !this.edit;
    console.log("eventChange");
  }

  deleteEvent(id: number, date, gt): void {
    const params = new HttpParams().set("date", date).set("gt", gt);
    this.http
      .delete(`${environment.listyApis}/event/${id}`, { params })
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
