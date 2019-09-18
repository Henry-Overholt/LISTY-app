import { Component, OnInit } from "@angular/core";
import { EventService } from "./../services/event.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edit-event",
  templateUrl: "./edit-event.component.html",
  styleUrls: ["./edit-event.component.css"]
})
export class EditEventComponent implements OnInit {
  eventList: any[];
  eventToEdit: any;
  edit: boolean;
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventToEdit = this.eventService.eventToEdit;
    this.edit = this.eventService.edit;
  }
  putEvent(form: NgForm, id: number): void {
    this.edit = !this.edit;
    this.eventService.putEvent(form.value, id);
    this.eventService.navigateToHome();
  }
}
