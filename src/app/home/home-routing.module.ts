import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {setupGuard} from "../setup.guard";
import {AddEventComponent} from "../add-event/add-event.component";
import {EventsComponent} from "../events/events.component";
import {TicketGeneratorComponent} from "../ticket-generator/ticket-generator.component";

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: '',
                component: EventsComponent,
                pathMatch: "full"
            },
            {
                path: 'ticket/:id',
                component: TicketGeneratorComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {
}
