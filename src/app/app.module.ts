import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "./services/weather.service";
import { TodoService } from "./services/todo.service";
import { EventService } from "./services/event.service";
// import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from "./app.component";
import { NewEntryComponent } from "./new-entry/new-entry.component";
import { HomeComponent } from './home/home.component';
import { TodayComponent } from './today/today.component';

@NgModule({
  declarations: [AppComponent, NewEntryComponent, HomeComponent, TodayComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [WeatherService, TodoService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule {}
