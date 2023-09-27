import { Component, OnInit, inject } from "@angular/core";
import { AuthStoreService } from "./services/auth.store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  auth = inject(AuthStoreService);

  logout() {
    this.auth.logout();
  }
}
