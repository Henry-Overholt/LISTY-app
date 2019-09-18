import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  location: string;
  traffic: any;
  constructor(private http: HttpClient) {}
  getWeatherData(event_zip: string): Observable<any> {
    return this.http.get(`${environment.listyApis}/weather?zip=${event_zip}`);

    //api.openweathermap.org/data/2.5/forecast/hourly?zip=94040,us
  }
  getTrafficData(trafficData: any): Observable<any> {
    return this.http.get(
      `${environment.listyApis}/map?origins=${trafficData.starting_address}+${trafficData.starting_city}+${trafficData.starting_state}&destinations=${trafficData.event_address}+${trafficData.event_city}+${trafficData.event_state}`
    );
  }
}
// https://maps.googleapis.com/maps/api/distancematrix/outputFormat?parameters
//${trafficData.startNumber}+${trafficData.startStreet}
