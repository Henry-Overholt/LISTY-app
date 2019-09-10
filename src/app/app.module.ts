import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "./services/weather.service";
import { TodoService } from "./services/todo.service";
import { EventService } from "./services/event.service";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NewEntryComponent } from "./new-entry/new-entry.component";
import { TodayComponent } from "./today/today.component";
import { TomorrowComponent } from "./tomorrow/tomorrow.component";
import { UpcomingComponent } from "./upcoming/upcoming.component";
import { HomeComponent } from "./home/home.component";
const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "**", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    NewEntryComponent,
    TodayComponent,
    TomorrowComponent,
    UpcomingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService, TodoService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule {}
