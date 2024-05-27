import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationsService} from "../../notifications.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public correo: string = "";
  public passwd: string = "";

  constructor(private http: HttpClient, private router: Router, private notsService: NotificationsService) { }

  async generar() {
    console.log(this.correo)
    console.log(this.passwd)
    this.http.post<any>("http://localhost:8080/login", {
      email: this.correo,
      password: this.passwd
    }).subscribe(value => {
      console.log(value)
      if (value["response"] == true) {
        localStorage.setItem("user-id", value["data"]["usersId"])
        localStorage.setItem("user", JSON.stringify(value["data"]))

        this.router.navigate(["/home"]);
      } else {
        this.notsService.createNotification("No se pudo iniciar sesion", "danger", 2000);
      }
    });
  }
}
