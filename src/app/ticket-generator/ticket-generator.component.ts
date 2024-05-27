import {Component, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Event} from "../event/event.component";
import {tick} from "@angular/core/testing";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-ticket-generator',
    templateUrl: './ticket-generator.component.html',
    styleUrls: ['./ticket-generator.component.scss']
})
export class TicketGeneratorComponent implements OnInit {
    @Output()
    ticket: BehaviorSubject<Ticket> = new BehaviorSubject<Ticket>({
        user: {
            usersId: 0,
            email: "",
            firstName: "",
            lastNameMaternal: "",
            lastNamePaternal: ""
        },
        event: {
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
        }
        ,
        ticketsId: 0
    });

    qrData: string = '';

    @Input()
    public eventId: number = 0;

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.eventId = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? '0')
    }

    ngOnInit() {
        this.generateTicket();
    }

    createTicket(eventId: number, userId: number): Observable<Ticket> {
        let data = {
            userId: userId,
            eventId: eventId
        };

        console.log(data);

        return this.http.post<Ticket>("http://localhost:8080/api/tickets", data);
    }

    generateTicket() {
        const eventId = this.eventId;
        let user = JSON.parse(localStorage.getItem("user") ?? "{}");
        delete user["password"];

        this.createTicket(eventId, user.usersId).subscribe(
            (ticket: Ticket) => {
                this.ticket.next(ticket)
                this.qrData = JSON.stringify(ticket);

                console.log(ticket)
            },
            (error) => {
                console.error('Error creating ticket:', error);
            }
        );
    }
}

export interface Ticket {
    ticketsId: number;
    event: Event;
    user: {
        usersId: number;
        firstName: string;
        lastNamePaternal: string;
        lastNameMaternal: string;
        email: string;
    };
}
