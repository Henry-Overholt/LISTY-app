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
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "new", component: NewEntryComponent },
  { path: "landingpage", component: LandingPageComponent },

  // { path: "home", component: AppComponent },
  { path: "**", component: LandingPageComponent },
  { path: "", redirectTo: "/landingpage", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    NewEntryComponent,
    TodayComponent,
    TomorrowComponent,
    UpcomingComponent,
    HomeComponent,
    LandingPageComponent,
    EditTodoComponent,
    EditEventComponent
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
