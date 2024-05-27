import {Component, Input, OnInit} from '@angular/core';
import {Campus, Category, Event} from "../event/event.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationsService} from "../notifications.service";
import {car} from "ionicons/icons";
import {ModalController} from "@ionic/angular";

// @ts-ignore
@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

    public event: Event = {
        campus: {
            campusesId: 0,
            name: ""
        },
        assistanceType: "VIRTUAL",
        capacity: 0,
        category: {
            categoryId: 0,
            name: ""
        },
        cost: 1,
        date: new Date(),
        name: "",
        numbered: false,
        eventsId: 0
    };


    @Input()
    categoryId: number = 0;
    @Input()
    campusesId: number = 0;

    campuses: Campus[] = [];
    categories: Category[] = [];

    constructor(private http: HttpClient, private router: Router, private notsService: NotificationsService, private modalController: ModalController) {
    }


    generate() {
        let data = {
            name: this.event.name,
            cost: this.event.cost,
            date: this.event.date,
            numbered: this.event.numbered,
            capacity: this.event.capacity,
            assistanceType: this.event.assistanceType,
            category: this.categoryId,
            campus: this.campusesId,
            location: this.event.location,
            link: this.event.link,
        };

        let link = this.event.assistanceType === "VIRTUAL" ? "http://localhost:8080/api/events/virtual" : "http://localhost:8080/api/events/presential"


        this.http.post<any>(link, data).subscribe(value => {
            if (value["eventId"] === null) {
                this.notsService.createNotification("No se pudo crear el evento", "danger", 2000);

                return
            }
            this.notsService.createNotification("Evento creado exitosamente", "success", 2000);
            this.modalController.dismiss()
        });
    }

    ngOnInit(): void {
        this.http.get<any>("http://localhost:8080/campuses", {})
            .subscribe(value => {
                let campuses: Campus[] = value["_embedded"]["campuses"];
                this.campuses = campuses;
            });

        this.http.get<any>("http://localhost:8080/categories", {})
            .subscribe(value => {
                let categories: Category[] = value["_embedded"]["categories"];
                this.categories = categories;
            });
    }

    selectType() {

    }
}
