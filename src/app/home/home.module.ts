import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {EventComponent} from "../event/event.component";
import {HttpClientModule} from "@angular/common/http";
import {EventsComponent} from "../events/events.component";
import {AddEventComponent} from "../add-event/add-event.component";
import {QRCodeModule} from "angularx-qrcode";
import {TicketGeneratorComponent} from "../ticket-generator/ticket-generator.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    QRCodeModule
  ],
  declarations: [HomePage, EventComponent, EventsComponent, AddEventComponent, TicketGeneratorComponent]
})
export class HomePageModule {}
