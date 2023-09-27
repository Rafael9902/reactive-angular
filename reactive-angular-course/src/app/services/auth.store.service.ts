import { Injectable, inject } from "@angular/core";
import { User } from "../model/user";
import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  #userSubject = new BehaviorSubject<User>(null);
  #http = inject(HttpClient);

  user$: Observable<User> = this.#userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);

    user && this.#userSubject.next(JSON.parse(user));
  }

  login(email: string, password: string): Observable<User> {
    return this.#http.post<User>("/api/login", { email, password }).pipe(
      shareReplay(),
      tap((user) => {
        this.#userSubject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.#userSubject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
