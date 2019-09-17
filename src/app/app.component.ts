import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "listy";
  show: boolean;
  hideNavigation: boolean;

  constructor(private router: Router, private test: ActivatedRoute) {
    // Get notified when the url changes
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // use the hideNavigation data from the route configuration to set hideNavigation
        this.hideNavigation =
          router.routerState.root.firstChild.snapshot.data.hideNavigation ||
          false;
      }
    });
  }

  handleNewEntry(): void {
    this.show = !this.show;
  }
}
