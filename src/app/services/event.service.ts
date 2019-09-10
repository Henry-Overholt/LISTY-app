import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}

  postEvent(eventItem: object): Observable<any> {
    console.log(eventItem);
    return this.http.post("http://localhost:5252/event", eventItem);
  }
}
