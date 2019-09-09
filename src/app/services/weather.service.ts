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
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=497f7f87f95db03697266084d1926586`
    );
    //api.openweathermap.org/data/2.5/forecast/hourly?zip=94040,us
  }
  getTrafficData(trafficData: any): Observable<any> {
    return this.http.get(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${trafficData.startAdd}+${trafficData.startCity}+${trafficData.startState}&destinations=${trafficData.eventAdd}+${trafficData.endCity}+${trafficData.endState}&key=AIzaSyCSreLuncbla65v6Bn2bOIMi6ajS4-18Os`
    );
  }
}
// https://maps.googleapis.com/maps/api/distancematrix/outputFormat?parameters
//${trafficData.startNumber}+${trafficData.startStreet}
