import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

    @Input()
    public id: number = 0;

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

    constructor(private http: HttpClient, private router: Router,) {
    }

    ngOnInit() {
        this.http.get<any>("http://localhost:8080/events/" + this.id, {}).subscribe(async value => {
            let links = value["_links"];
            let campusLink = links["campus"]["href"];
            let categoryLink = links["category"]["href"];

            let actualCampus: Campus = await firstValueFrom(this.http.get<any>(campusLink));
            let actualCategory: Category = await firstValueFrom(this.http.get<any>(categoryLink));

            value["campus"] = actualCampus;
            value["category"] = actualCategory;

            if (value["assistanceType"] === "VIRTUAL") {
                let virtualData: any = await firstValueFrom(this.http.get<any>("http://localhost:8080/virtualEvents/" + this.id));

                value["link"] = virtualData["link"];
            } else if (value["assistanceType"] === "IN_PERSON") {
                let presentialData: any = await firstValueFrom(this.http.get<any>("http://localhost:8080/presentialEvents/" + this.id));

                value["location"] = presentialData["location"];
            }


            this.event = value;
        });
    }

    openTicket() {
        this.router.navigate(["/ticket", this.id])
    }

}

export interface Category {
    categoryId: number;
    name: string;
    // Otros atributos de la categoría si es necesario
}

// Define la interfaz para Campus
export interface Campus {
    campusesId: number;
    name: string;
    // Otros atributos del campus si es necesario
}

export interface Event {
    eventsId: number;
    name: string;
    category: Category;
    cost: number;
    date: Date;
    campus: Campus;
    numbered: boolean;
    capacity: number;
    assistanceType: "IN_PERSON" | "VIRTUAL";
    location?: string;
    link?: string;
}
