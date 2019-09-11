import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient, private router: Router) {}
  getEvent(date, gt): Observable<any> {
    const params = new HttpParams().set("date", date).set("gt", gt);
    return this.http.get(`http://localhost:5252/event`, { params });
  }
  postEvent(eventItem: object): Observable<any> {
    console.log(eventItem);
    return this.http.post("http://localhost:5252/event", eventItem);
  }
  navigateToHome(): void {
    this.router.navigate(["home"]);
  }
}
