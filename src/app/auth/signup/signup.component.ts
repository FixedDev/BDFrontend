import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationsService} from "../../notifications.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public correo: string = "";
  public passwd: string = "";
  public firstName: string = "";
  public lastNamePaternal: string = "";
  public lastNameMaternal: string = "";
  public roles: Role[] = [];
  public role: number = 0;

  constructor(private http: HttpClient, private router: Router, private notsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:8080/roles", {})
      .subscribe(value => {
        let roles: Role[] = value["_embedded"]["roles"];
        this.roles = roles;
      });
  }

  async generar() {
    this.http.post<any>("http://localhost:8080/signup", {
      email: this.correo,
      password: this.passwd,
      firstName: this.firstName,
      lastNamePaternal: this.lastNamePaternal,
      lastNameMaternal: this.lastNameMaternal,
      roleId: this.role
    }).subscribe(value => {
      console.log(value)
      if (value["response"] == true) {
        localStorage.setItem("user-id", value["data"]["usersId"])
        localStorage.setItem("user", JSON.stringify(value["data"]))
        this.router.navigate(["/home"]);
      } else {
        this.notsService.createNotification("No se pudo crear la cuenta", "danger", 2000);
      }
    });
  }
}

interface Role {
  rolesId: number;
  roleName: string;
}
