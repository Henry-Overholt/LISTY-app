import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "./services/weather.service";

import { AppComponent } from "./app.component";
import { NewEntryComponent } from './new-entry/new-entry.component';

@NgModule({
  declarations: [AppComponent, NewEntryComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {}
