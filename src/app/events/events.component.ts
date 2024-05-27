import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationsService} from "../notifications.service";
import {Event} from "../event/event.component";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  protected eventIds: number[] = [];
  protected page: number = 0;

  constructor(private http: HttpClient, private router: Router, private notsService: NotificationsService) {
  }


  onIonInfinite(event: InfiniteScrollCustomEvent) {
    console.log("Loading infinite scroll")
    this.generateItems().then(value => {
      setTimeout(() => {
        event.target.complete().then(value1 => {
          console.log("Completed infinite scroll")
        })
      }, 2000)

      console.log("Completing infinite scroll")
    })
    this.page++;
  }

  generateItems() {
    return new Promise<void>(resolve => {
      return this.http.get<any>(`http://localhost:8080/events?page=${this.page}&size=3`, {}).subscribe(async value => {
        let events: Event[] = value["_embedded"]["events"];

        this.eventIds = events.map(val => val.eventsId)
        resolve();
      });
    })

  }

  ngOnInit(): void {
    this.generateItems()
  }

}
