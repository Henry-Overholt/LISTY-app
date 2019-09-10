import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  location: string;
  traffic: any;
  constructor(private http: HttpClient) {}
  getWeatherData(zip: string): Observable<any> {

    return this.http.get(`http://localhost:5252/weather?zip=${zip}`);

    //api.openweathermap.org/data/2.5/forecast/hourly?zip=94040,us
  }
  getTrafficData(trafficData: any): Observable<any> {
    return this.http.get(
      `http://localhost:5252/map?origins=${trafficData.startAdd}+${trafficData.startCity}+${trafficData.startState}&destinations=${trafficData.eventAdd}+${trafficData.endCity}+${trafficData.endState}`
    );
  }
}
// https://maps.googleapis.com/maps/api/distancematrix/outputFormat?parameters
//${trafficData.startNumber}+${trafficData.startStreet}
