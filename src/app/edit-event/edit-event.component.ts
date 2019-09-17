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
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventToEdit = this.eventService.eventToEdit;
  }
  putEvent(form: NgForm, id: number): void {
    this.eventService.putEvent(form.value, id);
  }
}
