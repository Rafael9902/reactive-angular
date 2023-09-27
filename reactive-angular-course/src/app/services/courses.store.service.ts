import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Course, sortCoursesBySeqNo} from "../model/course";
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {MessagesService} from "./messages.service";

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  #subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.#subject.asObservable();

  http: HttpClient = inject(HttpClient);
  loadingService = inject(LoadingService);
  messagesService = inject(MessagesService);

  constructor() {
    this.#loadAllCourses();
  }

  #loadAllCourses() {
    const loadCourses = this.http.get<Course[]>('/api/courses')
      .pipe(map(response => response['payload']),
        catchError(err => {
          this.messagesService.showErrors('Could not load courses');
          console.error(err);
          return throwError(err);
        }),
        tap((courses) => this.#subject.next(courses)));

    this.loadingService.showLoaderUntilCompleted(loadCourses).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo))
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>) {


  }
}
