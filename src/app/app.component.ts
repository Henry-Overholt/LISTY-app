import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "listy";
  show: boolean;

  handleNewEntry(): void {
    this.show = !this.show;
  }
}
