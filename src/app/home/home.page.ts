import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isSuperUser() {
    let value = JSON.parse(localStorage.getItem("user") ?? "{}");

    let role = value["role"]["roleId"];

    return role !== 4 && role !== 3 ;
  }
}
